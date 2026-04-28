# Passcraft

## Educational Purpose

This project was created primarily for **educational and learning purposes**.  
While it is well-structured and could technically be used in production, it is **not intended for commercialization**.  
The main goal is to explore and demonstrate best practices, patterns, and technologies in software development.

## Getting Started

1. Clone the repository
2. Navigate to the project folder
3. Execute: `npm install`
4. Execute: `npm run dev`

The application will open automatically at `http://localhost:3000`

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

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/passcraft`](https://www.diegolibonati.com.ar/#/project/passcraft)

## Testing

1. Navigate to the project folder
2. Execute: `npm test`

For coverage report:

```bash
npm run test:coverage
```

## Security

### npm audit

Check for vulnerabilities in dependencies:

```bash
npm audit
```

## Known Issues

None at the moment.
