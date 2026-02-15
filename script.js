const STORAGE_KEYS = {
    plan: "radon_selected_plan",
    rememberedEmail: "radon_remembered_email",
    selectedProduct: "radon_selected_product",
    selectedCoin: "radon_selected_coin",
    selectedPaymentMethod: "radon_selected_payment_method",
    pendingDodoSession: "radon_pending_dodo_session",
    authRedirectLoopTarget: "radon_auth_redirect_loop_target",
    authRedirectLoopCount: "radon_auth_redirect_loop_count",
    authRedirectLoopAt: "radon_auth_redirect_loop_at"
};

const DEFAULT_WALLETS = {
    ETH: "0x9D575B4e92063BD6FA3e5b478Fa5EBFc8d531241",
    BTC: "bc1p0wpgtfk3h6zv98had7kzfvgte4l237cmmt0sads7jg7n47lcknxsf0n2st",
    SOL: "7ykaKV7RtPnHpckJBH5p3rxmSdAP1Z2598BmbqeuHK7Y"
};

const NETWORK_LABELS = {
    ETH: "Ethereum mainnet",
    BTC: "Bitcoin mainnet",
    SOL: "Solana mainnet"
};

const PLAN_PRICES = {
    Lifetime: 15
};

const CHECKOUT_METHODS = Object.freeze({
    CRYPTO: "crypto",
    CARD: "card"
});

const AUTH_REDIRECT_LOOP_WINDOW_MS = 15000;
const AUTH_REDIRECT_LOOP_LIMIT = 2;

function normalizeCoin(value) {
    const normalized = String(value || "")
        .trim()
        .toUpperCase();
    return ["ETH", "BTC", "SOL"].includes(normalized) ? normalized : "";
}

function normalizeCheckoutMethod(value) {
    const normalized = String(value || "")
        .trim()
        .toLowerCase();
    return normalized === CHECKOUT_METHODS.CARD ? CHECKOUT_METHODS.CARD : CHECKOUT_METHODS.CRYPTO;
}

function qs(selector) {
    return document.querySelector(selector);
}

function qsa(selector) {
    return Array.from(document.querySelectorAll(selector));
}

function safeRead(key) {
    try {
        return localStorage.getItem(key);
    } catch (error) {
        return null;
    }
}

function safeWrite(key, value) {
    try {
        localStorage.setItem(key, value);
    } catch (error) {
        return;
    }
}

function safeRemove(key) {
    try {
        localStorage.removeItem(key);
    } catch (error) {
        return;
    }
}

function safeSessionRead(key) {
    try {
        return sessionStorage.getItem(key);
    } catch (error) {
        return null;
    }
}

function safeSessionWrite(key, value) {
    try {
        sessionStorage.setItem(key, value);
    } catch (error) {
        return;
    }
}

function safeSessionRemove(key) {
    try {
        sessionStorage.removeItem(key);
    } catch (error) {
        return;
    }
}

function normalizeRedirectTarget(rawTarget) {
    const value = String(rawTarget || "").trim();
    if (!value) return "";
    try {
        const parsed = new URL(value, window.location.origin);
        if (parsed.origin !== window.location.origin) return "";
        const pathname = parsed.pathname.replace(/^\//, "") || "index.html";
        return `${pathname}${parsed.search}`;
    } catch (error) {
        return "";
    }
}

function getAuthRedirectLoopState() {
    const target = String(safeSessionRead(STORAGE_KEYS.authRedirectLoopTarget) || "").trim();
    const count = Number(safeSessionRead(STORAGE_KEYS.authRedirectLoopCount) || 0);
    const lastAt = Number(safeSessionRead(STORAGE_KEYS.authRedirectLoopAt) || 0);
    const withinWindow = lastAt > 0 && Date.now() - lastAt <= AUTH_REDIRECT_LOOP_WINDOW_MS;

    if (!withinWindow) {
        return {
            target: "",
            count: 0,
            lastAt: 0
        };
    }

    return {
        target,
        count,
        lastAt
    };
}

function recordAuthRedirectLoopBounce(rawTarget) {
    const target = normalizeRedirectTarget(rawTarget);
    if (!target) return 0;

    const previous = getAuthRedirectLoopState();
    const isSameTarget = previous.target === target;
    const nextCount = isSameTarget ? previous.count + 1 : 1;

    safeSessionWrite(STORAGE_KEYS.authRedirectLoopTarget, target);
    safeSessionWrite(STORAGE_KEYS.authRedirectLoopCount, String(nextCount));
    safeSessionWrite(STORAGE_KEYS.authRedirectLoopAt, String(Date.now()));
    return nextCount;
}

function shouldBlockAuthRedirectLoop(rawTarget) {
    const target = normalizeRedirectTarget(rawTarget);
    if (!target) return false;
    const state = getAuthRedirectLoopState();
    return state.target === target && state.count >= AUTH_REDIRECT_LOOP_LIMIT;
}

function clearAuthRedirectLoopState() {
    safeSessionRemove(STORAGE_KEYS.authRedirectLoopTarget);
    safeSessionRemove(STORAGE_KEYS.authRedirectLoopCount);
    safeSessionRemove(STORAGE_KEYS.authRedirectLoopAt);
}

function getSelectedPlan() {
    const saved = safeRead(STORAGE_KEYS.plan) || "Lifetime";
    return Object.prototype.hasOwnProperty.call(PLAN_PRICES, saved) ? saved : "Lifetime";
}

function setSelectedPlan(plan) {
    if (!Object.prototype.hasOwnProperty.call(PLAN_PRICES, plan)) return;
    safeWrite(STORAGE_KEYS.plan, plan);
}

function initialsFromName(name) {
    const parts = String(name || "")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    if (!parts.length) return "R";
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

function renderAvatar(node, user, fallbackName = "User") {
    if (!(node instanceof HTMLElement)) return;

    const displayName = String(user?.name || fallbackName || "User").trim() || "User";
    const initials = initialsFromName(displayName);
    const avatarUrl = String(user?.avatarUrl || "").trim();

    node.replaceChildren();
    node.classList.remove("has-image");

    if (!avatarUrl) {
        node.textContent = initials;
        return;
    }

    const img = document.createElement("img");
    img.className = "avatar-image";
    img.src = avatarUrl;
    img.alt = `${displayName} avatar`;
    img.referrerPolicy = "no-referrer";
    img.loading = "lazy";
    img.decoding = "async";

    img.addEventListener("error", () => {
        node.replaceChildren();
        node.classList.remove("has-image");
        node.textContent = initials;
    });

    node.classList.add("has-image");
    node.appendChild(img);
}

function isUnauthorized(error) {
    return Boolean(error && typeof error === "object" && "status" in error && error.status === 401);
}

async function requestJson(url, options = {}) {
    const request = {
        method: options.method || "GET",
        headers: {
            Accept: "application/json",
            ...(options.headers || {})
        },
        credentials: "same-origin"
    };

    if (typeof url === "string" && url.startsWith("/api/")) {
        request.cache = "no-store";
        request.headers["Cache-Control"] = "no-store";
        request.headers.Pragma = "no-cache";
    }

    if (options.body !== undefined) {
        request.headers["Content-Type"] = "application/json";
        request.body = JSON.stringify(options.body);
    }

    let response;
    try {
        response = await fetch(url, request);
    } catch (networkError) {
        const error = new Error("Network request failed.");
        error.status = 0;
        throw error;
    }

    let payload = null;
    try {
        payload = await response.json();
    } catch (parseError) {
        payload = null;
    }

    if (!response.ok) {
        const error = new Error(payload?.error || "Request failed.");
        error.status = response.status;
        error.payload = payload;
        throw error;
    }

    return payload;
}

function formatNumber(value) {
    const safe = Number(value || 0);
    return new Intl.NumberFormat("en-US").format(safe);
}

function formatCurrency(value) {
    const safe = Number(value || 0);
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0
    }).format(safe);
}

function formatCurrencyPrecise(value) {
    const safe = Number(value || 0);
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(safe);
}

function formatPercent(value, digits = 2) {
    const safe = Number(value || 0);
    return `${safe.toFixed(digits)}%`;
}

