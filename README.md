Step-by-step guide to set up a production-ready Next.js project for 2025. Every 
step is optional and can be skipped if not needed or swapped for a different 
tool depending on the project requirements.

Selected tools:
- Next.js with TypeScript, using App Router
- Tailwind CSS for styling
- Biome for linting and formatting
- Husky and lint-staged for pre-commit hooks
- GitHub Actions for CI
- Vitest and React Testing Library for unit and integration tests
- Playwright for E2E tests
- Storybook for component development and documentation

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
For more information check the [Next.js documentation](https://nextjs.org/docs/app/building-your-application/testing/vitest)

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

## (5.1) Setup Playwright for E2E tests
For more information check the [Next.js documentation](https://nextjs.org/docs/app/building-your-application/testing/playwright)

- To install Playwright, run `npm init playwright` or `yarn create playwright`.
- Go through the setup process and select the options that suit your project.
  - It can also create a GitHub Actions workflow for you. 
- Set baseURL to `http://localhost:3000` in `playwright.config.ts`.
- Uncomment `webServer` in `playwright.config.ts` and set `command` to `npm run dev`.
  It will start the development server before running the tests.
- Update Vitest config to exclude e2e tests. Make sure to keep the default `exclude` value!
See `vitest.config.mts` for the configuration.

## (6) Setup Storybook

We will use Storybook to develop components in isolation and document them.

- Init Storybook: `npx storybook@latest init`. This will:
  - Add `.storybook` directory with the configuration
  - Add `storybook` scripts to `package.json`
  - Add dependencies and configuration relevant to Next.js 
  - Add `src/stories` example directory
- Add `sb` shortcut to `package.json`
- Rename script `build-storybook` to `storybook:build`
- Check the [Next.js section](https://storybook.js.org/docs/get-started/frameworks/nextjs) 
in the Storybook documentation for more information about limitations and 
supported features.

## (7) Styling

Tailwind CSS is used as a default for styling. [shadcn/ui](https://ui.shadcn.com/) is used for 
easier creation and styling of basic components.

Styled JSX is also available by default in both Next.js and Storybook, so it can
be used in special cases where it might be more appropriate than Tailwind.

## (7.1) Tailwind CSS

Added by default in the Next.js template. You can customize it by editing `tailwind.config.js`.

## (7.2) Shadcn/ui

We will use `shadcn/ui` to build our component library. It is a collection of 
components built with TailwindCSS. Great advantage is that it provides independent
components you can copy-paste and use in your project, with maximum customization.

- Init `shadcn/ui`: `npx shadcn@latest init -d`
  - If using `npm`, it will ask you to use either `--force` or `--legacy-peer-deps`.
  - If using `yarn`, `bun` or `pnpm`, it will install the package without any additional steps.
  - See [shadcn/ui documentation](https://ui.shadcn.com/docs/react-19) for more information.
- Init step will:
  - Add following dependencies:
    - `tailwind-merge` and `tailwind-animate`
    - `lucide-react` (icons)
    - `class-variance-authority` (for class variance)
    - `clsx` (for classnames)
  - Add `components.json` file which holds configuration for your project 
  - Update `tailwind.config.js` with the new configuration
  - Update `src/app/global.css` with the new CSS variables
    - You can choose to use either CSS variables or Tailwind utility classes for theming
    - We will use CSS variables in this project
  - Add `cn` utility to `src/lib/utils.ts` (we will later move this to another place)

## (7.3) Theme

Theme is managed through CSS variables defined in `app/globals.css`, which are
exposed to the Tailwind through `tailwind.config.js`.

We use a simple `background` and `foreground` convention for colors. The
`background` variable is used for the background color of the component and the
foreground variable is used for the **text color**.

>The `-background` suffix is omitted when the variable is used for the background
color of the component, we only explicitly use `-foreground` suffix.

### List of variables

> NOTE: This is slightly different from the default `shadcn/ui` theme, update as needed.

`background` - default background color (i.e. `<body />` and similar)

`foreground` - default text color

`foreground-secondary` - muted text color on a primary background. Currently derived from `foreground`, with opacity applied.

`title` - title color

`muted` - muted background color

`muted-foreground` - text color on muted background

`card` and `popover` - card and popover background color, currently the same as `muted`

`accent`, `accent-foreground` - used for accents such as hover effects on Ghost Button, <DropdownMenuItem>, <SelectItem>...etc

`primary` - primary button background color

`primary-foreground` - primary button text color

`secondary` - secondary button background color

`secondary-foreground` - secondary button text color

`destructive` - used for destructive actions such as `<Button variant="destructive">`

`destructive-foreground` - destructive button text color

`border` - default border color

`input` - border color for inputs such as `<Input />`, `<Select />`, `<Textarea />`

`ring` - focus ring color
