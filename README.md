# Passcraft

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Description

**Passcraft** is a lightweight, browser-based password generator that gives you full control over the credentials you create. No accounts, no servers, no dependencies — everything runs entirely in your browser.

You start by setting the desired password length, then toggle any combination of four character sets: uppercase letters (A–Z), lowercase letters (a–z), numbers (0–9), and symbols (`!`, `#`, `$`, `%`, `&`, `/`, `(`, `)`, `=`, `?`, `¡`). Hit **Generate Password** and Passcraft instantly builds a randomized password from the character pool you defined. The result appears in a read-only field; clicking it automatically copies the password to your clipboard and confirms the action with a notification, so you can paste it straight into any form without extra steps.

The combination of options is entirely up to you: generate a short numeric PIN, a long alphanumeric passphrase, a symbol-heavy password for high-security accounts, or anything in between. Because each password is generated fresh on demand using `Math.random`, consecutive clicks always produce a different result.

Passcraft has zero runtime dependencies. The entire application is written in vanilla TypeScript compiled by Vite, with no frameworks or external libraries involved in production. The codebase follows strict TypeScript settings and is covered by a Jest + Testing Library test suite.

## Technologies used

1. Typescript
2. CSS3
3. HTML5
4. Vite

## Libraries used

The project ships with **zero production dependencies**. Everything listed below is tooling used during development, testing, and linting.

#### Dependencies

```
No production dependencies - Pure Vanilla TypeScript
```

#### devDependencies

```
"@eslint/js": "^9.39.2"
"@testing-library/dom": "^10.4.0"
"@testing-library/jest-dom": "^6.6.3"
"@testing-library/user-event": "^14.5.2"
"@types/jest": "^30.0.0"
"@types/node": "^22.0.0"
"eslint": "^9.39.2"
"eslint-config-prettier": "^10.1.8"
"eslint-plugin-prettier": "^5.5.5"
"globals": "^17.3.0"
"husky": "^9.1.7"
"jest": "^30.3.0"
"jest-environment-jsdom": "^30.3.0"
"lint-staged": "^16.2.7"
"prettier": "^3.8.1"
"ts-jest": "^29.4.6"
"typescript": "^5.2.2"
"typescript-eslint": "^8.54.0"
"vite": "^7.1.6"
```

## Getting Started

With the toolchain in place after `npm install`, follow these steps to run Passcraft locally:

1. Ensure [Node.js 22](https://nodejs.org/) is installed (see `.nvmrc`)
2. Clone the repository
3. Navigate to the project folder
4. Execute: `npm install`
5. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`.

## Testing

Once the app runs locally, you can verify the codebase against the Jest + Testing Library suite that mirrors the `src/` layout.

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Continuous Integration

[![CI](https://github.com/DiegoLibonati/Password-Generator/actions/workflows/ci.yml/badge.svg)](https://github.com/DiegoLibonati/Password-Generator/actions/workflows/ci.yml)

The repository ships with a **GitHub Actions** pipeline defined in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). It runs automatically on every `push` and `pull_request` targeting the `main` branch and is composed of three sequential jobs that gate one another: if an earlier job fails, the next one is skipped.

### Pipeline overview

```
                      ┌─── PR or push to main ───┐
                      ▼                          ▼
┌──────────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│    lint-and-audit    │─▶│     testing      │─▶│      build       │
│  eslint · tsc --noE  │  │   jest (jsdom)   │  │  tsc + vite build│
└──────────────────────┘  └──────────────────┘  └──────────────────┘
```

### Validation jobs (run on every PR and push to `main`)

1. **`lint-and-audit`** — installs dependencies with `npm ci`, then runs `npm run lint` (ESLint with Prettier as a lint rule) and `npm run type-check` (TypeScript in `--noEmit` mode with `strict`, `noUncheckedIndexedAccess`, `exactOptionalPropertyTypes`, `noImplicitReturns`, `noImplicitOverride`).
2. **`testing`** — depends on `lint-and-audit`. Reinstalls dependencies and runs `npm test`, which executes the Jest + Testing Library suite in the `jest-environment-jsdom` environment. The suite mirrors the `src/` layout under `__tests__/`, mocks CSS imports via `__tests__/__mocks__/style.mock.ts`, and stubs `navigator.clipboard` in `__tests__/jest.setup.ts`. Coverage threshold is 70% across all metrics when invoked via `npm run test:coverage` locally.
3. **`build`** — depends on `testing`. Reinstalls dependencies and runs `npm run build`, which performs a `tsc` type-check followed by `vite build`. This guarantees the codebase still produces a publishable bundle.

All three jobs use `ubuntu-latest`, `actions/checkout@v4.2.2`, and `actions/setup-node@v4` with `node-version-file: .nvmrc` and `cache: npm` so the Node version is always pinned to `.nvmrc` and `node_modules` is cached between runs.

### Skipping CI

To push a change to `main` without triggering the pipeline (e.g. fixing a typo in the README), append GitHub's standard `[skip ci]` marker to the commit message:

```bash
git commit -m "docs: fix typo in README [skip ci]"
```

### Where the build outputs live

| Output                                           | Location                                                   |
| ------------------------------------------------ | ---------------------------------------------------------- |
| Validation logs (lint, type-check, tests, build) | **Actions** tab on GitHub                                  |
| Production bundle (`dist/`)                      | Ephemeral, inside the runner (not uploaded as an artifact) |

> **Note:** the pipeline does not publish releases or attach build artifacts. It is purely a validation pipeline that guarantees `main` always lints, type-checks, tests, and builds cleanly.

### Running the same checks locally

```bash
# lint-and-audit
npm run lint
npm run type-check

# testing
npm test

# build
npm run build
```

## Security Audit

Beyond functional tests, you can audit the dev dependencies for known vulnerabilities.

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/passcraft`](https://www.diegolibonati.com.ar/#/project/passcraft)