function formatRelativeTime(isoDate) {
    if (!isoDate) return "--";
    const date = new Date(isoDate);
    const delta = Date.now() - date.getTime();
    const seconds = Math.max(0, Math.floor(delta / 1000));
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

function truncate(text, maxLength) {
    const value = String(text || "");
    if (value.length <= maxLength) return value;
    return `${value.slice(0, maxLength - 1)}...`;
}

function escapeHtml(value) {
    return String(value || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

function severityBadge(severity) {
    const normalized = String(severity || "").toLowerCase();
    if (["critical", "high"].includes(normalized)) return "sev-high";
    if (normalized === "medium") return "sev-medium";
    return "sev-low";
}

function walletUri(coin, wallet) {
    if (!wallet) return "";
    if (coin === "ETH") return `ethereum:${wallet}`;
    if (coin === "BTC") return `bitcoin:${wallet}`;
    if (coin === "SOL") return `solana:${wallet}`;
    return "";
}

function setElementText(selector, value) {
    const node = qs(selector);
    if (node) {
        node.textContent = value;
    }
}

function initMobileNav() {
    const toggle = qs(".mobile-toggle");
    const nav = qs(".nav-links");

    if (!toggle || !nav) return;

    const closeNav = () => {
        nav.classList.remove("active");
        toggle.setAttribute("aria-expanded", "false");
    };

    const openNav = () => {
        nav.classList.add("active");
        toggle.setAttribute("aria-expanded", "true");
    };

    toggle.addEventListener("click", () => {
        const isOpen = nav.classList.contains("active");
        if (isOpen) {
            closeNav();
        } else {
            openNav();
        }
    });

    qsa(".nav-links a").forEach((link) => {
        link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeNav();
        }
    });
}

function initFaq() {
    qsa(".faq-item").forEach((item) => {
        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        if (!question || !answer) return;

        question.addEventListener("click", () => {
            const isOpen = item.classList.contains("open");
            item.classList.toggle("open", !isOpen);
            question.setAttribute("aria-expanded", String(!isOpen));
            answer.style.maxHeight = isOpen ? "" : `${answer.scrollHeight}px`;
        });
    });
}

function initPlanSelection() {
    qsa(".choose-plan-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const plan = button.getAttribute("data-plan");
            if (!plan) return;
            setSelectedPlan(plan);
        });
    });
}

function initCheckoutModal() {
    const modal = qs("#checkout-modal");
    if (!(modal instanceof HTMLElement)) return;

    const proceedButton = qs("#checkout-proceed-btn");
    const status = qs("#checkout-modal-status");
    const openButtons = qsa("[data-open-checkout]");
    const closeButtons = qsa("[data-close-checkout-modal]");
    let lastFocusedElement = null;

    function setModalStatus(message, isError) {
        if (!status) return;
        status.textContent = message;
        status.style.color = isError ? "#ffb980" : "";
    }

    function getSelectedCheckoutOption() {
        const checked = qs('input[name="checkout-coin"]:checked');
        if (checked instanceof HTMLInputElement) {
            const raw = String(checked.value || "")
                .trim()
                .toUpperCase();
            if (raw === "CARD") {
                return "CARD";
            }
            return normalizeCoin(raw) || "ETH";
        }
        return "ETH";
    }

    function syncCoinSelectionState() {
        qsa(".checkout-coin-option").forEach((label) => {
            if (!(label instanceof HTMLElement)) return;
            const input = label.querySelector('input[name="checkout-coin"]');
            const active = input instanceof HTMLInputElement && input.checked;
            label.classList.toggle("is-selected", Boolean(active));
        });
    }

    function setSelectedCheckoutOption(value) {
        const raw = String(value || "")
            .trim()
            .toUpperCase();
        const normalized = raw === "CARD" ? "CARD" : normalizeCoin(raw) || "ETH";
        const option = qs(`input[name="checkout-coin"][value="${normalized}"]`);
        if (option instanceof HTMLInputElement) {
            option.checked = true;
        }
        syncCoinSelectionState();
    }

    function getStoredCheckoutOption() {
        const method = normalizeCheckoutMethod(safeRead(STORAGE_KEYS.selectedPaymentMethod));
        if (method === CHECKOUT_METHODS.CARD) {
            return "CARD";
        }
        return normalizeCoin(safeRead(STORAGE_KEYS.selectedCoin)) || "ETH";
    }

    function openModal() {
        lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        setSelectedCheckoutOption(getStoredCheckoutOption());
        setModalStatus("", false);
        modal.hidden = false;
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("checkout-modal-open");
        const firstOption = qs('input[name="checkout-coin"]:checked');
        if (firstOption instanceof HTMLInputElement) {
            firstOption.focus();
        }
    }

    function closeModal() {
        modal.hidden = true;
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("checkout-modal-open");
        setModalStatus("", false);
        if (lastFocusedElement instanceof HTMLElement) {
            lastFocusedElement.focus();
        }
    }

    openButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            if (!(button instanceof HTMLElement) || !button.hasAttribute("data-open-checkout")) return;
            event.preventDefault();
            setSelectedPlan("Lifetime");
            openModal();
        });
    });

    closeButtons.forEach((button) => {
        button.addEventListener("click", (event) => {
            event.preventDefault();
            closeModal();
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !modal.hidden) {
            closeModal();
        }
    });

    qsa('input[name="checkout-coin"]').forEach((input) => {
        input.addEventListener("change", () => {
            syncCoinSelectionState();
        });
    });

    if (proceedButton) {
        proceedButton.addEventListener("click", () => {
            const selected = getSelectedCheckoutOption();
            setModalStatus("Opening checkout...", false);
            if (selected === "CARD") {
                safeWrite(STORAGE_KEYS.selectedPaymentMethod, CHECKOUT_METHODS.CARD);
                window.location.href = "checkout.html?method=card";
                return;
            }

            safeWrite(STORAGE_KEYS.selectedCoin, selected);
            safeWrite(STORAGE_KEYS.selectedPaymentMethod, CHECKOUT_METHODS.CRYPTO);
            window.location.href = `checkout.html?coin=${encodeURIComponent(selected)}`;
        });
    }
}

async function initHomeAuthNav() {
    const authLink = qs("#nav-auth-link");
    if (!(authLink instanceof HTMLAnchorElement)) return;
    const primaryCta = qs("#hero-primary-cta");
    const dashboardCta = qs("#hero-dashboard-cta");
    const stickyCta = qs("#sticky-cta");

    function setCheckoutTrigger(node, enabled) {
        if (!(node instanceof HTMLAnchorElement)) return;
        if (enabled) {
            node.setAttribute("data-open-checkout", "true");
        } else {
            node.removeAttribute("data-open-checkout");
        }
    }

    function setHomeCtas({
        primaryHref,
        primaryText,
        stickyHref,
        stickyText,
        dashboardHref,
        dashboardText,
        showDashboard,
        openCheckout
    }) {
        if (primaryCta instanceof HTMLAnchorElement) {
            primaryCta.href = primaryHref;
            primaryCta.textContent = primaryText;
            setCheckoutTrigger(primaryCta, Boolean(openCheckout));
        }
        if (stickyCta instanceof HTMLAnchorElement) {
            stickyCta.href = stickyHref;
            stickyCta.textContent = stickyText;
            setCheckoutTrigger(stickyCta, Boolean(openCheckout));
        }
        if (dashboardCta instanceof HTMLAnchorElement) {
            dashboardCta.hidden = !showDashboard;
            dashboardCta.href = dashboardHref;
            dashboardCta.textContent = dashboardText;
        }
    }

    function setLoggedOutState() {
        authLink.href = "login.html";
        authLink.classList.remove("profile-nav-link");
        authLink.classList.add("btn", "btn-ghost");
        authLink.replaceChildren(document.createTextNode("Login"));
        setHomeCtas({
            primaryHref: "checkout.html",
            primaryText: "Get Lifetime Access",
            stickyHref: "checkout.html",
            stickyText: "Get Lifetime Access",
            dashboardHref: "dashboard.html",
            dashboardText: "View Dashboard",
            showDashboard: false,
            openCheckout: true
        });
    }

    try {
        const me = await requestJson("/api/auth/me");
        const user = me?.user || null;
        if (!user) {
            setLoggedOutState();
            return;
        }

        const avatar = document.createElement("span");
        avatar.className = "profile-nav-avatar";

        const name = document.createElement("span");
        name.className = "profile-nav-name";
        name.textContent = user.name || "User";

        const hasPaidAccess = Boolean(user.hasPaidAccess);

        authLink.href = hasPaidAccess ? "dashboard.html" : resolveAuthRedirectTarget(user);
        authLink.classList.remove("btn", "btn-ghost");
        authLink.classList.add("profile-nav-link");
        authLink.replaceChildren(avatar, name);
        renderAvatar(avatar, user, user.name || "User");

        if (hasPaidAccess) {
            setHomeCtas({
                primaryHref: "dashboard.html#settings",
                primaryText: "Manage Account",
                stickyHref: "dashboard.html",
                stickyText: "Open Dashboard",
                dashboardHref: "dashboard.html",
                dashboardText: "View Dashboard",
                showDashboard: true,
                openCheckout: false
            });
        } else {
            setHomeCtas({
                primaryHref: "checkout.html",
                primaryText: "Complete Checkout",
                stickyHref: "checkout.html",
                stickyText: "Complete Checkout",
                dashboardHref: "dashboard.html",
                dashboardText: "View Dashboard",
                showDashboard: false,
                openCheckout: true
            });
        }
    } catch (error) {
        setLoggedOutState();
    }
}

