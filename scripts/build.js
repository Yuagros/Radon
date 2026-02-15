"use strict";

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const DIST = path.join(ROOT, "dist");
const requiredFiles = [
    "index.html",
    "login.html",
    "dashboard.html",
    "style.css",
    "dashboard.css",
    "script.js",
    "server.js",
    "package.json",
    ".env.example"
];

for (const file of requiredFiles) {
    const filePath = path.join(ROOT, file);
    if (!fs.existsSync(filePath)) {
        throw new Error(`Build check failed: missing ${file}`);
    }
}

fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

const copyTargets = [
    "index.html",
    "login.html",
    "dashboard.html",
    "style.css",
    "dashboard.css",
    "script.js",
    "server.js",
    "package.json",
    ".env.example"
];

for (const target of copyTargets) {
    fs.copyFileSync(path.join(ROOT, target), path.join(DIST, target));
}

const buildStamp = {
    builtAt: new Date().toISOString(),
    files: copyTargets
};

fs.writeFileSync(path.join(DIST, "build.json"), JSON.stringify(buildStamp, null, 2) + "\n", "utf8");
console.log(`Build complete. Output: ${DIST}`);
