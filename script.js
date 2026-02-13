const STORAGE_KEYS = {
    plan: "radon_selected_plan",
    auth: "radon_auth",
    rememberedEmail: "radon_remembered_email",
    accounts: "radon_accounts",
    cryptoConfig: "radon_crypto_config",
    cryptoRequests: "radon_crypto_requests"
};

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

function safeReadJson(key, fallback) {
    const raw = safeRead(key);
    if (!raw) return fallback;
    try {
        return JSON.parse(raw);
    } catch (error) {
        return fallback;
    }
}

function safeWriteJson(key, value) {
    safeWrite(key, JSON.stringify(value));
}

function normalizeEmail(email) {
    return String(email || "").trim().toLowerCase();
}

function getSelectedPlan() {
    return safeRead(STORAGE_KEYS.plan) || "Starter";
}

function getAccounts() {
    const value = safeReadJson(STORAGE_KEYS.accounts, []);
    return Array.isArray(value) ? value : [];
}

function saveAccounts(accounts) {
    safeWriteJson(STORAGE_KEYS.accounts, accounts);
}

function findAccountByEmail(email) {
    const normalized = normalizeEmail(email);
    return getAccounts().find((account) => normalizeEmail(account.email) === normalized) || null;
}

function setAuthSession(account, planOverride) {
    safeWriteJson(STORAGE_KEYS.auth, {
        email: normalizeEmail(account.email),
        name: account.name || "",
        plan: planOverride || getSelectedPlan(),
        loggedInAt: new Date().toISOString()
    });
}

function initMobileNav() {
    const toggle = qs(".mobile-toggle");
    const nav = qs(".nav-links");

    if (!toggle || !nav) return;

    toggle.addEventListener("click", () => {
        nav.classList.toggle("active");
    });

    qsa(".nav-links a").forEach((link) => {
        link.addEventListener("click", () => nav.classList.remove("active"));
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
            answer.style.maxHeight = isOpen ? "" : answer.scrollHeight + "px";
        });
    });
}

function initPlanSelection() {
    qsa(".choose-plan-btn").forEach((button) => {
        button.addEventListener("click", () => {
            const plan = button.getAttribute("data-plan");
            if (!plan) return;
            safeWrite(STORAGE_KEYS.plan, plan);
        });
    });
}

