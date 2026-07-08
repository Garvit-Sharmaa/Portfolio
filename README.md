# Garvit Sharma - Enterprise Portfolio Architecture

> *A high-performance, cinematic portfolio engineered for scale, maintainability, and exceptional user experience.*

## System Overview

This repository houses the source code for my professional portfolio. Engineered as a modern web application, the architecture prioritizes rapid content delivery, modular component design, and a highly polished, cinematic user interface. The system leverages static site generation, aggressive caching, and dynamic module loading to ensure an optimal performance baseline.

## Technical Stack & Infrastructure

- **Core Framework**: [Next.js](https://nextjs.org/) (React framework) operating on the App Router paradigm.
- **Language**: Strict TypeScript (`TS 5.x`), enforcing rigorous type safety across all component boundaries and state transitions.
- **Styling Engine**: Tailwind CSS coupled with Framer Motion for hardware-accelerated, high-fidelity micro-interactions and spatial animations.
- **Data Layer**: Local JSON abstraction (`src/content/projects.json`) designed for zero-latency retrieval, easily extensible to a headless CMS or external database in future iterations.

## Architectural Principles

1. **Modular Component Hierarchy**: The UI is strictly decoupled into independent, highly cohesive `features` (`home`, `canvas`, `boot`). This encapsulation prevents style leakage and state contamination.
2. **Deterministic State Management**: Complex interactions (such as the Boot Sequence and dynamic project feeds) rely on predictable, unidirectional data flow.
3. **Performance First**: 
    - Critical rendering paths are optimized.
    - SVG assets (icons via `lucide-react` & `react-icons`) are tree-shaken to minimize bundle sizes.
    - Heavy visual effects (glassmorphism, gradients) are delegated to the GPU.

## Local Development & Deployment

### Prerequisites
- Node.js `v18.17.0` or higher
- `npm` or `yarn`

### Initialization

```bash
# Clone the repository
git clone https://github.com/Garvit-Sharmaa/Portfolio.git

# Install dependencies
npm install

# Boot the local development server (Port 3000)
npm run dev
```

### Production Build
To simulate the production environment and analyze bundle sizing:
```bash
npm run build
npm run start
```

## Repository Structure

```text
src/
├── app/                  # Next.js App Router configuration and global layouts
├── components/           # Reusable UI primitives (Error Boundaries)
├── content/              # Static data stores (projects, configuration)
├── features/             # Domain-specific modules (Hero, About, Projects, Contact)
├── lib/                  # Core utility functions and intelligence engines
└── types/                # Global TypeScript interfaces
```

## Continuous Integration / Continuous Deployment (CI/CD)

The repository is configured for automated deployment. Every push to the `main` branch triggers a strict build pipeline that verifies TypeScript typings, enforces ESLint rules, and compiles an optimized production build before traffic routing.

---
*Engineered by Garvit Sharma.*