function initHomeIconIntro() {
    const body = document.body;
    if (!body || !body.classList.contains("home-page")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    body.classList.remove("icon-intro");
    window.requestAnimationFrame(() => {
        body.classList.add("icon-intro");
    });

    window.setTimeout(() => {
        body.classList.remove("icon-intro");
    }, 2600);
}

function initHomeScrollReveal() {
    const body = document.body;
    if (!body || !body.classList.contains("home-page")) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = qsa(
        ".home-page .section, .home-page .hero-panel, .home-page .clean-feature, .home-page .pricing-card, .home-page .testimonial-card"
    );
    if (!targets.length) return;

    if (!("IntersectionObserver" in window)) {
        targets.forEach((node) => node.classList.add("is-visible"));
        return;
    }

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.16,
            rootMargin: "0px 0px -8% 0px"
        }
    );

    targets.forEach((node, index) => {
        node.style.setProperty("--reveal-delay", `${Math.min(index * 45, 280)}ms`);
        observer.observe(node);
    });
}

function resolveAuthRedirectTarget(user) {
    const params = new URLSearchParams(window.location.search);
    const raw = String(params.get("redirect") || "").trim();
    if (raw) {
        try {
            const parsed = new URL(raw, window.location.origin);
            const pathname = parsed.pathname.replace(/^\//, "");
            const extensionlessPages = ["index", "login", "checkout", "dashboard"];
            const isAllowedPath =
                pathname === "" || pathname.endsWith(".html") || extensionlessPages.includes(pathname);
            if (parsed.origin === window.location.origin && isAllowedPath) {
                const normalizedPath = pathname || "index.html";
                return `${normalizedPath}${parsed.search}${parsed.hash}`;
            }
        } catch (error) {
            /* ignore invalid redirect and use defaults */
        }
    }

    if (user?.hasPaidAccess) {
        return "dashboard.html";
    }

    const preferredMethod = normalizeCheckoutMethod(safeRead(STORAGE_KEYS.selectedPaymentMethod));
    if (preferredMethod === CHECKOUT_METHODS.CARD) {
        return "checkout.html?method=card";
    }
    const preferredCoin = normalizeCoin(safeRead(STORAGE_KEYS.selectedCoin)) || "ETH";
    return `checkout.html?coin=${encodeURIComponent(preferredCoin)}`;
}

async function initLoginPage() {
    const form = qs("#auth-form");
    if (!form) return;

    const modeButtons = qsa(".auth-mode-btn");
    const title = qs("#auth-title");
    const subtitle = qs("#auth-subtitle");
    const submitBtn = qs("#auth-submit");
    const status = qs("#auth-status");
    const selectedPlanEl = qs("#selected-plan");

    const nameRow = qs("#name-row");
    const confirmRow = qs("#confirm-row");
    const nameInput = qs("#name");
    const emailInput = qs("#email");
    const passwordInput = qs("#password");
    const confirmInput = qs("#confirm-password");
    const rememberInput = qs("#remember-me");
    const params = new URLSearchParams(window.location.search);

    let mode = "create";

    function setStatus(message, isError) {
        if (!status) return;
        status.textContent = message;
        status.style.color = isError ? "#ffb980" : "";
    }

    function setMode(nextMode) {
        mode = nextMode === "signin" ? "signin" : "create";

        modeButtons.forEach((button) => {
            const active = button.getAttribute("data-auth-mode") === mode;
            button.classList.toggle("active", active);
            button.setAttribute("aria-selected", String(active));
        });

        if (title) {
            title.textContent = mode === "create" ? "Create account" : "Sign in";
        }
        if (subtitle) {
            subtitle.textContent =
                mode === "create"
                    ? "Set up your Radon dashboard access."
                    : "Continue to your Radon dashboard.";
        }
        if (submitBtn) {
            submitBtn.textContent = mode === "create" ? "Create account" : "Sign in";
        }

        if (nameRow) nameRow.hidden = mode !== "create";
        if (confirmRow) confirmRow.hidden = mode !== "create";

        if (nameInput instanceof HTMLInputElement) {
            nameInput.required = mode === "create";
        }
        if (confirmInput instanceof HTMLInputElement) {
            confirmInput.required = mode === "create";
        }
        setStatus("", false);
    }

    const queryMode = params.get("mode");
    setMode(queryMode === "signin" ? "signin" : "create");

    modeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            setMode(button.getAttribute("data-auth-mode"));
        });
    });

    if (selectedPlanEl) {
        selectedPlanEl.textContent = `Selected plan: ${getSelectedPlan()}`;
    }

    const rememberedEmail = safeRead(STORAGE_KEYS.rememberedEmail);
    if (rememberedEmail && emailInput instanceof HTMLInputElement) {
        emailInput.value = rememberedEmail;
        if (rememberInput instanceof HTMLInputElement) {
            rememberInput.checked = true;
        }
    }

    try {
        const me = await requestJson("/api/auth/me");
        const hasRedirect = Boolean(String(params.get("redirect") || "").trim());
        const redirectTarget = String(params.get("redirect") || "").trim();
        if (hasRedirect && shouldBlockAuthRedirectLoop(redirectTarget)) {
            clearAuthRedirectLoopState();
            setStatus("Session keeps bouncing. Sign in again to continue.", true);
            return;
        }
        clearAuthRedirectLoopState();
        window.location.href = resolveAuthRedirectTarget(me?.user || null);
        return;
    } catch (error) {
        if (!isUnauthorized(error)) {
            setStatus("Could not reach the auth service. Try again.", true);
        }
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = nameInput instanceof HTMLInputElement ? nameInput.value.trim() : "";
        const email = emailInput instanceof HTMLInputElement ? emailInput.value.trim() : "";
        const password = passwordInput instanceof HTMLInputElement ? passwordInput.value : "";
        const confirmPassword = confirmInput instanceof HTMLInputElement ? confirmInput.value : "";

        if (!email || !password) {
            setStatus("Email and password are required.", true);
            return;
        }

        if (rememberInput instanceof HTMLInputElement && rememberInput.checked) {
            safeWrite(STORAGE_KEYS.rememberedEmail, email);
        } else {
            safeRemove(STORAGE_KEYS.rememberedEmail);
        }

        if (mode === "create") {
            if (name.length < 2) {
                setStatus("Display name must be at least 2 characters.", true);
                return;
            }
            if (password.length < 8) {
                setStatus("Password must be at least 8 characters.", true);
                return;
            }
            if (password !== confirmPassword) {
                setStatus("Passwords do not match.", true);
                return;
            }
        }

        submitBtn?.setAttribute("disabled", "true");
        setStatus(mode === "create" ? "Creating account..." : "Signing in...", false);

        try {
            let authResult = null;
            if (mode === "create") {
                const selectedPlan = getSelectedPlan();
                authResult = await requestJson("/api/auth/register", {
                    method: "POST",
                    body: { name, email, password, plan: selectedPlan }
                });
            } else {
                authResult = await requestJson("/api/auth/login", {
                    method: "POST",
                    body: { email, password }
                });
            }

            setStatus("Success. Redirecting...", false);
            clearAuthRedirectLoopState();
            window.location.href = resolveAuthRedirectTarget(authResult?.user || null);
        } catch (error) {
            setStatus(error.message || "Authentication failed.", true);
        } finally {
            submitBtn?.removeAttribute("disabled");
        }
    });
}

