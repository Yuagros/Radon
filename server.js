"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const session = require("express-session");
const connectSqlite3 = require("connect-sqlite3");
const bcrypt = require("bcryptjs");
const Database = require("better-sqlite3");
const dotenv = require("dotenv");
const pino = require("pino");
const pinoHttp = require("pino-http");

dotenv.config();

const BASE_DIR = __dirname;
const DATA_DIR = path.join(BASE_DIR, "data");
fs.mkdirSync(DATA_DIR, { recursive: true });

const config = {
    port: Number(process.env.PORT || 3000),
    nodeEnv: process.env.NODE_ENV || "development",
    dbPath: path.resolve(BASE_DIR, process.env.DB_PATH || "data/radon.db"),
    sessionSecret: process.env.SESSION_SECRET || "",
    ethRpcUrl: process.env.ETH_RPC_URL || "https://eth.llamarpc.com",
    solRpcUrl: process.env.SOL_RPC_URL || "https://api.mainnet-beta.solana.com",
    btcApiBase: process.env.BTC_API_BASE || "https://blockstream.info/api",
    wallets: {
        ETH: process.env.WALLET_ETH || "0x9D575B4e92063BD6FA3e5b478Fa5EBFc8d531241",
        BTC: process.env.WALLET_BTC || "bc1p0wpgtfk3h6zv98had7kzfvgte4l237cmmt0sads7jg7n47lcknxsf0n2st",
        SOL: process.env.WALLET_SOL || "7ykaKV7RtPnHpckJBH5p3rxmSdAP1Z2598BmbqeuHK7Y"
    },
    dodo: {
        apiKey: String(process.env.DODO_PAYMENTS_API_KEY || "").trim(),
        environment: String(process.env.DODO_PAYMENTS_ENVIRONMENT || "test_mode")
            .trim()
            .toLowerCase(),
        productId: String(process.env.DODO_PAYMENTS_PRODUCT_ID || "").trim()
    }
};

const PLAN_PRICES_USD = Object.freeze({
    Lifetime: 15
});

const BILLING_PRODUCTS = Object.freeze([
    {
        id: "radon_anti_cheat_lifetime",
        name: "Radon Anti Cheat",
        termLabel: "Lifetime Access",
        priceUsd: 15,
        defaultCoin: "ETH"
    }
]);

const SUPPORTED_COINS = Object.freeze(["ETH", "BTC", "SOL"]);
const COIN_PRICE_IDS = Object.freeze({
    ETH: "ethereum",
    BTC: "bitcoin",
    SOL: "solana"
});
const COIN_QUOTE_PRECISION = Object.freeze({
    ETH: 8,
    BTC: 8,
    SOL: 6
});
const DODO_PAYMENT_COIN = "CARD";
const DODO_PAYMENT_WALLET = "dodo_card_checkout";
const DODO_PAYMENT_METHODS = Object.freeze(["credit", "debit"]);

const runtimeSessionSecret =
    config.sessionSecret.length >= 24 ? config.sessionSecret : crypto.randomBytes(48).toString("hex");

const logger = pino({
    level: process.env.LOG_LEVEL || "info",
    transport:
        config.nodeEnv === "development"
            ? {
                  target: "pino-pretty",
                  options: {
                      colorize: true,
                      translateTime: "SYS:standard"
                  }
              }
            : undefined
});

if (config.sessionSecret.length < 24) {
    logger.warn(
        "SESSION_SECRET is missing/short. Using an ephemeral runtime secret. Set SESSION_SECRET in production."
    );
}

const db = new Database(config.dbPath);
db.pragma("foreign_keys = ON");
db.pragma("journal_mode = WAL");

db.exec(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    display_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    active_plan TEXT NOT NULL DEFAULT 'Lifetime',
    has_paid_access INTEGER NOT NULL DEFAULT 0,
    avatar_url TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS payments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    reference TEXT NOT NULL UNIQUE,
    user_id INTEGER NOT NULL,
    plan TEXT NOT NULL,
    amount_usd REAL NOT NULL,
    coin TEXT NOT NULL,
    wallet TEXT NOT NULL,
    tx_hash TEXT NOT NULL,
    status TEXT NOT NULL,
    received_amount TEXT,
    verification_details TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE(coin, tx_hash)
);

CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    user_id INTEGER NOT NULL,
    product_id TEXT NOT NULL,
    product_name TEXT NOT NULL,
    term_label TEXT NOT NULL,
    amount_usd REAL NOT NULL,
    coin TEXT NOT NULL,
    wallet TEXT NOT NULL,
    status TEXT NOT NULL,
    tx_hash TEXT,
    payment_reference TEXT,
    required_amount TEXT,
    quoted_usd_rate REAL,
    quote_source TEXT,
    expires_at TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS dodo_checkouts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    session_id TEXT NOT NULL UNIQUE,
    user_id INTEGER NOT NULL,
    product_id TEXT NOT NULL,
    amount_usd REAL NOT NULL,
    currency TEXT NOT NULL DEFAULT 'USD',
    checkout_url TEXT,
    payment_id TEXT,
    payment_status TEXT,
    payment_reference TEXT,
    metadata TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS players (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL,
    risk_score INTEGER NOT NULL DEFAULT 0,
    last_seen_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS rulesets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL,
    coverage_pct INTEGER NOT NULL DEFAULT 0,
    last_triggered_at TEXT,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS security_events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    event_type TEXT NOT NULL,
    severity TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    actor TEXT,
    source_ip TEXT,
    created_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
);
`);

function ensureColumn(tableName, columnName, definition) {
    const rows = db.prepare(`PRAGMA table_info(${tableName})`).all();
    const hasColumn = rows.some((row) => row.name === columnName);
    if (!hasColumn) {
        db.exec(`ALTER TABLE ${tableName} ADD COLUMN ${columnName} ${definition}`);
    }
}

ensureColumn("users", "avatar_url", "TEXT");
ensureColumn("users", "has_paid_access", "INTEGER NOT NULL DEFAULT 0");
ensureColumn("invoices", "required_amount", "TEXT");
ensureColumn("invoices", "quoted_usd_rate", "REAL");
ensureColumn("invoices", "quote_source", "TEXT");

function enforcePlanModel() {
    db.prepare("UPDATE users SET active_plan = 'Lifetime' WHERE active_plan NOT IN ('Lifetime')").run();
}

function purgeLegacyDemoData() {
    db.prepare(
        "DELETE FROM players WHERE username IN ('NovaRunner','PixelShield','DeltaSpark','KineticJay','EchoWisp','VoltRider')"
    ).run();
    db.prepare(
        "DELETE FROM rulesets WHERE name IN ('Movement Validator','Remote Guard','State Verifier','Velocity Spike Quarantine')"
    ).run();
    db.prepare(
        `
        DELETE FROM security_events
        WHERE user_id IS NULL
          AND (
              source_ip LIKE '10.42.%'
              OR title IN (
                  'MITM interception blocked',
                  'Runtime checksum mismatch',
                  'Debugger attach attempt detected',
                  'Remote spam throttled',
                  'Shared HWID denied',
                  'Movement anomaly quarantined'
              )
          )
    `
    ).run();
}

function normalizeBillingCatalogData() {
    const normalizedAt = nowIso();
    db.prepare(
        `
        UPDATE invoices
        SET product_id = 'radon_anti_cheat_lifetime',
            product_name = 'Radon Anti Cheat',
            term_label = 'Lifetime Access',
            amount_usd = 15,
            updated_at = ?
        WHERE product_id != 'radon_anti_cheat_lifetime'
           OR product_name != 'Radon Anti Cheat'
           OR term_label != 'Lifetime Access'
           OR ABS(amount_usd - 15) > 0.0001
    `
    ).run(normalizedAt);

    db.prepare(
        `
        UPDATE payments
        SET plan = 'Radon Anti Cheat (Lifetime Access)',
            amount_usd = 15,
            updated_at = ?
        WHERE plan != 'Radon Anti Cheat (Lifetime Access)'
           OR ABS(amount_usd - 15) > 0.0001
    `
    ).run(normalizedAt);
}

function reconcilePaidAccess() {
    db.prepare(
        `
        UPDATE users
        SET has_paid_access = 1,
            active_plan = 'Lifetime'
        WHERE id IN (
            SELECT user_id FROM invoices WHERE status = 'verified'
            UNION
            SELECT user_id FROM payments WHERE status = 'verified'
        )
    `
    ).run();
}

enforcePlanModel();
purgeLegacyDemoData();
normalizeBillingCatalogData();
reconcilePaidAccess();

function nowIso() {
    return new Date().toISOString();
}

function resolveSessionCookieSecure(nodeEnv) {
    return nodeEnv === "production" ? "auto" : false;
}

function getDodoApiBaseUrl() {
    return config.dodo.environment === "live_mode" ? "https://live.dodopayments.com" : "https://test.dodopayments.com";
}

function isDodoConfigured() {
    return Boolean(config.dodo.apiKey && config.dodo.productId);
}

function buildExternalBaseUrl(req) {
    const forwardedProto = String(req.get("x-forwarded-proto") || "")
        .split(",")[0]
        .trim();
    const protocol = forwardedProto || req.protocol || "https";
    return `${protocol}://${req.get("host")}`;
}

