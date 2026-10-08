# 🟥 Redstone Logic Helper

A full-stack web application and interactive tool designed to evaluate, simulate, and assist with Minecraft Redstone logic gates and circuit mechanics.

Whether you're mapping out complex digital logic circuits in Redstone or debugging signal delays and gate truth tables, this tool provides real-time logic evaluation via a dedicated backend API and a responsive web interface.

---

## 🚀 Features

- **Logic Gate Evaluation Engine:** Evaluate inputs and outputs for standard logic gates (AND, OR, NOT, NAND, NOR, XOR, XNOR) alongside Redstone-specific mechanics.
- **Interactive Circuit Simulation:** Visual interface to toggle inputs, inspect wire states, and verify signal behaviors.
- **API Endpoints:** REST API endpoints to programmatically test gate evaluations and circuit state outputs.

---

## 🛠️ Tech Stack & Architecture

### **Frontend**
- **Framework:** Astro (Fast, component-driven UI with low JS overhead)
- **Interactive UI:** Expressive client-side components for real-time visualization

### **Backend & Engine**
- **Server Framework:** Express (Node.js)
- **Core Logic:** Custom Redstone logic evaluation algorithms mapping Minecraft tick/signal rules to boolean logic

### **Testing & Quality Assurance**
- **End-to-End Testing:** Playwright (automated browser verification of interactive circuit components and state UI)

## 🛠️ Development & Branching Strategy

We follow a strict branching model enforced by GitHub Actions CI/CD pipelines:
* `main` — Production environment (deploys to Cloudflare Workers Prod)
* `staging` — Staging environment (deploys to Cloudflare Workers Staging)

For details on branch prefixes (`feature/*`, `fix/*`, `hotfix/*`, `chore/*`), see our [Contributing Guidelines](./CONTRIBUTING.md).