function initDashboardSidebar() {
    const toggle = qs(".menu-toggle");
    const sidebar = qs(".sidebar");
    if (!toggle || !sidebar) return;

    toggle.addEventListener("click", () => {
        const willOpen = !sidebar.classList.contains("open");
        sidebar.classList.toggle("open", willOpen);
        toggle.setAttribute("aria-expanded", String(willOpen));
    });

    qsa(".sidebar-nav .nav-item").forEach((item) => {
        item.addEventListener("click", () => {
            if (window.innerWidth <= 960) {
                sidebar.classList.remove("open");
                toggle.setAttribute("aria-expanded", "false");
            }
        });
    });

    document.addEventListener("click", (event) => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (
            window.innerWidth <= 960 &&
            sidebar.classList.contains("open") &&
            !sidebar.contains(target) &&
            !toggle.contains(target)
        ) {
            sidebar.classList.remove("open");
            toggle.setAttribute("aria-expanded", "false");
        }
    });
}

function initDashboardTabs() {
    const navItems = qsa(".sidebar-nav [data-tab-target]").filter((item) => !item.hidden);
    const panels = qsa(".dash-panel[data-tab-panel]");
    if (!navItems.length || !panels.length) return;

    const validTargets = new Set(
        navItems
            .map((item) => item.getAttribute("data-tab-target"))
            .filter((value) => typeof value === "string" && value.length > 0)
    );

    function setActiveTab(tabName, updateHash) {
        if (!validTargets.has(tabName)) return;

        navItems.forEach((item) => {
            const active = item.getAttribute("data-tab-target") === tabName;
            item.classList.toggle("active", active);
            item.setAttribute("aria-current", active ? "page" : "false");
        });

        panels.forEach((panel) => {
            const active = panel.getAttribute("data-tab-panel") === tabName;
            panel.hidden = !active;
            panel.classList.toggle("is-active", active);
        });

        if (updateHash) {
            if (history.replaceState) {
                history.replaceState(null, "", `#${tabName}`);
            } else {
                window.location.hash = tabName;
            }
        }
    }

    navItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            const target = item.getAttribute("data-tab-target");
            if (!target) return;
            setActiveTab(target, true);
        });
    });

    const initialHash = window.location.hash.replace("#", "");
    const fallback = navItems[0].getAttribute("data-tab-target") || "overview";
    setActiveTab(validTargets.has(initialHash) ? initialHash : fallback, false);
}

function drawLineChart(canvas, labels, values) {
    if (!(canvas instanceof HTMLCanvasElement)) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const padding = 28;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const maxValue = Math.max(1, ...values);
    const step = values.length > 1 ? chartWidth / (values.length - 1) : chartWidth;

    ctx.strokeStyle = "rgba(122, 142, 255, 0.22)";
    ctx.lineWidth = 1;
    for (let tick = 0; tick <= 4; tick += 1) {
        const y = padding + (chartHeight / 4) * tick;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
    }

    ctx.beginPath();
    values.forEach((value, index) => {
        const x = padding + step * index;
        const y = padding + chartHeight - (value / maxValue) * chartHeight;
        if (index === 0) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
        }
    });
    ctx.strokeStyle = "#7c8fff";
    ctx.lineWidth = 2.5;
    ctx.stroke();

    values.forEach((value, index) => {
        const x = padding + step * index;
        const y = padding + chartHeight - (value / maxValue) * chartHeight;
        ctx.beginPath();
        ctx.arc(x, y, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "#b8c2ff";
        ctx.fill();

        ctx.fillStyle = "rgba(210, 219, 255, 0.88)";
        ctx.font = "12px Manrope, sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(String(labels[index] || ""), x, height - 8);
    });
}

function drawBarChart(canvas, values) {
    if (!(canvas instanceof HTMLCanvasElement)) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const padding = 20;
    const maxValue = Math.max(1, ...values);
    const gap = 10;
    const barWidth = (width - padding * 2 - gap * (values.length - 1)) / Math.max(1, values.length);

    values.forEach((value, index) => {
        const ratio = value / maxValue;
        const barHeight = Math.max(4, ratio * (height - padding * 2));
        const x = padding + index * (barWidth + gap);
        const y = height - padding - barHeight;

        ctx.fillStyle = "rgba(104, 224, 176, 0.86)";
        ctx.fillRect(x, y, barWidth, barHeight);
    });
}

function renderEventsTable(events, selector) {
    const body = qs(selector);
    if (!body) return;

    if (!Array.isArray(events) || !events.length) {
        body.innerHTML = '<tr><td colspan="4" class="table-empty">No events yet.</td></tr>';
        return;
    }

    body.innerHTML = events
        .map((event) => {
            const badge = severityBadge(event.severity);
            const actor = event.actor || "system";
            const title = escapeHtml(truncate(event.title, 56));
            const severityText = escapeHtml(String(event.severity || "low").toUpperCase());
            const actorText = escapeHtml(truncate(actor, 22));
            const whenText = escapeHtml(formatRelativeTime(event.created_at));
            return `
                <tr>
                    <td>${title}</td>
                    <td><span class="sev-pill ${badge}">${severityText}</span></td>
                    <td>${actorText}</td>
                    <td>${whenText}</td>
                </tr>
            `;
        })
        .join("");
}

function renderPaymentsTable(payments, selector) {
    const body = qs(selector);
    if (!body) return;

    if (!Array.isArray(payments) || !payments.length) {
        body.innerHTML = '<tr><td colspan="4" class="table-empty">No payments yet.</td></tr>';
        return;
    }

    body.innerHTML = payments
        .map((payment) => {
            const statusClass =
                payment.status === "verified"
                    ? "pay-verified"
                    : payment.status === "rejected"
                      ? "pay-rejected"
                      : "pay-pending";
            const reference = escapeHtml(payment.reference);
            const coin = escapeHtml(payment.coin);
            const amount = escapeHtml(formatCurrency(payment.amount_usd));
            const status = escapeHtml(payment.status.replace(/_/g, " "));
            return `
                <tr>
                    <td>${reference}</td>
                    <td>${coin}</td>
                    <td>${amount}</td>
                    <td><span class="pay-pill ${statusClass}">${status}</span></td>
                </tr>
            `;
        })
        .join("");
}

function renderPlayersTable(players) {
    const body = qs("#players-table-body");
    if (!body) return;

    if (!Array.isArray(players) || !players.length) {
        body.innerHTML = '<tr><td colspan="4" class="table-empty">No players available.</td></tr>';
        return;
    }

    body.innerHTML = players
        .map((player) => {
            const statusClass = player.status === "watch" ? "status-watch" : "status-active";
            const username = escapeHtml(player.username);
            const status = escapeHtml(player.status);
            const riskScore = escapeHtml(player.risk_score);
            const lastSeen = escapeHtml(formatRelativeTime(player.last_seen_at));
            return `
                <tr>
                    <td>${username}</td>
                    <td><span class="status-pill ${statusClass}">${status}</span></td>
                    <td>${riskScore}</td>
                    <td>${lastSeen}</td>
                </tr>
            `;
        })
        .join("");
}

function renderRulesetsTable(rulesets) {
    const body = qs("#rulesets-table-body");
    if (!body) return;

    if (!Array.isArray(rulesets) || !rulesets.length) {
        body.innerHTML = '<tr><td colspan="4" class="table-empty">No rulesets configured.</td></tr>';
        return;
    }

    body.innerHTML = rulesets
        .map((rule) => {
            const statusClass = rule.status === "enforced" ? "status-enforced" : "status-monitor";
            const name = escapeHtml(rule.name);
            const status = escapeHtml(rule.status);
            const coverage = escapeHtml(`${rule.coverage_pct}%`);
            const lastTriggered = escapeHtml(formatRelativeTime(rule.last_triggered_at || rule.updated_at));
            return `
                <tr>
                    <td>${name}</td>
                    <td><span class="status-pill ${statusClass}">${status}</span></td>
                    <td>${coverage}</td>
                    <td>${lastTriggered}</td>
                </tr>
            `;
        })
        .join("");
}