function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
}

function sanitizeName(name) {
    return String(name || "").trim().replace(/\s+/g, " ");
}

function sanitizeAvatarUrl(value) {
    const raw = String(value || "").trim();
    if (!raw) return null;
    if (raw.length > 500) return null;

    try {
        const parsed = new URL(raw);
        if (!["http:", "https:"].includes(parsed.protocol)) {
            return null;
        }
        return parsed.toString();
    } catch (error) {
        return null;
    }
}

function createReference(prefix) {
    const stamp = Date.now().toString(36).toUpperCase();
    const rand = crypto.randomBytes(3).toString("hex").toUpperCase();
    return `${prefix}-${stamp}-${rand}`;
}

function formatAmountFromBaseUnits(rawValue, decimals) {
    let value;
    try {
        value = BigInt(rawValue);
    } catch (error) {
        return null;
    }

    const negative = value < 0n;
    const normalized = negative ? -value : value;
    const base = 10n ** BigInt(decimals);
    const integer = normalized / base;
    const fraction = normalized % base;
    const fractionText = fraction.toString().padStart(decimals, "0").replace(/0+$/, "");
    const merged = fractionText.length ? `${integer.toString()}.${fractionText}` : integer.toString();
    return negative ? `-${merged}` : merged;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isPlanValid(plan) {
    return Object.prototype.hasOwnProperty.call(PLAN_PRICES_USD, plan);
}

function getPlanPriceUsd(plan) {
    if (!isPlanValid(plan)) return 0;
    return PLAN_PRICES_USD[plan];
}

function getBillingProductById(productId) {
    return BILLING_PRODUCTS.find((product) => product.id === productId) || null;
}

function publicInvoice(row) {
    if (!row) return null;
    return {
        id: row.id,
        productId: row.product_id,
        productName: row.product_name,
        termLabel: row.term_label,
        amountUsd: Number(row.amount_usd || 0),
        coin: row.coin,
        wallet: row.wallet,
        status: row.status,
        txHash: row.tx_hash || null,
        paymentReference: row.payment_reference || null,
        requiredAmount: row.required_amount || null,
        quotedUsdRate: Number(row.quoted_usd_rate || 0),
        quoteSource: row.quote_source || null,
        expiresAt: row.expires_at,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

function publicUser(row) {
    return {
        id: row.id,
        name: row.display_name,
        email: row.email,
        plan: row.active_plan,
        hasPaidAccess: Boolean(row.has_paid_access),
        avatarUrl: row.avatar_url || null,
        createdAt: row.created_at
    };
}

const app = express();
app.disable("x-powered-by");
app.set("trust proxy", 1);

app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false
    })
);

app.use(
    pinoHttp({
        logger,
        customLogLevel: (req, res, error) => {
            if (error || res.statusCode >= 500) return "error";
            if (res.statusCode >= 400) return "warn";
            return "info";
        },
        serializers: {
            req(request) {
                return {
                    method: request.method,
                    url: request.url,
                    remoteAddress: request.ip
                };
            }
        }
    })
);

app.use(express.json({ limit: "64kb" }));
app.use(express.urlencoded({ extended: false }));

const SQLiteStore = connectSqlite3(session);
const sessionCookieSecure = resolveSessionCookieSecure(config.nodeEnv);
app.use(
    session({
        name: "radon.sid",
        secret: runtimeSessionSecret,
        resave: false,
        saveUninitialized: false,
        store: new SQLiteStore({
            db: "sessions.db",
            dir: DATA_DIR
        }),
        cookie: {
            httpOnly: true,
            sameSite: "lax",
            secure: sessionCookieSecure,
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
);

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 300,
    standardHeaders: true,
    legacyHeaders: false
});

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 30,
    standardHeaders: true,
    legacyHeaders: false
});

app.use("/api", apiLimiter);

function requireAuth(req, res, next) {
    const userId = req.session?.userId;
    if (!userId) {
        return res.status(401).json({ error: "Authentication required." });
    }

    const user = db
        .prepare("SELECT id, display_name, email, active_plan, has_paid_access, avatar_url, created_at FROM users WHERE id = ?")
        .get(userId);
    if (!user) {
        req.session.destroy(() => undefined);
        return res.status(401).json({ error: "Session expired." });
    }

    req.user = user;
    return next();
}

function requirePaidAccess(req, res, next) {
    if (!req.user?.has_paid_access) {
        return res.status(403).json({ error: "Purchase required to access the dashboard." });
    }
    return next();
}

function addSecurityEvent(userId, eventType, severity, title, description, actor, sourceIp) {
    db.prepare(
        "INSERT INTO security_events (user_id, event_type, severity, title, description, actor, source_ip, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    ).run(userId || null, eventType, severity, title, description, actor || "system", sourceIp || null, nowIso());
}

async function fetchJsonWithTimeout(url, options = {}, timeoutMs = 12000) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal
        });
        const contentType = response.headers.get("content-type") || "";
        const isJson = contentType.includes("application/json");
        const payload = isJson ? await response.json() : await response.text();
        return { response, payload };
    } finally {
        clearTimeout(timer);
    }
}

function ceilToDecimals(value, decimals) {
    const factor = 10 ** decimals;
    return Math.ceil(value * factor) / factor;
}