function initLoginPage() {
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

    let mode = "create";

    function setStatus(message, isError) {
        if (!status) return;
        status.textContent = message;
        status.style.color = isError ? "#fb7185" : "";
    }

    function setMode(nextMode) {
        mode = nextMode === "signin" ? "signin" : "create";

        modeButtons.forEach((button) => {
            const isActive = button.getAttribute("data-auth-mode") === mode;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-selected", String(isActive));
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

        if (nameRow) {
            nameRow.hidden = mode !== "create";
        }

        if (confirmRow) {
            confirmRow.hidden = mode !== "create";
        }

        if (nameInput instanceof HTMLInputElement) {
            nameInput.required = mode === "create";
        }

        if (confirmInput instanceof HTMLInputElement) {
            confirmInput.required = mode === "create";
        }

        setStatus("", false);
    }

    modeButtons.forEach((button) => {
        button.addEventListener("click", () => {
            setMode(button.getAttribute("data-auth-mode"));
        });
    });

    const queryMode = new URLSearchParams(window.location.search).get("mode");
    setMode(queryMode === "signin" ? "signin" : "create");

    if (selectedPlanEl) {
        selectedPlanEl.textContent = "Selected plan: " + getSelectedPlan();
    }

    const rememberedEmail = safeRead(STORAGE_KEYS.rememberedEmail);
    if (rememberedEmail && emailInput instanceof HTMLInputElement) {
        emailInput.value = rememberedEmail;
        if (rememberInput instanceof HTMLInputElement) {
            rememberInput.checked = true;
        }
    }

    form.addEventListener("submit", (event) => {
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
                setStatus("Use a display name with at least 2 characters.", true);
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

            if (findAccountByEmail(email)) {
                setStatus("That account already exists. Sign in instead.", true);
                return;
            }

            const account = {
                name,
                email: normalizeEmail(email),
                password,
                createdAt: new Date().toISOString()
            };

            const accounts = getAccounts();
            accounts.push(account);
            saveAccounts(accounts);
            setAuthSession(account, getSelectedPlan());
            setStatus("Account created. Redirecting...", false);
            window.location.href = "dashboard.html";
            return;
        }

        const account = findAccountByEmail(email);
        if (!account) {
            setStatus("No account found for that email. Create one first.", true);
            return;
        }

        if (account.password !== password) {
            setStatus("Incorrect password.", true);
            return;
        }

        setAuthSession(account, getSelectedPlan());
        setStatus("Signed in. Redirecting...", false);
        window.location.href = "dashboard.html";
    });
}

function initDashboardSidebar() {
    const toggle = qs(".menu-toggle");
    const sidebar = qs(".sidebar");

    if (!toggle || !sidebar) return;

    toggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

    qsa(".sidebar-nav .nav-item").forEach((item) => {
        item.addEventListener("click", () => {
            if (window.innerWidth <= 960) {
                sidebar.classList.remove("open");
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
        }
    });
}

function initDashboardTabs() {
    const navItems = qsa(".sidebar-nav [data-tab-target]");
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
            const isActive = item.getAttribute("data-tab-target") === tabName;
            item.classList.toggle("active", isActive);
            item.setAttribute("aria-current", isActive ? "page" : "false");
        });

        panels.forEach((panel) => {
            const isActive = panel.getAttribute("data-tab-panel") === tabName;
            panel.hidden = !isActive;
            panel.classList.toggle("is-active", isActive);
        });

        if (updateHash) {
            if (history.replaceState) {
                history.replaceState(null, "", "#" + tabName);
            } else {
                window.location.hash = tabName;
            }
        }
    }

    navItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault();
            const targetTab = item.getAttribute("data-tab-target");
            if (!targetTab) return;
            setActiveTab(targetTab, true);
        });
    });

    const initialHash = window.location.hash.replace("#", "");
    const defaultTab = navItems[0].getAttribute("data-tab-target") || "overview";
    setActiveTab(validTargets.has(initialHash) ? initialHash : defaultTab, false);
}

function readCryptoConfig() {
    const defaults = {
        provider: "manual",
        endpoint: "",
        apiKey: ""
    };
    const value = safeReadJson(STORAGE_KEYS.cryptoConfig, defaults);
    if (!value || typeof value !== "object") return defaults;
    return {
        provider: String(value.provider || defaults.provider),
        endpoint: String(value.endpoint || defaults.endpoint),
        apiKey: String(value.apiKey || defaults.apiKey)
    };
}

function storeCryptoRequest(payload) {
    const requests = safeReadJson(STORAGE_KEYS.cryptoRequests, []);
    const safeRequests = Array.isArray(requests) ? requests : [];
    safeRequests.unshift(payload);
    safeWriteJson(STORAGE_KEYS.cryptoRequests, safeRequests.slice(0, 30));
}