async function loadDashboardData() {
    const data = await requestJson("/api/dashboard/overview");
    let detectionEvents = Array.isArray(data.events) ? data.events : [];

    try {
        const detections = await requestJson("/api/dashboard/detections?limit=80");
        if (Array.isArray(detections.events)) {
            detectionEvents = detections.events;
        }
    } catch (error) {
        detectionEvents = Array.isArray(data.events) ? data.events : [];
    }

    const summary = data.summary || {};
    const trends = data.trends || {};
    const events = Array.isArray(data.events) ? data.events : [];
    const payments = Array.isArray(data.payments) ? data.payments : [];
    const players = Array.isArray(data.players) ? data.players : [];
    const rulesets = Array.isArray(data.rulesets) ? data.rulesets : [];
    const hasLiveData =
        events.length > 0 ||
        detectionEvents.length > 0 ||
        payments.length > 0 ||
        players.length > 0 ||
        rulesets.length > 0;

    const sessions = Number(summary.sessionsScanned || 0);
    const blocked = Number(summary.blockedThreats || 0);
    const activePlayers = Number(summary.activePlayers || 0);
    const activeRulesets = Number(summary.activeRulesets || 0);
    const verifiedRevenue = Number(summary.verifiedRevenueUsd || 0);
    const latency = Number(summary.latencyOverheadPct);
    const confidence = Number(summary.threatConfidencePct);

    setElementText("#metric-sessions", hasLiveData ? formatNumber(sessions) : "--");
    setElementText("#metric-blocked", hasLiveData ? formatNumber(blocked) : "--");
    setElementText("#metric-latency", hasLiveData && Number.isFinite(latency) ? formatPercent(latency, 2) : "--");
    setElementText(
        "#metric-confidence",
        hasLiveData && Number.isFinite(confidence) ? formatPercent(confidence, 2) : "--"
    );
    setElementText("#metric-players", hasLiveData ? formatNumber(activePlayers) : "--");
    setElementText("#metric-rulesets", hasLiveData ? formatNumber(activeRulesets) : "--");
    setElementText("#metric-revenue", hasLiveData ? formatCurrency(verifiedRevenue) : "--");
    setElementText("#last-refresh", hasLiveData ? `Updated ${formatRelativeTime(data.generatedAt)}` : "Waiting for live data");

    drawLineChart(qs("#threat-trend-chart"), trends.labels || [], trends.detections || []);
    drawBarChart(qs("#payments-trend-chart"), trends.verifiedPayments || []);

    renderEventsTable(events, "#overview-events-body");
    renderEventsTable(detectionEvents, "#detections-table-body");
    renderPaymentsTable(payments, "#overview-payments-body");
    renderPlayersTable(players);
    renderRulesetsTable(rulesets);
}

async function copyToClipboard(text) {
    if (!text) return false;
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch (error) {
        /* fallback below */
    }

    try {
        const temp = document.createElement("textarea");
        temp.value = text;
        temp.setAttribute("readonly", "");
        temp.style.position = "absolute";
        temp.style.left = "-9999px";
        document.body.appendChild(temp);
        temp.select();
        const copied = document.execCommand("copy");
        document.body.removeChild(temp);
        return copied;
    } catch (error) {
        return false;
    }
}

function applyDashboardUser(auth) {
    const user = auth || {};
    const name = user.name || "User";
    const email = user.email || "--";
    const hasPaidAccess = Boolean(user.hasPaidAccess);
    const plan = hasPaidAccess ? user.plan || "Lifetime" : "Not Activated";

    setSelectedPlan(user.plan || "Lifetime");
    setElementText("#dashboard-user-name", name);
    setElementText("#dashboard-user-email", email);
    setElementText("#dashboard-plan-name", plan);
    setElementText("#settings-current-name", name);
    setElementText("#settings-current-email", email);

    const nameInput = qs("#settings-display-name");
    if (nameInput instanceof HTMLInputElement && document.activeElement !== nameInput) {
        nameInput.value = name;
    }

    const avatarInput = qs("#settings-avatar-url");
    if (avatarInput instanceof HTMLInputElement && document.activeElement !== avatarInput) {
        avatarInput.value = user.avatarUrl || "";
    }

    renderAvatar(qs("#dashboard-user-avatar"), user, name);
    renderAvatar(qs("#settings-avatar-preview"), user, name);
}

function initProfileSettings(auth, onUserUpdated) {
    const form = qs("#profile-settings-form");
    if (!(form instanceof HTMLFormElement)) return;
    let currentAuth = auth || {};

    const nameInput = qs("#settings-display-name");
    const avatarInput = qs("#settings-avatar-url");
    const status = qs("#profile-settings-status");

    if (nameInput instanceof HTMLInputElement) {
        nameInput.value = currentAuth.name || "";
    }
    if (avatarInput instanceof HTMLInputElement) {
        avatarInput.value = currentAuth.avatarUrl || "";
    }

    function setProfileStatus(message, isError) {
        if (!status) return;
        status.textContent = message;
        status.style.color = isError ? "#ffb980" : "";
    }

    const preview = () => {
        const draftName =
            nameInput instanceof HTMLInputElement && nameInput.value.trim()
                ? nameInput.value.trim()
                : currentAuth.name || "User";
        const draftAvatar = avatarInput instanceof HTMLInputElement ? avatarInput.value.trim() : "";
        renderAvatar(qs("#settings-avatar-preview"), { name: draftName, avatarUrl: draftAvatar }, draftName);
    };

    if (nameInput instanceof HTMLInputElement) {
        nameInput.addEventListener("input", preview);
    }
    if (avatarInput instanceof HTMLInputElement) {
        avatarInput.addEventListener("input", preview);
    }

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const name = nameInput instanceof HTMLInputElement ? nameInput.value.trim() : "";
        const avatarUrl = avatarInput instanceof HTMLInputElement ? avatarInput.value.trim() : "";

        if (name.length < 2) {
            setProfileStatus("Display name must be at least 2 characters.", true);
            return;
        }

        setProfileStatus("Saving profile...", false);
        try {
            const result = await requestJson("/api/auth/profile", {
                method: "PATCH",
                body: {
                    name,
                    avatarUrl
                }
            });
            if (result?.user) {
                currentAuth = result.user;
            }
            if (typeof onUserUpdated === "function" && result?.user) {
                onUserUpdated(result.user);
            }
            setProfileStatus("Profile saved.", false);
        } catch (error) {
            setProfileStatus(error.message || "Could not update profile.", true);
        }
    });
}