async function fetchUsdQuoteForCoin(coin) {
    const priceId = COIN_PRICE_IDS[coin];
    if (!priceId) {
        throw new Error("Unsupported quote coin.");
    }

    try {
        const { response, payload } = await fetchJsonWithTimeout(
            `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(priceId)}&vs_currencies=usd`,
            {},
            8000
        );

        if (!response.ok || typeof payload !== "object") {
            throw new Error(`Price quote request failed (${response.status}).`);
        }

        const quote = Number(payload?.[priceId]?.usd);
        if (Number.isFinite(quote) && quote > 0) {
            return {
                usd: quote,
                source: "coingecko"
            };
        }
    } catch (error) {
        /* fall back to Coinbase spot below */
    }

    const { response, payload } = await fetchJsonWithTimeout(
        `https://api.coinbase.com/v2/prices/${encodeURIComponent(coin)}-USD/spot`,
        {},
        8000
    );
    if (!response.ok || typeof payload !== "object") {
        throw new Error(`Fallback price quote failed (${response.status}).`);
    }

    const quote = Number(payload?.data?.amount);
    if (!Number.isFinite(quote) || quote <= 0) {
        throw new Error("Price quote is unavailable.");
    }
    return {
        usd: quote,
        source: "coinbase"
    };
}

function computeRequiredCoinAmount(usdAmount, usdPerCoin, coin) {
    const base = Number(usdAmount) / Number(usdPerCoin);
    const precision = COIN_QUOTE_PRECISION[coin] || 8;
    const buffered = base * 1.005;
    const rounded = ceilToDecimals(buffered, precision);
    return rounded.toFixed(precision);
}

function isReceivedAmountSufficient(requiredAmountText, receivedAmountText) {
    const required = Number(requiredAmountText);
    const received = Number(receivedAmountText);
    if (!Number.isFinite(required) || required <= 0) return true;
    if (!Number.isFinite(received) || received <= 0) return false;
    return received + Number.EPSILON >= required;
}

async function ethRpc(method, params) {
    const { response, payload } = await fetchJsonWithTimeout(
        config.ethRpcUrl,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: Date.now(),
                method,
                params
            })
        },
        12000
    );

    if (!response.ok) {
        throw new Error(`ETH RPC request failed (${response.status}).`);
    }

    if (payload?.error) {
        throw new Error(payload.error.message || "ETH RPC returned an error.");
    }

    return payload.result;
}

async function solRpc(method, params) {
    const { response, payload } = await fetchJsonWithTimeout(
        config.solRpcUrl,
        {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                jsonrpc: "2.0",
                id: Date.now(),
                method,
                params
            })
        },
        12000
    );

    if (!response.ok) {
        throw new Error(`SOL RPC request failed (${response.status}).`);
    }

    if (payload?.error) {
        throw new Error(payload.error.message || "SOL RPC returned an error.");
    }

    return payload.result;
}

function normalizeBtcAddress(address) {
    return String(address || "").trim().toLowerCase();
}

function extractSolLamports(instructions, walletAddress) {
    if (!Array.isArray(instructions)) return 0n;

    let total = 0n;
    for (const instruction of instructions) {
        const parsed = instruction?.parsed;
        const info = parsed?.info || {};
        const destination = String(info.destination || info.to || "");
        if (!destination || destination !== walletAddress) continue;

        const lamportsValue = info.lamports ?? info.amount;
        if (lamportsValue === undefined || lamportsValue === null) continue;

        try {
            total += BigInt(lamportsValue);
        } catch (error) {
            continue;
        }
    }

    return total;
}

async function verifyEthTransaction(txHash, walletAddress) {
    if (!/^0x[a-fA-F0-9]{64}$/.test(txHash)) {
        return {
            status: "rejected",
            reason: "Invalid Ethereum transaction hash format."
        };
    }

    const tx = await ethRpc("eth_getTransactionByHash", [txHash]);
    if (!tx) {
        return {
            status: "pending_verification",
            reason: "Transaction not yet visible on Ethereum."
        };
    }

    const destination = String(tx.to || "").toLowerCase();
    if (destination !== walletAddress.toLowerCase()) {
        return {
            status: "rejected",
            reason: "ETH transaction recipient does not match configured wallet."
        };
    }

    const weiAmount = BigInt(tx.value || "0x0");
    if (weiAmount <= 0n) {
        return {
            status: "rejected",
            reason: "ETH transaction amount is zero."
        };
    }

    const receipt = await ethRpc("eth_getTransactionReceipt", [txHash]);
    if (!receipt || receipt.status !== "0x1") {
        return {
            status: "pending_verification",
            reason: "ETH transaction is not yet confirmed/finalized.",
            receivedAmount: formatAmountFromBaseUnits(weiAmount, 18)
        };
    }

    return {
        status: "verified",
        reason: "Ethereum transaction verified.",
        receivedAmount: formatAmountFromBaseUnits(weiAmount, 18),
        blockNumber: receipt.blockNumber || null
    };
}

async function verifyBtcTransaction(txHash, walletAddress) {
    if (!/^[a-fA-F0-9]{64}$/.test(txHash)) {
        return {
            status: "rejected",
            reason: "Invalid Bitcoin transaction hash format."
        };
    }

    const { response, payload } = await fetchJsonWithTimeout(`${config.btcApiBase}/tx/${txHash}`, {}, 12000);

    if (response.status === 404) {
        return {
            status: "pending_verification",
            reason: "Transaction not yet visible on Bitcoin."
        };
    }

    if (!response.ok || typeof payload !== "object") {
        throw new Error(`BTC API request failed (${response.status}).`);
    }

    const outputs = Array.isArray(payload.vout) ? payload.vout : [];
    const normalizedWallet = normalizeBtcAddress(walletAddress);
    let satsToWallet = 0n;

    for (const output of outputs) {
        const outputAddress = normalizeBtcAddress(output?.scriptpubkey_address);
        if (outputAddress !== normalizedWallet) continue;

        try {
            satsToWallet += BigInt(output?.value || 0);
        } catch (error) {
            continue;
        }
    }

    if (satsToWallet <= 0n) {
        return {
            status: "rejected",
            reason: "No BTC output to configured wallet was found in this transaction."
        };
    }

    const isConfirmed = Boolean(payload.status?.confirmed);
    if (!isConfirmed) {
        return {
            status: "pending_verification",
            reason: "BTC transaction is broadcast but not yet confirmed.",
            receivedAmount: formatAmountFromBaseUnits(satsToWallet, 8)
        };
    }

    return {
        status: "verified",
        reason: "Bitcoin transaction verified.",
        receivedAmount: formatAmountFromBaseUnits(satsToWallet, 8),
        blockHeight: payload.status?.block_height || null
    };
}

