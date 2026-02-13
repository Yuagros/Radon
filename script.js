const STORAGE_KEYS = {
    plan: "radon_selected_plan",
    auth: "radon_auth",
    rememberedEmail: "radon_remembered_email"
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

function getSelectedPlan() {
    return safeRead(STORAGE_KEYS.plan) || "Starter";
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

function initBlobCardAnimation() {
    const cards = qsa(".animate-blob-card");
    if (!cards.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointerHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (reduceMotion || !pointerHover) return;

    cards.forEach((card) => {
        const blob = card.querySelector(".blob");
        const fakeblob = card.querySelector(".fakeblob");

        if (!(blob instanceof HTMLElement) || !(fakeblob instanceof HTMLElement)) return;

        card.addEventListener("pointermove", (event) => {
            const rec = fakeblob.getBoundingClientRect();
            const x = event.clientX - rec.left - blob.offsetWidth / 2;
            const y = event.clientY - rec.top - blob.offsetHeight / 2;

            blob.animate(
                [{ transform: `translate(${x}px, ${y}px)` }],
                {
                    duration: 300,
                    fill: "forwards"
                }
            );

            blob.style.opacity = "1";
        });

        card.addEventListener("pointerleave", () => {
            blob.style.opacity = "";
        });
    });
}

function initRevealAnimations() {
    const revealItems = qsa(".reveal");
    if (!revealItems.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion || !("IntersectionObserver" in window)) return;

    document.body.classList.add("motion-ready");

    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("revealed");
                obs.unobserve(entry.target);
            });
        },
        {
            threshold: 0.16,
            rootMargin: "0px 0px -8% 0px"
        }
    );

    revealItems.forEach((item) => observer.observe(item));
}

function initStickyHeaderState() {
    const header = qs(".site-header");
    if (!header) return;

    const sync = () => {
        header.classList.toggle("scrolled", window.scrollY > 10);
    };

    sync();
    window.addEventListener("scroll", sync, { passive: true });
}

function initLoginPage() {
    const form = qs("#login-form");
    if (!form) return;

    const selectedPlanEl = qs("#selected-plan");
    const emailInput = qs("#email");
    const passwordInput = qs("#password");
    const rememberInput = qs("#remember-me");

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

        const email = emailInput instanceof HTMLInputElement ? emailInput.value.trim() : "";
        const password = passwordInput instanceof HTMLInputElement ? passwordInput.value : "";

        if (!email || !password) return;

        if (rememberInput instanceof HTMLInputElement && rememberInput.checked) {
            safeWrite(STORAGE_KEYS.rememberedEmail, email);
        } else {
            safeRemove(STORAGE_KEYS.rememberedEmail);
        }

        safeWrite(
            STORAGE_KEYS.auth,
            JSON.stringify({
                email,
                plan: getSelectedPlan(),
                loggedInAt: new Date().toISOString()
            })
        );

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

function initDashboardPage() {
    const dashboardRoot = qs(".dashboard-layout");
    if (!dashboardRoot) return;

    const authRaw = safeRead(STORAGE_KEYS.auth);
    if (!authRaw) {
        window.location.href = "login.html";
        return;
    }

    let auth = null;
    try {
        auth = JSON.parse(authRaw);
    } catch (error) {
        auth = null;
    }

    if (!auth || !auth.email) {
        safeRemove(STORAGE_KEYS.auth);
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
}

document.addEventListener("DOMContentLoaded", () => {
    initMobileNav();
    initStickyHeaderState();
    initRevealAnimations();
    initFaq();
    initPlanSelection();
    initBlobCardAnimation();
    initLoginPage();
    initDashboardPage();
});