async function initCryptoPayments(auth, options = {}) {
    const createForm = qs("#invoice-create-form");
    if (!(createForm instanceof HTMLFormElement)) return;
    const hasPaidAccess = Boolean(auth?.hasPaidAccess);
    const invoiceOnlyMode = Boolean(options?.invoiceOnlyMode);
    const lockedCoin = normalizeCoin(options?.lockedCoin);
    const fixedProductId = String(options?.fixedProductId || "").trim();

    const productInput = qs("#invoice-product");
    const coinInput = qs("#invoice-coin");
    const createStatus = qs("#invoice-create-status");
    const submitStatus = qs("#invoice-submit-status");
    const txHashInput = qs("#invoice-txhash");
    const submitButton = qs("#invoice-submit-btn");
    const copyWalletButton = qs("#invoice-copy-wallet-btn");
    const walletInput = qs("#invoice-wallet");
    const walletLink = qs("#invoice-wallet-link");
    const networkNote = qs("#invoice-network-note");
    const walletCopyStatus = qs("#wallet-copy-status");
    const viewOrdersButton = qs("#invoice-view-orders-btn");

    const invoiceIdEl = qs("#invoice-id");
    const invoiceStatusEl = qs("#invoice-status");
    const invoiceCountdownEl = qs("#invoice-countdown");
    const productNameEl = qs("#invoice-product-name");
    const productTermEl = qs("#invoice-product-term");
    const productAmountEl = qs("#invoice-product-amount");
    const dateEl = qs("#invoice-date");
    const paymentCoinEl = qs("#invoice-payment-coin");
    const totalEl = qs("#invoice-total");
    const accountNameEl = qs("#invoice-account-name");
    const accountEmailEl = qs("#invoice-account-email");
    const sendAmountEl = qs("#invoice-send-amount");
    const sendCoinEl = qs("#invoice-send-coin");
    const requiredAmountEl = qs("#invoice-required-amount");

    const fallbackProducts = [
        {
            id: "radon_anti_cheat_lifetime",
            name: "Radon Anti Cheat",
            termLabel: "Lifetime Access",
            priceUsd: 15,
            defaultCoin: "ETH"
        }
    ];

    let walletMap = { ...DEFAULT_WALLETS };
    let products = [...fallbackProducts];
    let currentInvoice = null;
    let countdownTimer = null;

    function setStatus(node, message, isError) {
        if (!node) return;
        node.textContent = message;
        node.style.color = isError ? "#ffb980" : "";
    }

    function coinLabel(coin) {
        if (coin === "ETH") return "Ethereum";
        if (coin === "BTC") return "Bitcoin";
        if (coin === "SOL") return "Solana";
        return coin || "--";
    }

    function invoiceStatusLabel(status) {
        if (status === "awaiting_payment") return "Awaiting Payment";
        if (status === "pending_verification") return "Pending Verification";
        if (status === "verified") return "Paid";
        if (status === "rejected") return "Rejected";
        if (status === "expired") return "Expired";
        return String(status || "Awaiting Payment");
    }

    function setInvoiceStatus(status) {
        if (!invoiceStatusEl) return;
        invoiceStatusEl.textContent = invoiceStatusLabel(status);
        invoiceStatusEl.classList.remove("status-verified", "status-rejected", "status-expired");
        if (status === "verified") {
            invoiceStatusEl.classList.add("status-verified");
        } else if (status === "rejected") {
            invoiceStatusEl.classList.add("status-rejected");
        } else if (status === "expired") {
            invoiceStatusEl.classList.add("status-expired");
        }
    }

    function stopCountdown() {
        if (countdownTimer) {
            window.clearInterval(countdownTimer);
            countdownTimer = null;
        }
    }

    function startCountdown(expiresAt) {
        stopCountdown();
        if (!invoiceCountdownEl || !expiresAt) {
            if (invoiceCountdownEl) invoiceCountdownEl.textContent = "--:--";
            return;
        }

        const update = () => {
            const end = new Date(expiresAt).getTime();
            const remaining = Math.max(0, end - Date.now());
            const minutes = Math.floor(remaining / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            invoiceCountdownEl.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
            if (remaining <= 0) {
                stopCountdown();
                if (currentInvoice && currentInvoice.status === "awaiting_payment") {
                    currentInvoice.status = "expired";
                    setInvoiceStatus("expired");
                }
            }
        };

        update();
        countdownTimer = window.setInterval(update, 1000);
    }

    function syncWalletCodes() {
        setElementText("#wallet-eth", walletMap.ETH || "");
        setElementText("#wallet-btc", walletMap.BTC || "");
        setElementText("#wallet-sol", walletMap.SOL || "");
    }

    function renderInvoice(invoice) {
        currentInvoice = invoice || null;
        const activeProduct = products.find((product) => product.id === invoice?.productId) || products[0] || null;
        const amount = Number(invoice?.amountUsd || activeProduct?.priceUsd || 0);
        const coin = normalizeCoin(invoice?.coin || (coinInput instanceof HTMLSelectElement ? coinInput.value : "ETH")) || "ETH";
        const wallet = String(invoice?.wallet || walletMap[coin] || "");

        if (invoiceIdEl) invoiceIdEl.textContent = invoice?.id || "--";
        if (productNameEl) productNameEl.textContent = invoice?.productName || activeProduct?.name || "--";
        if (productTermEl) productTermEl.textContent = invoice?.termLabel || activeProduct?.termLabel || "--";
        if (productAmountEl) productAmountEl.textContent = formatCurrencyPrecise(amount);
        if (dateEl) {
            const sourceDate = invoice?.createdAt || new Date().toISOString();
            dateEl.textContent = new Date(sourceDate).toLocaleDateString("en-US");
        }
        if (paymentCoinEl) paymentCoinEl.textContent = coinLabel(coin);
        if (totalEl) totalEl.textContent = `${formatCurrencyPrecise(amount)} USD`;
        if (sendAmountEl) sendAmountEl.textContent = `${formatCurrencyPrecise(amount)} USD`;
        if (sendCoinEl) sendCoinEl.textContent = coinLabel(coin);
        setElementText("#checkout-selected-coin", coinLabel(coin));
        if (requiredAmountEl) {
            if (invoice?.requiredAmount) {
                requiredAmountEl.textContent = `Minimum accepted: ${invoice.requiredAmount} ${coin}`;
            } else {
                requiredAmountEl.textContent = "Minimum accepted: --";
            }
        }
        if (walletInput instanceof HTMLInputElement) walletInput.value = wallet;

        if (networkNote) {
            networkNote.textContent = wallet
                ? `Send ${coinLabel(coin)} on ${NETWORK_LABELS[coin] || "the correct network"}.`
                : "No wallet configured for this coin.";
        }
        if (walletLink instanceof HTMLAnchorElement) {
            const uri = walletUri(coin, wallet);
            walletLink.href = uri || "#";
            walletLink.classList.toggle("disabled-link", !uri);
        }

        setInvoiceStatus(invoice?.status || "awaiting_payment");
        if (invoice?.status === "awaiting_payment" || invoice?.status === "pending_verification") {
            startCountdown(invoice?.expiresAt || null);
        } else {
            stopCountdown();
            if (invoiceCountdownEl) {
                invoiceCountdownEl.textContent = "--:--";
            }
        }
    }

    function getPreferredProductId() {
        if (fixedProductId && products.some((product) => product.id === fixedProductId)) {
            return fixedProductId;
        }
        if (productInput instanceof HTMLSelectElement && productInput.value) {
            return productInput.value;
        }
        return products[0]?.id || "";
    }

    function getPreferredCoin() {
        if (lockedCoin) return lockedCoin;
        if (coinInput instanceof HTMLSelectElement) {
            return normalizeCoin(coinInput.value) || "ETH";
        }
        return "ETH";
    }

    function populateProducts() {
        if (!(productInput instanceof HTMLSelectElement)) return;
        productInput.innerHTML = products
            .map((product) => {
                const label = `${product.name} - ${product.termLabel} - ${formatCurrencyPrecise(product.priceUsd)}`;
                return `<option value="${escapeHtml(product.id)}">${escapeHtml(label)}</option>`;
            })
            .join("");

        const savedProduct = safeRead(STORAGE_KEYS.selectedProduct);
        const hasSaved = products.some((product) => product.id === savedProduct);
        productInput.value = hasSaved ? savedProduct : products[0]?.id || "";

        if (fixedProductId && products.some((product) => product.id === fixedProductId)) {
            productInput.value = fixedProductId;
        }
    }

    async function createInvoice(productId, coin, silent) {
        const response = await requestJson("/api/billing/invoices", {
            method: "POST",
            body: { productId, coin }
        });

        if (!response?.invoice) {
            throw new Error("Invoice could not be created.");
        }

        renderInvoice(response.invoice);
        setStatus(
            createStatus,
            response.reused ? "Existing pending invoice loaded." : "Invoice created. Complete payment and submit tx hash.",
            false
        );
        if (!silent && txHashInput instanceof HTMLInputElement) {
            txHashInput.focus();
        }
        return response.invoice;
    }

    async function refreshInvoices() {
        try {
            const payload = await requestJson("/api/billing/invoices?limit=10");
            const invoices = Array.isArray(payload?.invoices) ? payload.invoices : [];
            const preferredProductId = getPreferredProductId();
            const preferredCoin = getPreferredCoin();
            const active =
                invoices.find(
                    (invoice) =>
                        ["awaiting_payment", "pending_verification"].includes(invoice.status) &&
                        (!preferredProductId || invoice.productId === preferredProductId) &&
                        (!preferredCoin || normalizeCoin(invoice.coin) === preferredCoin)
                ) ||
                invoices.find(
                    (invoice) =>
                        (!preferredProductId || invoice.productId === preferredProductId) &&
                        (!preferredCoin || normalizeCoin(invoice.coin) === preferredCoin)
                ) ||
                invoices.find((invoice) => ["awaiting_payment", "pending_verification"].includes(invoice.status)) ||
                invoices[0] ||
                null;
            if (active) {
                renderInvoice(active);
            }
        } catch (error) {
            /* no-op */
        }
    }

    accountNameEl && (accountNameEl.textContent = auth?.name || "--");
    accountEmailEl && (accountEmailEl.textContent = auth?.email || "--");

    try {
        const catalog = await requestJson("/api/billing/catalog");
        walletMap = { ...walletMap, ...(catalog.wallets || {}) };
        if (Array.isArray(catalog.products) && catalog.products.length) {
            products = catalog.products;
        }

        if (coinInput instanceof HTMLSelectElement && Array.isArray(catalog.supportedCoins)) {
            const options = catalog.supportedCoins
                .filter((coin) => ["ETH", "BTC", "SOL"].includes(coin))
                .map((coin) => `<option value="${coin}">${escapeHtml(coinLabel(coin))}</option>`)
                .join("");
            if (options) {
                coinInput.innerHTML = options;
            }
        }
    } catch (error) {
        setStatus(createStatus, "Could not refresh billing catalog. Using local defaults.", true);
    }

    syncWalletCodes();
    populateProducts();

    if (coinInput instanceof HTMLSelectElement) {
        const preferredCoin = lockedCoin || normalizeCoin(safeRead(STORAGE_KEYS.selectedCoin)) || "ETH";
        coinInput.value = preferredCoin;
        safeWrite(STORAGE_KEYS.selectedCoin, preferredCoin);
    }

    if (invoiceOnlyMode) {
        createForm.hidden = true;
        createForm.setAttribute("aria-hidden", "true");
        if (productInput instanceof HTMLSelectElement) {
            productInput.disabled = true;
        }
        if (coinInput instanceof HTMLSelectElement) {
            coinInput.disabled = true;
        }
    }

    renderInvoice(null);

    if (productInput instanceof HTMLSelectElement) {
        productInput.addEventListener("change", () => {
            safeWrite(STORAGE_KEYS.selectedProduct, productInput.value);
            const selected = products.find((product) => product.id === productInput.value);
            if (selected) {
                renderInvoice({
                    ...currentInvoice,
                    productId: selected.id,
                    productName: selected.name,
                    termLabel: selected.termLabel,
                    amountUsd: selected.priceUsd
                });
                if (coinInput instanceof HTMLSelectElement && selected.defaultCoin) {
                    coinInput.value = selected.defaultCoin;
                }
            }
        });
    }

    if (coinInput instanceof HTMLSelectElement) {
        coinInput.addEventListener("change", () => {
            const nextCoin = coinInput.value;
            safeWrite(STORAGE_KEYS.selectedCoin, nextCoin);
            renderInvoice({
                ...currentInvoice,
                coin: nextCoin,
                wallet: walletMap[nextCoin] || ""
            });
        });
    }

    createForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const productId = productInput instanceof HTMLSelectElement ? productInput.value : "";
        const coin = coinInput instanceof HTMLSelectElement ? coinInput.value : "ETH";

        if (!productId) {
            setStatus(createStatus, "Select a product before creating invoice.", true);
            return;
        }

        setStatus(createStatus, "Creating invoice...", false);
        try {
            safeWrite(STORAGE_KEYS.selectedProduct, productId);
            await createInvoice(productId, coin, false);
            if (hasPaidAccess) {
                await loadDashboardData();
            }
        } catch (error) {
            setStatus(createStatus, error.message || "Invoice creation failed.", true);
        }
    });

    if (submitButton) {
        submitButton.addEventListener("click", async () => {
            if (!currentInvoice?.id) {
                setStatus(submitStatus, "Create an invoice first.", true);
                return;
            }

            const txHash = txHashInput instanceof HTMLInputElement ? txHashInput.value.trim() : "";
            if (!txHash) {
                setStatus(submitStatus, "Enter a transaction hash / ID.", true);
                return;
            }

            setStatus(submitStatus, "Submitting transaction for verification...", false);
            try {
                const result = await requestJson(`/api/billing/invoices/${encodeURIComponent(currentInvoice.id)}/submit-tx`, {
                    method: "POST",
                    body: { txHash }
                });

                if (txHashInput instanceof HTMLInputElement) {
                    txHashInput.value = "";
                }
                if (result?.invoice) {
                    renderInvoice(result.invoice);
                }
                setStatus(submitStatus, result?.payment?.message || "Transaction submitted.", result?.payment?.status === "rejected");
                if (result?.payment?.status === "verified") {
                    setStatus(submitStatus, "Payment verified. Unlocking dashboard...", false);
                    window.setTimeout(() => {
                        window.location.href = "dashboard.html";
                    }, 700);
                    return;
                }
                if (hasPaidAccess) {
                    await loadDashboardData();
                }
            } catch (error) {
                if (error?.payload?.invoice) {
                    renderInvoice(error.payload.invoice);
                }
                setStatus(submitStatus, error.message || "Could not verify transaction.", true);
            }
        });
    }

    if (copyWalletButton) {
        copyWalletButton.addEventListener("click", async () => {
            const wallet = walletInput instanceof HTMLInputElement ? walletInput.value.trim() : "";
            const copied = await copyToClipboard(wallet);
            setStatus(submitStatus, copied ? "Wallet copied." : "Could not copy wallet.", !copied);
        });
    }

    qsa("[data-copy-wallet-symbol]").forEach((button) => {
        button.addEventListener("click", async () => {
            const coin = button.getAttribute("data-copy-wallet-symbol");
            const wallet = coin ? walletMap[coin] || "" : "";
            const copied = await copyToClipboard(wallet);
            setStatus(walletCopyStatus, copied ? `${coin} wallet copied.` : `Could not copy ${coin} wallet.`, !copied);
        });
    });

    if (viewOrdersButton) {
        viewOrdersButton.addEventListener("click", () => {
            if (invoiceOnlyMode) {
                window.location.href = hasPaidAccess ? "dashboard.html" : "index.html#pricing";
                return;
            }
            const target = qs('.sidebar-nav [data-tab-target="overview"]');
            if (target instanceof HTMLElement) {
                target.click();
            }
        });
    }

    await refreshInvoices();
    const productId = getPreferredProductId();
    const coin = getPreferredCoin();
    const shouldCreatePreferredInvoice =
        !currentInvoice ||
        !["awaiting_payment", "pending_verification"].includes(String(currentInvoice.status || "")) ||
        (productId && currentInvoice.productId !== productId) ||
        (coin && normalizeCoin(currentInvoice.coin) !== coin);

    if (productId && shouldCreatePreferredInvoice) {
        try {
            await createInvoice(productId, coin, true);
        } catch (error) {
            setStatus(createStatus, "Create an invoice to start checkout.", false);
        }
    }
}