async function verifySolTransaction(txHash, walletAddress) {
    if (!/^[1-9A-HJ-NP-Za-km-z]{70,100}$/.test(txHash)) {
        return {
            status: "rejected",
            reason: "Invalid Solana signature format."
        };
    }

    const transaction = await solRpc("getTransaction", [
        txHash,
        {
            commitment: "confirmed",
            encoding: "jsonParsed",
            maxSupportedTransactionVersion: 0
        }
    ]);

    if (!transaction) {
        return {
            status: "pending_verification",
            reason: "Transaction not yet visible on Solana."
        };
    }

    if (transaction?.meta?.err) {
        return {
            status: "rejected",
            reason: "Solana transaction failed on-chain."
        };
    }

    const topLevel = extractSolLamports(transaction?.transaction?.message?.instructions, walletAddress);
    const inner = Array.isArray(transaction?.meta?.innerInstructions)
        ? transaction.meta.innerInstructions.reduce(
              (sum, entry) => sum + extractSolLamports(entry?.instructions, walletAddress),
              0n
          )
        : 0n;

    const lamports = topLevel + inner;
    if (lamports <= 0n) {
        return {
            status: "rejected",
            reason: "No SOL transfer to configured wallet was found in this transaction."
        };
    }

    const statuses = await solRpc("getSignatureStatuses", [[txHash], { searchTransactionHistory: true }]);
    const signatureStatus = statuses?.value?.[0] || null;
    const confirmation = signatureStatus?.confirmationStatus || "processed";
    if (!["confirmed", "finalized"].includes(confirmation)) {
        return {
            status: "pending_verification",
            reason: "Solana transaction is processed but not yet confirmed.",
            receivedAmount: formatAmountFromBaseUnits(lamports, 9)
        };
    }

    return {
        status: "verified",
        reason: "Solana transaction verified.",
        receivedAmount: formatAmountFromBaseUnits(lamports, 9),
        slot: transaction.slot || null
    };
}

async function verifyPaymentOnChain(coin, txHash, walletAddress) {
    if (coin === "ETH") return verifyEthTransaction(txHash, walletAddress);
    if (coin === "BTC") return verifyBtcTransaction(txHash, walletAddress);
    if (coin === "SOL") return verifySolTransaction(txHash, walletAddress);
    return {
        status: "rejected",
        reason: "Unsupported coin."
    };
}

function normalizeDodoPaymentStatus(value) {
    const normalized = String(value || "")
        .trim()
        .toLowerCase();
    return normalized || null;
}

function mapDodoStatusToInternalStatus(dodoStatus) {
    if (dodoStatus === "succeeded") return "verified";
    if (dodoStatus === "failed" || dodoStatus === "cancelled") return "rejected";
    return "pending_verification";
}

function isTerminalDodoStatus(dodoStatus) {
    return ["succeeded", "failed", "cancelled"].includes(dodoStatus);
}

function publicDodoCheckout(row) {
    if (!row) return null;
    return {
        sessionId: row.session_id,
        productId: row.product_id,
        amountUsd: Number(row.amount_usd || 0),
        currency: row.currency || "USD",
        checkoutUrl: row.checkout_url || null,
        paymentId: row.payment_id || null,
        paymentStatus: row.payment_status || null,
        paymentReference: row.payment_reference || null,
        createdAt: row.created_at,
        updatedAt: row.updated_at
    };
}

function getCardPlanLabel(productId) {
    const product = getBillingProductById(productId);
    if (!product) return "Radon Card Checkout";
    return `${product.name} (${product.termLabel})`;
}

