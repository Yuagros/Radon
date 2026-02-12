/* FAQ */
document.querySelectorAll(".faq-item").forEach(item => {
    item.addEventListener("click", () => {
        const answer = item.querySelector(".faq-answer");
        answer.style.maxHeight = answer.style.maxHeight ? null : answer.scrollHeight + "px";
    });
});

/* ICON BUILD */
const outer = document.querySelector(".outer");
const inner = document.querySelector(".inner");
const icon = document.querySelector(".hero-icon");

if (outer && inner && icon) {
    const outerLen = outer.getTotalLength();
    const innerLen = inner.getTotalLength();

    outer.style.strokeDasharray = outerLen;
    outer.style.strokeDashoffset = outerLen;

    inner.style.strokeDasharray = innerLen;
    inner.style.strokeDashoffset = innerLen;

    let start = null;
    const duration = 1800;

    function ease(x) { return 1 - Math.pow(1 - x, 3) }

    function animate(t) {
        if (!start) start = t;
        let p = Math.min((t - start) / duration, 1);
        let e = ease(p);

        outer.style.strokeDashoffset = outerLen * (1 - e);

        if (p > 0.45) {
            let ip = (p - 0.45) / 0.55;
            inner.style.strokeDashoffset = innerLen * (1 - ease(ip));
        }

        icon.style.transform = `rotate(${(1 - e) * -0.25}rad)`;

        if (p < 1) requestAnimationFrame(animate);
        else startGlintCycle();
    }

    /* GLINT LOOP */
    function runGlint() {
        const glint = document.createElement("div");
        glint.className = "glint";
        icon.appendChild(glint);

        requestAnimationFrame(() => {
            glint.style.left = "140%";
        });

        setTimeout(() => glint.remove(), 1200);
    }

    function startGlintCycle() {
        function schedule() {
            let delay = 5000 + Math.random() * 3000;
            setTimeout(() => {
                runGlint();
                schedule();
            }, delay);
        }
        schedule();
    }

    requestAnimationFrame(animate);
}

/* DASHBOARD NAV */
const dashboardToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".sidebar");

if (dashboardToggle && sidebar) {
    dashboardToggle.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });

    // Close sidebar when clicking outside on mobile (optional enhancement)
    document.addEventListener("click", (e) => {
        if (window.innerWidth <= 900 &&
            sidebar.classList.contains("open") &&
            !sidebar.contains(e.target) &&
            !dashboardToggle.contains(e.target)) {
            sidebar.classList.remove("open");
        }
    });
}

/* MOBILE NAV */
const mobileToggle = document.querySelector(".mobile-toggle");
const navLinks = document.querySelector(".nav-links");

if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
        });
    });
}

/* SCROLL ANIMATIONS */
const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target); // Only animate once
        }
    });
}, observerOptions);

document.querySelectorAll("section h2, .card, .hero > *, .faq-item").forEach(el => {
    el.classList.add("reveal");
    observer.observe(el);
});