function getDodoSessionIdFromSearch() {
    const params = new URLSearchParams(window.location.search);
    const keys = ["dodo_session", "checkout_session_id", "session_id", "session"];
    for (const key of keys) {
        const value = String(params.get(key) || "").trim();
        if (value) {
            return value;
        }
    }
    return "";
}

async function initCardCheckout(auth) {
    const cardShell = qs("#dodo-card-shell");
    if (!(cardShell instanceof HTMLElement)) return;

    const payButton = qs("#dodo-card-pay-btn");
    const refreshButton = qs("#dodo-card-refresh-btn");
    const statusNode = qs("#dodo-card-status");
    const sessionNode = qs("#dodo-card-session-id");
    const paymentNode = qs("#dodo-card-payment-id");
    const paymentStatusNode = qs("#dodo-card-payment-status");
    const checkoutLink = qs("#dodo-card-open-checkout");

    const productId = "radon_anti_cheat_lifetime";
    let activeSessionId = "";

    function setCardStatus(message, isError) {
        if (!statusNode) return;
        statusNode.textContent = message;
        statusNode.style.color = isError ? "#ffb980" : "";
    }

    function renderCardCheckout(checkout) {
        if (sessionNode) {
            sessionNode.textContent = checkout?.sessionId || "--";
        }
        if (paymentNode) {
            paymentNode.textContent = checkout?.paymentId || "--";
        }
        if (paymentStatusNode) {
            const status = String(checkout?.paymentStatus || "waiting").replace(/_/g, " ");
            paymentStatusNode.textContent = status;
        }
        if (checkoutLink instanceof HTMLAnchorElement) {
            const nextUrl = String(checkout?.checkoutUrl || "").trim();
            checkoutLink.href = nextUrl || "#";
            checkoutLink.classList.toggle("disabled-link", !nextUrl);
        }
    }

    async function syncSession(sessionId, silent) {
        if (!sessionId) {
            setCardStatus("Create a card checkout session to begin.", false);
            return;
        }

        if (!silent) {
            setCardStatus("Checking payment status...", false);
        }

        try {
            const payload = await requestJson(`/api/billing/dodo/checkouts/${encodeURIComponent(sessionId)}`);
            const checkout = payload?.checkout || null;
            const status = String(checkout?.paymentStatus || "").toLowerCase();

            renderCardCheckout(checkout);

            if (status === "succeeded" || payload?.accessGranted) {
                safeRemove(STORAGE_KEYS.pendingDodoSession);
                setCardStatus("Card payment verified. Unlocking dashboard...", false);
                window.setTimeout(() => {
                    window.location.href = "dashboard.html";
                }, 700);
                return;
            }

            if (status === "failed" || status === "cancelled") {
                safeRemove(STORAGE_KEYS.pendingDodoSession);
                setCardStatus(`Card checkout ${status}. You can start a new payment session.`, true);
                return;
            }

            setCardStatus("Waiting for card payment confirmation.", false);
        } catch (error) {
            setCardStatus(error.message || "Could not sync card payment status.", true);
        }
    }

    async function createCardCheckoutSession() {
        if (!(payButton instanceof HTMLButtonElement)) return;
        payButton.disabled = true;
        setCardStatus("Starting secure card checkout...", false);

        try {
            const payload = await requestJson("/api/billing/dodo/checkouts", {
                method: "POST",
                body: { productId }
            });
            const checkout = payload?.checkout || null;
            const sessionId = String(checkout?.sessionId || "").trim();
            const checkoutUrl = String(checkout?.checkoutUrl || "").trim();

            if (!sessionId || !checkoutUrl) {
                throw new Error("Card checkout session could not be created.");
            }

            activeSessionId = sessionId;
            safeWrite(STORAGE_KEYS.pendingDodoSession, sessionId);
            safeWrite(STORAGE_KEYS.selectedPaymentMethod, CHECKOUT_METHODS.CARD);
            safeWrite(STORAGE_KEYS.selectedProduct, productId);

            renderCardCheckout(checkout);
            setCardStatus("Redirecting to secure card checkout...", false);
            window.location.href = checkoutUrl;
        } catch (error) {
            setCardStatus(error.message || "Could not start card checkout.", true);
            payButton.disabled = false;
        }
    }

    const returnedSession = getDodoSessionIdFromSearch();
    const pendingSession = String(safeRead(STORAGE_KEYS.pendingDodoSession) || "").trim();
    activeSessionId = returnedSession || pendingSession;

    if (returnedSession) {
        safeWrite(STORAGE_KEYS.pendingDodoSession, returnedSession);
    }

    if (activeSessionId) {
        renderCardCheckout({
            sessionId: activeSessionId,
            paymentId: null,
            paymentStatus: "processing",
            checkoutUrl: null
        });
        await syncSession(activeSessionId, true);
    } else {
        renderCardCheckout(null);
        setCardStatus("Pay securely with card through Dodo Payments.", false);
    }

    if (payButton instanceof HTMLButtonElement) {
        payButton.addEventListener("click", () => {
            createCardCheckoutSession().catch(() => undefined);
        });
    }

    if (refreshButton instanceof HTMLButtonElement) {
        refreshButton.addEventListener("click", () => {
            syncSession(activeSessionId, false).catch(() => undefined);
        });
    }

    if (auth?.hasPaidAccess) {
        safeRemove(STORAGE_KEYS.pendingDodoSession);
    }
}