async function dodoApiRequest(method, endpoint, body) {
    if (!isDodoConfigured()) {
        const error = new Error("Card checkout is not configured on the server.");
        error.status = 503;
        throw error;
    }

    const normalizedEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${getDodoApiBaseUrl()}${normalizedEndpoint}`;
    const headers = {
        Authorization: `Bearer ${config.dodo.apiKey}`
    };

    if (body !== undefined) {
        headers["Content-Type"] = "application/json";
    }

    const { response, payload } = await fetchJsonWithTimeout(
        url,
        {
            method,
            headers,
            body: body !== undefined ? JSON.stringify(body) : undefined
        },
        12000
    );

    if (!response.ok) {
        const message =
            (payload && typeof payload === "object" && (payload.message || payload.error)) ||
            (typeof payload === "string" ? payload : "");
        const error = new Error(
            message ? `Dodo request failed (${response.status}): ${message}` : `Dodo request failed (${response.status}).`
        );
        error.status = response.status;
        error.payload = payload;
        throw error;
    }

    if (!payload || typeof payload !== "object") {
        throw new Error("Dodo returned an invalid response.");
    }

    return payload;
}

async function syncDodoCheckoutSession(row, context = {}) {
    const remote = await dodoApiRequest("GET", `/checkouts/${encodeURIComponent(row.session_id)}`);
    const now = nowIso();
    const previousStatus = normalizeDodoPaymentStatus(row.payment_status);
    const paymentStatus = normalizeDodoPaymentStatus(remote?.payment_status);
    const paymentId = String(remote?.payment_id || "").trim() || null;

    db.prepare("UPDATE dodo_checkouts SET payment_id = ?, payment_status = ?, updated_at = ? WHERE session_id = ?").run(
        paymentId,
        paymentStatus,
        now,
        row.session_id
    );

    let paymentReference = String(row.payment_reference || "").trim() || null;

    if (paymentStatus === "succeeded") {
        const paymentKey = paymentId || row.session_id;
        const verificationDetails = {
            provider: "dodo_payments",
            checkoutSessionId: row.session_id,
            paymentId,
            paymentStatus,
            syncedAt: now
        };

        const existing = db
            .prepare("SELECT reference, status FROM payments WHERE coin = ? AND tx_hash = ?")
            .get(DODO_PAYMENT_COIN, paymentKey);

        if (existing) {
            paymentReference = existing.reference;
            if (existing.status !== "verified") {
                db.prepare("UPDATE payments SET status = 'verified', verification_details = ?, updated_at = ? WHERE reference = ?").run(
                    JSON.stringify(verificationDetails),
                    now,
                    paymentReference
                );
            }
        } else {
            paymentReference = createReference("PAY");
            db.prepare(
                `
                INSERT INTO payments (
                    reference, user_id, plan, amount_usd, coin, wallet, tx_hash, status, received_amount,
                    verification_details, created_at, updated_at
                )
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `
            ).run(
                paymentReference,
                row.user_id,
                getCardPlanLabel(row.product_id),
                Number(row.amount_usd || 0),
                DODO_PAYMENT_COIN,
                DODO_PAYMENT_WALLET,
                paymentKey,
                "verified",
                null,
                JSON.stringify(verificationDetails),
                now,
                now
            );
        }

        db.prepare("UPDATE users SET has_paid_access = 1, active_plan = 'Lifetime', updated_at = ? WHERE id = ?").run(
            now,
            row.user_id
        );
        db.prepare("UPDATE dodo_checkouts SET payment_reference = ?, updated_at = ? WHERE session_id = ?").run(
            paymentReference,
            now,
            row.session_id
        );

        if (previousStatus !== "succeeded") {
            addSecurityEvent(
                row.user_id,
                "billing_verified",
                "low",
                "Card payment verified",
                `Card checkout ${row.session_id} was verified by Dodo Payments.`,
                context.actor || "system",
                context.sourceIp || null
            );
        }
    } else if (paymentStatus && (paymentStatus === "failed" || paymentStatus === "cancelled")) {
        if (previousStatus !== paymentStatus) {
            addSecurityEvent(
                row.user_id,
                "billing_rejected",
                "medium",
                paymentStatus === "failed" ? "Card payment failed" : "Card payment cancelled",
                `Card checkout ${row.session_id} ended with status ${paymentStatus}.`,
                context.actor || "system",
                context.sourceIp || null
            );
        }
    }

    const refreshed = db
        .prepare(
            `
            SELECT session_id, user_id, product_id, amount_usd, currency, checkout_url, payment_id, payment_status,
                   payment_reference, metadata, created_at, updated_at
            FROM dodo_checkouts
            WHERE session_id = ?
        `
        )
        .get(row.session_id);

    return {
        checkout: refreshed,
        remote,
        internalStatus: mapDodoStatusToInternalStatus(paymentStatus)
    };
}

function getDashboardSummary(userId) {
    const now = new Date();
    const labels = [];
    const keys = [];

    for (let offset = 6; offset >= 0; offset -= 1) {
        const day = new Date(now);
        day.setHours(0, 0, 0, 0);
        day.setDate(day.getDate() - offset);
        labels.push(day.toLocaleDateString("en-US", { weekday: "short" }));
        keys.push(day.toISOString().slice(0, 10));
    }

    const securityRollup = db
        .prepare(
            `
            SELECT substr(created_at, 1, 10) AS day_key,
                   COUNT(*) AS total_events,
                   SUM(CASE WHEN severity IN ('high', 'critical') THEN 1 ELSE 0 END) AS blocked
            FROM security_events
            WHERE created_at >= ?
              AND (user_id IS NULL OR user_id = ?)
            GROUP BY substr(created_at, 1, 10)
        `
        )
        .all(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), userId);

    const paymentsRollup = db
        .prepare(
            `
            SELECT substr(created_at, 1, 10) AS day_key,
                   COUNT(*) AS verified_count
            FROM payments
            WHERE user_id = ? AND status = 'verified' AND created_at >= ?
            GROUP BY substr(created_at, 1, 10)
        `
        )
        .all(userId, new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString());

    const byDaySecurity = new Map(securityRollup.map((row) => [row.day_key, row]));
    const byDayPayments = new Map(paymentsRollup.map((row) => [row.day_key, row]));

    const detections = [];
    const sessions = [];
    const verifiedPaymentsTrend = [];

    for (let index = 0; index < keys.length; index += 1) {
        const key = keys[index];
        const security = byDaySecurity.get(key);
        const payment = byDayPayments.get(key);
        const detectionCount = Number(security?.total_events || 0);

        detections.push(detectionCount);
        sessions.push(0);
        verifiedPaymentsTrend.push(Number(payment?.verified_count || 0));
    }

    const blockedThreats = securityRollup.reduce((sum, row) => sum + Number(row.blocked || 0), 0);
    const totalSessions = 0;
    const activePlayers = db.prepare("SELECT COUNT(*) AS c FROM players").get().c;
    const activeRulesets = db.prepare("SELECT COUNT(*) AS c FROM rulesets WHERE status != 'disabled'").get().c;
    const verifiedPayments = db
        .prepare("SELECT COUNT(*) AS c FROM payments WHERE user_id = ? AND status = 'verified'")
        .get(userId).c;
    const verifiedRevenue = db
        .prepare("SELECT COALESCE(SUM(amount_usd), 0) AS total FROM payments WHERE user_id = ? AND status = 'verified'")
        .get(userId).total;

    return {
        generatedAt: nowIso(),
        summary: {
            sessionsScanned: totalSessions,
            blockedThreats,
            latencyOverheadPct: null,
            activePlayers,
            activeRulesets,
            verifiedPayments,
            verifiedRevenueUsd: Number(verifiedRevenue || 0),
            threatConfidencePct: null
        },
        trends: {
            labels,
            detections,
            sessions,
            verifiedPayments: verifiedPaymentsTrend
        }
    };
}

app.get("/api/health", (req, res) => {
    res.json({
        ok: true,
        now: nowIso()
    });
});

app.post("/api/auth/register", authLimiter, (req, res) => {
    const name = sanitizeName(req.body?.name);
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || "");
    const selectedPlan = String(req.body?.plan || "Lifetime");

    if (name.length < 2 || name.length > 60) {
        return res.status(400).json({ error: "Display name must be between 2 and 60 characters." });
    }
    if (!isValidEmail(email)) {
        return res.status(400).json({ error: "Provide a valid email address." });
    }
    if (password.length < 8 || password.length > 128) {
        return res.status(400).json({ error: "Password must be between 8 and 128 characters." });
    }
    if (!isPlanValid(selectedPlan)) {
        return res.status(400).json({ error: "Plan is invalid." });
    }

    const exists = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
    if (exists) {
        return res.status(409).json({ error: "An account with that email already exists." });
    }

    const date = nowIso();
    const passwordHash = bcrypt.hashSync(password, 12);

    const result = db
        .prepare(
            "INSERT INTO users (display_name, email, password_hash, active_plan, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)"
        )
        .run(name, email, passwordHash, selectedPlan, date, date);

    const user = db
        .prepare("SELECT id, display_name, email, active_plan, has_paid_access, avatar_url, created_at FROM users WHERE id = ?")
        .get(result.lastInsertRowid);

    req.session.userId = user.id;
    req.session.save(() => undefined);

    addSecurityEvent(user.id, "auth_register", "low", "New account created", "Dashboard account created.", name, req.ip);
    return res.status(201).json({
        user: publicUser(user)
    });
});

app.post("/api/auth/login", authLimiter, (req, res) => {
    const email = normalizeEmail(req.body?.email);
    const password = String(req.body?.password || "");

    if (!isValidEmail(email) || !password) {
        return res.status(400).json({ error: "Email and password are required." });
    }

    const row = db
        .prepare(
            "SELECT id, display_name, email, active_plan, has_paid_access, avatar_url, created_at, password_hash FROM users WHERE email = ?"
        )
        .get(email);

    if (!row || !bcrypt.compareSync(password, row.password_hash)) {
        return res.status(401).json({ error: "Invalid credentials." });
    }

    req.session.userId = row.id;
    req.session.save(() => undefined);

    addSecurityEvent(row.id, "auth_login", "low", "User signed in", "Dashboard sign-in completed.", row.display_name, req.ip);
    return res.json({
        user: publicUser(row)
    });
});

app.post("/api/auth/logout", (req, res) => {
    if (!req.session) {
        return res.json({ ok: true });
    }
    req.session.destroy(() => {
        res.clearCookie("radon.sid");
        return res.json({ ok: true });
    });
});

app.get("/api/auth/me", requireAuth, (req, res) => {
    return res.json({
        user: publicUser(req.user)
    });
});

app.patch("/api/auth/profile", requireAuth, (req, res) => {
    const payload = req.body && typeof req.body === "object" ? req.body : {};
    const hasName = Object.prototype.hasOwnProperty.call(payload, "name");
    const hasAvatar = Object.prototype.hasOwnProperty.call(payload, "avatarUrl");

    const nextName = hasName ? sanitizeName(payload.name) : req.user.display_name;
    if (nextName.length < 2 || nextName.length > 60) {
        return res.status(400).json({ error: "Display name must be between 2 and 60 characters." });
    }

    let nextAvatar = req.user.avatar_url || null;
    if (hasAvatar) {
        const rawAvatar = String(payload.avatarUrl || "").trim();
        if (!rawAvatar) {
            nextAvatar = null;
        } else {
            const parsed = sanitizeAvatarUrl(rawAvatar);
            if (!parsed) {
                return res.status(400).json({ error: "Avatar URL must be a valid http(s) URL." });
            }
            nextAvatar = parsed;
        }
    }

    const date = nowIso();
    db.prepare("UPDATE users SET display_name = ?, avatar_url = ?, updated_at = ? WHERE id = ?").run(
        nextName,
        nextAvatar,
        date,
        req.user.id
    );

    const user = db
        .prepare("SELECT id, display_name, email, active_plan, has_paid_access, avatar_url, created_at FROM users WHERE id = ?")
        .get(req.user.id);

    addSecurityEvent(
        req.user.id,
        "profile_update",
        "low",
        "Profile updated",
        "Account profile information was updated.",
        user.display_name,
        req.ip
    );

    return res.json({ user: publicUser(user) });
});

app.get("/api/billing/wallets", requireAuth, (req, res) => {
    return res.json({
        wallets: config.wallets,
        networks: {
            ETH: "Ethereum mainnet",
            BTC: "Bitcoin mainnet",
            SOL: "Solana mainnet"
        }
    });
});

app.get("/api/billing/catalog", requireAuth, (req, res) => {
    return res.json({
        products: BILLING_PRODUCTS,
        wallets: config.wallets,
        supportedCoins: SUPPORTED_COINS,
        cardCheckout: {
            enabled: isDodoConfigured(),
            provider: "dodo_payments"
        },
        networks: {
            ETH: "Ethereum mainnet",
            BTC: "Bitcoin mainnet",
            SOL: "Solana mainnet"
        }
    });
});

app.post("/api/billing/dodo/checkouts", requireAuth, async (req, res, next) => {
    try {
        if (!isDodoConfigured()) {
            return res.status(503).json({
                error: "Card checkout is not configured yet. Add DODO_PAYMENTS_API_KEY and DODO_PAYMENTS_PRODUCT_ID."
            });
        }
        if (req.user?.has_paid_access) {
            return res.status(409).json({ error: "This account already has paid access." });
        }

        const productId = String(req.body?.productId || "radon_anti_cheat_lifetime").trim();
        const product = getBillingProductById(productId);
        if (!product) {
            return res.status(400).json({ error: "Product is invalid." });
        }

        const returnUrl = `${buildExternalBaseUrl(req)}/checkout.html?method=card`;
        const metadata = {
            radon_user_id: String(req.user.id),
            radon_product_id: product.id
        };

        const payload = await dodoApiRequest("POST", "/checkouts", {
            product_cart: [{ product_id: config.dodo.productId, quantity: 1 }],
            allowed_payment_method_types: DODO_PAYMENT_METHODS,
            customer: {
                email: req.user.email,
                name: req.user.display_name
            },
            return_url: returnUrl,
            metadata
        });

        const sessionId = String(payload?.session_id || "").trim();
        const checkoutUrl = String(payload?.checkout_url || "").trim();
        if (!sessionId || !checkoutUrl) {
            return res.status(502).json({ error: "Dodo did not return a valid checkout session." });
        }

        const now = nowIso();
        const paymentStatus = normalizeDodoPaymentStatus(payload?.payment_status) || "requires_payment_method";

        db.prepare(
            `
            INSERT INTO dodo_checkouts (
                session_id, user_id, product_id, amount_usd, currency, checkout_url, payment_id, payment_status,
                payment_reference, metadata, created_at, updated_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
        ).run(
            sessionId,
            req.user.id,
            product.id,
            Number(product.priceUsd || 0),
            "USD",
            checkoutUrl,
            String(payload?.payment_id || "").trim() || null,
            paymentStatus,
            null,
            JSON.stringify(metadata),
            now,
            now
        );

        addSecurityEvent(
            req.user.id,
            "billing_invoice_created",
            "low",
            "Card checkout started",
            `Started Dodo card checkout session ${sessionId}.`,
            req.user.display_name,
            req.ip
        );

        return res.status(201).json({
            checkout: {
                sessionId,
                checkoutUrl,
                paymentStatus,
                amountUsd: Number(product.priceUsd || 0),
                productId: product.id
            }
        });
    } catch (error) {
        req.log.error({ err: error }, "Dodo checkout session creation failed");
        return next(error);
    }
});

