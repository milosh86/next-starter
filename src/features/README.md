# Features modules/verticals
Every feature folder should contain domain specific code for a given feature. 

Structure of a feature folder should be as follows, but feel free to adapt this 
based on the needs and complexity of the feature (start simple and evolve toward
this): 

```
+-- api         # exported API request declarations and api hooks related to a specific feature
|
+-- assets      # assets folder can contain all the static files for a specific feature
|
+-- components  # components scoped to a specific feature
|
+-- hooks       # hooks scoped to a specific feature
|
+-- routes      # route components for a specific feature pages
|
+-- stores      # state stores for a specific feature
|
+-- types       # typescript types for TS specific feature domain
|
+-- utils       # utility functions for a specific feature
|
+-- index.ts 
```

**IMPORTANT:** Everything from a feature should be exported from the index.ts file 
which behaves as the public API of the feature!

You should import stuff from other features only by using:
```typescript
import {FeatureComponent} from "@/features/some-feature"
```

and not

```typescript
import {FeatureComponent} from "@/features/some-feature/components/FeatureComponent"
```