async function initCheckoutPage() {
    const checkoutRoot = qs(".checkout-page");
    if (!(checkoutRoot instanceof HTMLElement)) return;

    const params = new URLSearchParams(window.location.search);
    const requestedMethod = normalizeCheckoutMethod(
        params.get("method") || safeRead(STORAGE_KEYS.selectedPaymentMethod) || CHECKOUT_METHODS.CRYPTO
    );
    const requestedCoin = normalizeCoin(params.get("coin") || safeRead(STORAGE_KEYS.selectedCoin)) || "ETH";

    safeWrite(STORAGE_KEYS.selectedPaymentMethod, requestedMethod);
    safeWrite(STORAGE_KEYS.selectedCoin, requestedCoin);
    setSelectedPlan("Lifetime");
    checkoutRoot.classList.toggle("checkout-card-mode", requestedMethod === CHECKOUT_METHODS.CARD);
    checkoutRoot.classList.toggle("checkout-crypto-mode", requestedMethod !== CHECKOUT_METHODS.CARD);

    const paymentLabel =
        requestedMethod === CHECKOUT_METHODS.CARD
            ? "Card"
            : requestedCoin === "BTC"
              ? "Bitcoin"
              : requestedCoin === "SOL"
                ? "Solana"
                : "Ethereum";
    setElementText("#checkout-selected-coin", paymentLabel);

    const redirectTarget =
        requestedMethod === CHECKOUT_METHODS.CARD
            ? "checkout.html?method=card"
            : `checkout.html?coin=${encodeURIComponent(requestedCoin)}`;

    function redirectToLogin() {
        recordAuthRedirectLoopBounce(redirectTarget);
        window.location.href = `login.html?mode=signin&redirect=${encodeURIComponent(redirectTarget)}`;
    }

    let auth;
    try {
        const me = await requestJson("/api/auth/me");
        auth = me?.user || null;
    } catch (error) {
        if (isUnauthorized(error)) {
            redirectToLogin();
            return;
        }
        return;
    }

    if (!auth) {
        redirectToLogin();
        return;
    }

    if (auth.hasPaidAccess) {
        window.location.href = "dashboard.html";
        return;
    }

    if (requestedMethod === CHECKOUT_METHODS.CARD) {
        await initCardCheckout(auth);
        return;
    }

    await initCryptoPayments(auth, {
        invoiceOnlyMode: true,
        lockedCoin: requestedCoin,
        fixedProductId: "radon_anti_cheat_lifetime"
    });
}

async function initDashboardPage() {
    const dashboardRoot = qs(".dashboard-layout");
    if (!dashboardRoot) return;

    const redirectTarget = "dashboard.html";

    function redirectToLogin() {
        recordAuthRedirectLoopBounce(redirectTarget);
        window.location.href = `login.html?mode=signin&redirect=${encodeURIComponent(redirectTarget)}`;
    }

    let auth;
    try {
        const me = await requestJson("/api/auth/me");
        auth = me.user;
    } catch (error) {
        if (isUnauthorized(error)) {
            redirectToLogin();
        }
        return;
    }

    const onUserUpdated = (nextUser) => {
        auth = { ...auth, ...(nextUser || {}) };
        applyDashboardUser(auth);
    };

    if (!auth?.hasPaidAccess) {
        const preferredMethod = normalizeCheckoutMethod(safeRead(STORAGE_KEYS.selectedPaymentMethod));
        if (preferredMethod === CHECKOUT_METHODS.CARD) {
            window.location.href = "checkout.html?method=card";
        } else {
            const preferredCoin = normalizeCoin(safeRead(STORAGE_KEYS.selectedCoin)) || "ETH";
            window.location.href = `checkout.html?coin=${encodeURIComponent(preferredCoin)}`;
        }
        return;
    }

    onUserUpdated(auth);

    const logoutLink = qs("#logout-link");
    if (logoutLink) {
        logoutLink.addEventListener("click", async (event) => {
            event.preventDefault();
            try {
                await requestJson("/api/auth/logout", { method: "POST" });
            } catch (error) {
                /* ignore and continue redirect */
            }
            window.location.href = "index.html";
        });
    }

    initDashboardSidebar();
    initDashboardTabs();
    initProfileSettings(auth, onUserUpdated);
    await initCryptoPayments(auth);
    if (auth?.hasPaidAccess) {
        await loadDashboardData();
    }

    if (auth?.hasPaidAccess) {
        window.setInterval(() => {
            loadDashboardData().catch(() => undefined);
        }, 30000);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initFaq();
    initPlanSelection();
    initCheckoutModal();
    initHomeAuthNav().catch(() => undefined);
    initHomeIconIntro();
    initHomeScrollReveal();
    initLoginPage().catch(() => undefined);
    initCheckoutPage().catch(() => undefined);
    initDashboardPage().catch(() => undefined);
});