app.get("/api/billing/dodo/checkouts/:sessionId", requireAuth, async (req, res, next) => {
    try {
        const sessionId = String(req.params?.sessionId || "").trim();
        if (!sessionId) {
            return res.status(400).json({ error: "Session ID is required." });
        }

        const row = db
            .prepare(
                `
                SELECT session_id, user_id, product_id, amount_usd, currency, checkout_url, payment_id, payment_status,
                       payment_reference, metadata, created_at, updated_at
                FROM dodo_checkouts
                WHERE session_id = ? AND user_id = ?
            `
            )
            .get(sessionId, req.user.id);

        if (!row) {
            return res.status(404).json({ error: "Card checkout session not found." });
        }
        if (!isDodoConfigured()) {
            return res.status(503).json({
                error: "Card checkout is not configured yet. Add DODO_PAYMENTS_API_KEY and DODO_PAYMENTS_PRODUCT_ID."
            });
        }

        let activeCheckout = row;
        const shouldRefresh = !isTerminalDodoStatus(normalizeDodoPaymentStatus(row.payment_status)) || !row.payment_reference;

        if (shouldRefresh) {
            const synced = await syncDodoCheckoutSession(row, {
                actor: req.user.display_name,
                sourceIp: req.ip
            });
            activeCheckout = synced.checkout;
        }

        const freshUser = db
            .prepare("SELECT id, display_name, email, active_plan, has_paid_access, avatar_url, created_at FROM users WHERE id = ?")
            .get(req.user.id);

        return res.json({
            checkout: publicDodoCheckout(activeCheckout),
            user: publicUser(freshUser),
            accessGranted: Boolean(freshUser?.has_paid_access)
        });
    } catch (error) {
        req.log.error({ err: error }, "Dodo checkout status sync failed");
        return next(error);
    }
});

app.get("/api/billing/invoices", requireAuth, (req, res) => {
    const rawLimit = Number(req.query?.limit || 20);
    const limit = Number.isFinite(rawLimit) ? Math.max(1, Math.min(rawLimit, 100)) : 20;
    const now = nowIso();
    db.prepare(
        `
        UPDATE invoices
        SET status = 'expired', updated_at = ?
        WHERE user_id = ?
          AND status = 'awaiting_payment'
          AND datetime(expires_at) <= datetime(?)
    `
    ).run(now, req.user.id, now);

    const rows = db
        .prepare(
            `
            SELECT id, product_id, product_name, term_label, amount_usd, coin, wallet, status,
                   tx_hash, payment_reference, required_amount, quoted_usd_rate, quote_source, expires_at, created_at, updated_at
            FROM invoices
            WHERE user_id = ?
            ORDER BY datetime(created_at) DESC
            LIMIT ?
        `
        )
        .all(req.user.id, limit);

    return res.json({
        invoices: rows.map(publicInvoice)
    });
});

