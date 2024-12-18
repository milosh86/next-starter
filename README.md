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
  


