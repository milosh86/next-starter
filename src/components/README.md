# Reusable UI Components
All components reusable across the project go here. Treat this as a library of 
components that can be reused across the projects. 

A lot of components here are coming from ShadeCN, which is not a classic UI library,
but a collection of components you can bring into your project and customize as
needed. So, if some code looks auto-generated, it's because it is. But also, it 
might be edited to fit the project's needs, so don't treat it as an immutable
piece.

By default, ShadeCN adds components to `src/components/ui` directory. To add new
component to specific folder, use `-p` flag:

```bash
npx shadcn-ui@latest add -p ./src/components/button button
```