app.post("/api/billing/invoices", requireAuth, async (req, res, next) => {
    try {
        const productId = String(req.body?.productId || "").trim();
        const coin = String(req.body?.coin || "").trim().toUpperCase();
        const normalizedCoin = coin || "ETH";
        const product = getBillingProductById(productId);

        if (!product) {
            return res.status(400).json({ error: "Product is invalid." });
        }
        if (!SUPPORTED_COINS.includes(normalizedCoin)) {
            return res.status(400).json({ error: "Coin is invalid." });
        }

        const wallet = config.wallets[normalizedCoin];
        if (!wallet) {
            return res.status(500).json({ error: "No receiving wallet configured for this coin." });
        }

        const now = nowIso();
        const existing = db
            .prepare(
                `
                SELECT id, product_id, product_name, term_label, amount_usd, coin, wallet, status,
                       tx_hash, payment_reference, required_amount, quoted_usd_rate, quote_source, expires_at, created_at, updated_at
                FROM invoices
                WHERE user_id = ?
                  AND product_id = ?
                  AND coin = ?
                  AND status = 'awaiting_payment'
                  AND datetime(expires_at) > datetime(?)
                ORDER BY datetime(created_at) DESC
                LIMIT 1
            `
            )
            .get(req.user.id, product.id, normalizedCoin, now);

        if (existing && existing.required_amount) {
            return res.json({
                invoice: publicInvoice(existing),
                reused: true
            });
        }
        if (existing && !existing.required_amount) {
            db.prepare("UPDATE invoices SET status = 'expired', updated_at = ? WHERE id = ?").run(now, existing.id);
        }

        let quotedUsdRate;
        let requiredAmount;
        let quoteSource;
        try {
            const quote = await fetchUsdQuoteForCoin(normalizedCoin);
            quotedUsdRate = quote.usd;
            quoteSource = quote.source;
            requiredAmount = computeRequiredCoinAmount(product.priceUsd, quotedUsdRate, normalizedCoin);
        } catch (quoteError) {
            req.log.warn({ err: quoteError, coin: normalizedCoin }, "Could not quote coin price for invoice");
            return res.status(503).json({
                error: "Could not fetch live coin pricing. Please try again in a moment."
            });
        }

        const invoiceId = crypto.randomUUID();
        const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

        db.prepare(
            `
            INSERT INTO invoices (
                id, user_id, product_id, product_name, term_label, amount_usd, coin, wallet, status,
                tx_hash, payment_reference, required_amount, quoted_usd_rate, quote_source, expires_at, created_at, updated_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
        ).run(
            invoiceId,
            req.user.id,
            product.id,
            product.name,
            product.termLabel,
            product.priceUsd,
            normalizedCoin,
            wallet,
            "awaiting_payment",
            null,
            null,
            requiredAmount,
            quotedUsdRate,
            quoteSource,
            expiresAt,
            now,
            now
        );

        const created = db
            .prepare(
                `
                SELECT id, product_id, product_name, term_label, amount_usd, coin, wallet, status,
                       tx_hash, payment_reference, required_amount, quoted_usd_rate, quote_source, expires_at, created_at, updated_at
                FROM invoices
                WHERE id = ?
            `
            )
            .get(invoiceId);

        addSecurityEvent(
            req.user.id,
            "billing_invoice_created",
            "low",
            "Invoice created",
            `Invoice ${invoiceId} created for ${product.name}.`,
            req.user.display_name,
            req.ip
        );

        return res.status(201).json({
            invoice: publicInvoice(created),
            reused: false
        });
    } catch (error) {
        req.log.error({ err: error }, "Invoice creation failed");
        return next(error);
    }
});

app.post("/api/billing/invoices/:invoiceId/submit-tx", requireAuth, async (req, res, next) => {
    try {
        const invoiceId = String(req.params?.invoiceId || "").trim();
        const txHash = String(req.body?.txHash || "").trim();

        if (!invoiceId) {
            return res.status(400).json({ error: "Invoice ID is required." });
        }
        if (!txHash) {
            return res.status(400).json({ error: "Transaction hash is required." });
        }

        const row = db
            .prepare(
                `
                SELECT id, user_id, product_id, product_name, term_label, amount_usd, coin, wallet, status,
                       tx_hash, payment_reference, required_amount, quoted_usd_rate, quote_source, expires_at, created_at, updated_at
                FROM invoices
                WHERE id = ? AND user_id = ?
            `
            )
            .get(invoiceId, req.user.id);

        if (!row) {
            return res.status(404).json({ error: "Invoice not found." });
        }

        if (row.status === "verified") {
            return res.json({
                invoice: publicInvoice(row),
                message: "Invoice is already paid."
            });
        }

        const now = nowIso();
        const isExpired = new Date(row.expires_at).getTime() <= Date.now();
        if (isExpired && row.status === "awaiting_payment") {
            db.prepare("UPDATE invoices SET status = ?, updated_at = ? WHERE id = ?").run("expired", now, row.id);
            const expired = db
                .prepare(
                    `
                    SELECT id, product_id, product_name, term_label, amount_usd, coin, wallet, status,
                           tx_hash, payment_reference, required_amount, quoted_usd_rate, quote_source, expires_at, created_at, updated_at
                    FROM invoices
                    WHERE id = ?
                `
                )
                .get(row.id);
            return res.status(410).json({
                error: "Invoice expired. Create a new invoice.",
                invoice: publicInvoice(expired)
            });
        }

        const claimed = db
            .prepare("SELECT reference, status, user_id FROM payments WHERE coin = ? AND tx_hash = ?")
            .get(row.coin, txHash);

        if (claimed && claimed.user_id !== req.user.id) {
            return res.status(409).json({ error: "This transaction hash is already claimed." });
        }

        if (claimed && claimed.user_id === req.user.id) {
            db.prepare("UPDATE invoices SET status = ?, tx_hash = ?, payment_reference = ?, updated_at = ? WHERE id = ?").run(
                claimed.status,
                txHash,
                claimed.reference,
                now,
                row.id
            );
            const existingInvoice = db
                .prepare(
                    `
                    SELECT id, product_id, product_name, term_label, amount_usd, coin, wallet, status,
                           tx_hash, payment_reference, required_amount, quoted_usd_rate, quote_source, expires_at, created_at, updated_at
                    FROM invoices
                    WHERE id = ?
                `
                )
                .get(row.id);
            return res.json({
                invoice: publicInvoice(existingInvoice),
                message: "This transaction has already been submitted."
            });
        }

        const verification = await verifyPaymentOnChain(row.coin, txHash, row.wallet);
        let normalizedStatus = verification.status || "pending_verification";
        let verificationReason = verification.reason || "";

        if (normalizedStatus !== "rejected") {
            if (!verification.receivedAmount) {
                normalizedStatus = "rejected";
                verificationReason = "Could not determine transaction amount for this payment.";
            } else if (!isReceivedAmountSufficient(row.required_amount, verification.receivedAmount)) {
                normalizedStatus = "rejected";
                verificationReason = `Received ${verification.receivedAmount} ${row.coin}. Required at least ${row.required_amount} ${row.coin}.`;
            }
        }

        const verificationDetails = {
            ...verification,
            requiredAmount: row.required_amount || null,
            quotedUsdRate: row.quoted_usd_rate || null,
            quoteSource: row.quote_source || null,
            adjustedStatus: normalizedStatus,
            adjustedReason: verificationReason
        };

        const paymentReference = createReference("PAY");
        const productLabel = `${row.product_name} (${row.term_label})`;

        db.prepare(
            `
            INSERT INTO payments (
                reference, user_id, plan, amount_usd, coin, wallet, tx_hash, status, received_amount,
                verification_details, created_at, updated_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
        ).run(
            paymentReference,
            req.user.id,
            productLabel,
            row.amount_usd,
            row.coin,
            row.wallet,
            txHash,
            normalizedStatus,
            verification.receivedAmount || null,
            JSON.stringify(verificationDetails),
            now,
            now
        );

        db.prepare(
            "UPDATE invoices SET status = ?, tx_hash = ?, payment_reference = ?, updated_at = ? WHERE id = ?"
        ).run(normalizedStatus, txHash, paymentReference, now, row.id);

        if (normalizedStatus === "verified") {
            db.prepare("UPDATE users SET has_paid_access = 1, active_plan = 'Lifetime', updated_at = ? WHERE id = ?").run(
                now,
                req.user.id
            );
            addSecurityEvent(
                req.user.id,
                "billing_verified",
                "low",
                `${row.coin} payment verified`,
                `Invoice ${row.id} for ${productLabel} is verified.`,
                req.user.display_name,
                req.ip
            );
        } else if (normalizedStatus === "rejected") {
            addSecurityEvent(
                req.user.id,
                "billing_rejected",
                "medium",
                `${row.coin} payment rejected`,
                verificationReason || "Payment failed verification rules.",
                req.user.display_name,
                req.ip
            );
        } else {
            addSecurityEvent(
                req.user.id,
                "billing_pending",
                "low",
                `${row.coin} payment pending`,
                verificationReason || "Awaiting additional network confirmations.",
                req.user.display_name,
                req.ip
            );
        }

        const updated = db
            .prepare(
                `
                SELECT id, product_id, product_name, term_label, amount_usd, coin, wallet, status,
                       tx_hash, payment_reference, required_amount, quoted_usd_rate, quote_source, expires_at, created_at, updated_at
                FROM invoices
                WHERE id = ?
            `
            )
            .get(row.id);

        return res.status(201).json({
            invoice: publicInvoice(updated),
            payment: {
                reference: paymentReference,
                status: normalizedStatus,
                message: verificationReason || "",
                coin: row.coin,
                amountUsd: Number(row.amount_usd || 0),
                receivedAmount: verification.receivedAmount || null
            }
        });
    } catch (error) {
        req.log.error({ err: error }, "Invoice payment submission failed");
        return next(error);
    }
});

app.get("/api/billing/plans", requireAuth, (req, res) => {
    return res.json({
        plans: PLAN_PRICES_USD
    });
});

app.post("/api/payments/verify", requireAuth, async (req, res, next) => {
    try {
        const plan = String(req.body?.plan || "");
        const coin = String(req.body?.coin || "").toUpperCase();
        const txHash = String(req.body?.txHash || "").trim();
        const amountUsd = getPlanPriceUsd(plan);

        if (!isPlanValid(plan)) {
            return res.status(400).json({ error: "Plan is invalid." });
        }
        if (!SUPPORTED_COINS.includes(coin)) {
            return res.status(400).json({ error: "Coin is invalid." });
        }
        if (!txHash) {
            return res.status(400).json({ error: "Transaction hash is required." });
        }

        const existing = db
            .prepare("SELECT reference, status, user_id, plan, amount_usd FROM payments WHERE coin = ? AND tx_hash = ?")
            .get(coin, txHash);
        if (existing && existing.user_id !== req.user.id) {
            return res.status(409).json({ error: "This transaction hash is already claimed." });
        }
        if (existing && existing.user_id === req.user.id) {
            return res.json({
                reference: existing.reference,
                status: existing.status,
                message: "This transaction has already been submitted.",
                plan: existing.plan,
                amountUsd: Number(existing.amount_usd || amountUsd)
            });
        }

        const wallet = config.wallets[coin];
        const verification = await verifyPaymentOnChain(coin, txHash, wallet);
        const now = nowIso();
        const reference = createReference("PAY");
        const normalizedStatus = verification.status || "pending_verification";

        db.prepare(
            `
            INSERT INTO payments (
                reference, user_id, plan, amount_usd, coin, wallet, tx_hash, status, received_amount,
                verification_details, created_at, updated_at
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `
        ).run(
            reference,
            req.user.id,
            plan,
            amountUsd,
            coin,
            wallet,
            txHash,
            normalizedStatus,
            verification.receivedAmount || null,
            JSON.stringify(verification),
            now,
            now
        );

        if (normalizedStatus === "verified") {
            db.prepare("UPDATE users SET active_plan = ?, has_paid_access = 1, updated_at = ? WHERE id = ?").run(
                plan,
                now,
                req.user.id
            );
            addSecurityEvent(
                req.user.id,
                "billing_verified",
                "low",
                `${coin} payment verified`,
                `Payment ${reference} was confirmed on-chain.`,
                req.user.display_name,
                req.ip
            );
        } else if (normalizedStatus === "rejected") {
            addSecurityEvent(
                req.user.id,
                "billing_rejected",
                "medium",
                `${coin} payment rejected`,
                verification.reason || "Payment failed verification rules.",
                req.user.display_name,
                req.ip
            );
        } else {
            addSecurityEvent(
                req.user.id,
                "billing_pending",
                "low",
                `${coin} payment pending`,
                verification.reason || "Awaiting additional network confirmations.",
                req.user.display_name,
                req.ip
            );
        }

        return res.status(201).json({
            reference,
            status: normalizedStatus,
            message: verification.reason,
            plan,
            amountUsd,
            wallet,
            coin,
            receivedAmount: verification.receivedAmount || null
        });
    } catch (error) {
        req.log.error({ err: error }, "Payment verification request failed");
        return next(error);
    }
});

app.get("/api/dashboard/overview", requireAuth, requirePaidAccess, (req, res) => {
    const summary = getDashboardSummary(req.user.id);
    const events = db
        .prepare(
            `
            SELECT id, event_type, severity, title, description, actor, source_ip, created_at
            FROM security_events
            WHERE user_id IS NULL OR user_id = ?
            ORDER BY datetime(created_at) DESC
            LIMIT 14
        `
        )
        .all(req.user.id);

    const payments = db
        .prepare(
            `
            SELECT reference, coin, plan, amount_usd, status, tx_hash, created_at
            FROM payments
            WHERE user_id = ?
            ORDER BY datetime(created_at) DESC
            LIMIT 10
        `
        )
        .all(req.user.id);

    const players = db
        .prepare(
            `
            SELECT username, status, risk_score, last_seen_at
            FROM players
            ORDER BY risk_score DESC, datetime(last_seen_at) DESC
            LIMIT 12
        `
        )
        .all();

    const rulesets = db
        .prepare(
            `
            SELECT name, status, coverage_pct, last_triggered_at, updated_at
            FROM rulesets
            ORDER BY coverage_pct DESC, datetime(updated_at) DESC
        `
        )
        .all();

    return res.json({
        ...summary,
        events,
        payments,
        players,
        rulesets
    });
});

app.get("/api/dashboard/detections", requireAuth, requirePaidAccess, (req, res) => {
    const rawLimit = Number(req.query?.limit || 40);
    const limit = Number.isFinite(rawLimit) ? Math.max(1, Math.min(rawLimit, 200)) : 40;
    const events = db
        .prepare(
            `
            SELECT id, event_type, severity, title, description, actor, source_ip, created_at
            FROM security_events
            WHERE user_id IS NULL OR user_id = ?
            ORDER BY datetime(created_at) DESC
            LIMIT ?
        `
        )
        .all(req.user.id, limit);

    res.json({ events });
});

app.use("/api", (req, res) => {
    return res.status(404).json({ error: "API route not found." });
});

app.use(express.static(BASE_DIR, { index: ["index.html"] }));

app.use((err, req, res, next) => {
    req.log.error({ err }, "Unhandled server error");
    if (res.headersSent) {
        return next(err);
    }

    return res.status(500).json({
        error: "Internal server error.",
        details: config.nodeEnv === "development" ? err.message : undefined
    });
});

app.listen(config.port, () => {
    logger.info(
        {
            port: config.port,
            env: config.nodeEnv,
            dbPath: config.dbPath
        },
        "Radon server running"
    );
});