function initCryptoPayments(auth) {
    const configForm = qs("#crypto-config-form");
    const checkoutForm = qs("#crypto-checkout-form");
    if (!configForm || !checkoutForm) return;

    const providerNameInput = qs("#provider-name");
    const providerEndpointInput = qs("#provider-endpoint");
    const providerApiKeyInput = qs("#provider-api-key");
    const configStatus = qs("#crypto-config-status");

    const cryptoPlanInput = qs("#crypto-plan");
    const cryptoAmountInput = qs("#crypto-amount");
    const cryptoCoinInput = qs("#crypto-coin");
    const cryptoWalletInput = qs("#crypto-wallet");
    const cryptoStatus = qs("#crypto-status");

    const saved = readCryptoConfig();
    if (providerNameInput instanceof HTMLSelectElement) providerNameInput.value = saved.provider;
    if (providerEndpointInput instanceof HTMLInputElement) providerEndpointInput.value = saved.endpoint;
    if (providerApiKeyInput instanceof HTMLInputElement) providerApiKeyInput.value = saved.apiKey;

    if (cryptoPlanInput instanceof HTMLSelectElement) {
        cryptoPlanInput.value = auth.plan || getSelectedPlan();
    }

    const planPrices = {
        Starter: "29",
        Pro: "79",
        Enterprise: "199"
    };

    if (cryptoPlanInput instanceof HTMLSelectElement && cryptoAmountInput instanceof HTMLInputElement) {
        const current = planPrices[cryptoPlanInput.value];
        if (current) cryptoAmountInput.value = current;

        cryptoPlanInput.addEventListener("change", () => {
            const mapped = planPrices[cryptoPlanInput.value];
            if (mapped) {
                cryptoAmountInput.value = mapped;
            }
        });
    }

    configForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const config = {
            provider: providerNameInput instanceof HTMLSelectElement ? providerNameInput.value : "manual",
            endpoint: providerEndpointInput instanceof HTMLInputElement ? providerEndpointInput.value.trim() : "",
            apiKey: providerApiKeyInput instanceof HTMLInputElement ? providerApiKeyInput.value.trim() : ""
        };

        safeWriteJson(STORAGE_KEYS.cryptoConfig, config);
        if (configStatus) {
            configStatus.textContent = "Payment settings saved.";
        }
    });

    checkoutForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const plan = cryptoPlanInput instanceof HTMLSelectElement ? cryptoPlanInput.value : "";
        const amount = cryptoAmountInput instanceof HTMLInputElement ? cryptoAmountInput.value.trim() : "";
        const coin = cryptoCoinInput instanceof HTMLSelectElement ? cryptoCoinInput.value : "";
        const wallet = cryptoWalletInput instanceof HTMLInputElement ? cryptoWalletInput.value.trim() : "";

        if (!plan || !amount || !coin || !wallet) {
            if (cryptoStatus) cryptoStatus.textContent = "Fill all payment fields first.";
            return;
        }

        const config = readCryptoConfig();
        const reference = "RADON-" + Date.now().toString(36).toUpperCase();
        const payload = {
            reference,
            accountEmail: auth.email,
            plan,
            amountUsd: Number(amount),
            coin,
            wallet,
            provider: config.provider,
            createdAt: new Date().toISOString()
        };

        storeCryptoRequest(payload);

        if (config.provider === "custom" && config.endpoint) {
            try {
                if (cryptoStatus) cryptoStatus.textContent = "Submitting to provider...";
                const headers = {
                    "Content-Type": "application/json"
                };
                if (config.apiKey) {
                    headers.Authorization = "Bearer " + config.apiKey;
                }

                const response = await fetch(config.endpoint, {
                    method: "POST",
                    headers,
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    throw new Error("Provider returned " + response.status);
                }

                if (cryptoStatus) {
                    cryptoStatus.textContent = "Payment request sent. Reference: " + reference;
                }
                return;
            } catch (error) {
                if (cryptoStatus) {
                    cryptoStatus.textContent =
                        "Request saved locally as " +
                        reference +
                        ". Provider call failed. Check endpoint/key and try again.";
                }
                return;
            }
        }

        if (cryptoStatus) {
            cryptoStatus.textContent =
                "Payment request " +
                reference +
                " created in local mode. Share provider API details and I will wire live checkout.";
        }
    });
}

function initDashboardPage() {
    const dashboardRoot = qs(".dashboard-layout");
    if (!dashboardRoot) return;

    const auth = safeReadJson(STORAGE_KEYS.auth, null);
    if (!auth || !auth.email) {
        window.location.href = "login.html";
        return;
    }

    const userEmail = qs("#dashboard-user-email");
    const planName = qs("#dashboard-plan-name");
    const logoutLink = qs("#logout-link");

    if (userEmail) {
        userEmail.textContent = auth.email;
    }

    if (planName) {
        planName.textContent = auth.plan || getSelectedPlan();
    }

    if (logoutLink) {
        logoutLink.addEventListener("click", () => {
            safeRemove(STORAGE_KEYS.auth);
        });
    }

    initDashboardSidebar();
    initDashboardTabs();
    initCryptoPayments(auth);
}

document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initFaq();
    initPlanSelection();
    initLoginPage();
    initDashboardPage();
});
