## (1) Next.js init

```bash
npx create-next-app@latest
```

Select preferred options and wait for the installation to finish. I've selected
TypeScript, Tailwind CSS, and no ESLint (see the next step). Also, I've selected
App Router which provides support for RSC.

## (2) Biome

We will use Biome, which is an alternative to Eslint and Prettier in one package.
It is significantly faster than Eslint and Prettier, and it is simpler to configure.

- https://biomejs.dev/
- Install Biome: `npm install --save-dev --save-exact @biomejs/biome`
- Initialize Biome: `npx @biomejs/biome init` (creates `biome.json`)
- Edit configuration in `biome.json`, as needed
- Set up your IDE to use Biome for linting and formatting, i.e. Jetbrains `Biome` plugin
- Edit linting and formatting scripts in `package.json`:
  ```json
  "scripts": {
     ...
    "lint": "npx @biomejs/biome lint --write ./src", // lint and apply safe fixes
    "check": "npx @biomejs/biome check ./src" // lint and format check (intended for CI)
  }
  ```

## (3) Pre-commit Git Hooks 

We will use `Husky` and `lint-staged` to set up pre-commit hooks.

- Install Husky : `npm install --save-dev husky`
- Husky init (adds prepare script): `npx husky init`
- Install lint-staged: `npm install --save-dev lint-staged`
- Update `.husky/pre-commit` to run `lint-staged`:
  ```bash
  npx lint-staged
  ```
- Update `package.json` to include `lint-staged` configuration (see [biome docs](https://biomejs.dev/recipes/git-hooks/#lint-staged)):
  ```json
  "lint-staged": {
      "*.{js,ts,cjs,mjs,d.cts,d.mts,jsx,tsx,json,jsonc}": [
          "biome check --files-ignore-unknown=true"
      ]
  }
  ```

## (4) GitHub Actions - CI
We will use GitHub Actions to check the code on every push: linting and formatting,
testing, security checks, and building the app.

See `.github/workflows/ci.yml` for the configuration.

## (4.1) GitHub PR template

See `.github/PULL_REQUEST_TEMPLATE.md` for the default PR template.

## (5) Setup Vitest and React Testing Library

We will use `Vitest` and `React Testing Library` as our main tools for testing.
Dor more information check the [Next.js documentation](https://nextjs.org/docs/app/building-your-application/testing/vitest)

- Install Vitest dependencies: `npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/dom vite-tsconfig-paths`
- Add `vitest.config.mts`
- Add `test` script to `package.json`:
  ```json
  "scripts": {
    ...
    "test": "vitest"
  }
  ```
- Write your tests in `__tests__` directory or alongside the component files (with `.test.ts(x)` extension).
