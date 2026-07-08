# @aglaea/contract

Shared TypeBox API contracts for Herta and Aglaea.

## Direction

This package is published to npm as `@aglaea/contract` and consumed by Herta and Aglaea as a normal package dependency. Do not consume it through a workspace reference.

The package lives in this repository so Herta can own its backend schema/import work without also being the source repository for shared frontend contracts.

## Verify

```sh
npm ci
npm test
npm run pack:dry-run
```

## First publish

npm trusted publishing can only be configured after the package exists. For the initial package claim, publish manually after verification:

```sh
npm publish --access public
```

After the package exists on npm, configure trusted publishing on npmjs.com:

- Provider: GitHub Actions
- Repository: `KennyKeni/aglaea-contract`
- Workflow filename: `publish.yml`
- Allowed action: `npm publish`

Then use the GitHub workflow at `.github/workflows/publish.yml` for future releases. It uses OIDC trusted publishing and does not use a long-lived npm token.

## Exports

- `@aglaea/contract`
- `@aglaea/contract/pokemon`

The first contract slice covers the Pokemon species/form response surface used by Herta's `/pokemon/species`, `/pokemon/species/:identifier`, `/pokemon/forms`, and `/pokemon/forms/:identifier` routes.

## Usage

Consume the package as a normal npm dependency. Do not use a workspace or local path reference.

```sh
npm install @aglaea/contract
```

### Response schemas

All response schemas are TypeBox schemas. Use `Value.Check` for runtime validation and `Static<typeof Schema>` for TypeScript types.

```ts
import { Value } from "@sinclair/typebox/value";
import {
  PokemonSpeciesListResponseSchema,
  type PokemonSpeciesListResponse,
} from "@aglaea/contract";
import {
  PokemonFormDetailResponseSchema,
  type PokemonFormDetailResponse,
} from "@aglaea/contract/pokemon";

const payload: PokemonSpeciesListResponse = {
  data: [],
  total: 0,
  limit: 20,
  offset: 0,
};

if (!Value.Check(PokemonSpeciesListResponseSchema, payload)) {
  throw new Error("invalid species list response");
}
```

### Include names

Herta species/form endpoints accept an `include` query key that toggles relation embedding. The package exposes the accepted names and a wildcard for "all relations".

```ts
import {
  PokemonRelationIncludeNames,
  PokemonIncludeNames,
  PokemonIncludeNameSchema,
  PokemonRelationIncludeNameSchema,
  type PokemonIncludeName,
  type PokemonRelationIncludeName,
} from "@aglaea/contract";

// `*` is a valid include name and means all relation flags on.
// `PokemonRelationIncludeNames` omits the wildcard.
const include = "forms" satisfies PokemonIncludeName;
```

- `PokemonRelationIncludeNames` — readonly tuple of the relation flag names Herta recognizes: `forms`, `types`, `abilities`, `moves`, `labels`, `aspects`, `drops`, `eggGroups`, `experienceGroup`, `hitboxes`, `lighting`, `riding`, `behaviour`, `spawns`.
- `PokemonIncludeNames` — the relation names plus `*`.
- `PokemonRelationIncludeNameSchema` / `PokemonIncludeNameSchema` — TypeBox literal-union schemas for validating known include names. They reject unknown names so callers can fail fast when validating a single, parsed include name.

Herta itself accepts raw `include` strings, splits comma-separated values, and silently ignores unknown include names. That permissive parsing is modeled by the route query schemas below, not by the strict include-name schemas.

### Query schemas

The package exposes per-route TypeBox query schemas matching the search/list and detail query keys Herta parses today.

```ts
import {
  PokemonSpeciesListQuerySchema,
  type PokemonSpeciesListQuery,
  PokemonIncludeQuerySchema,
} from "@aglaea/contract";
import { Value } from "@sinclair/typebox/value";

// Herta accepts CSV include strings and ignores unknown names.
const query: PokemonSpeciesListQuery = {
  include: "forms,types",
  speciesIds: "1,2,3",
  hpMin: "50",
};

Value.Check(PokemonSpeciesListQuerySchema, query); // true
Value.Check(PokemonIncludeQuerySchema, "forms,unknown"); // true
```

Schemas exported:

- `PokemonSpeciesListQuerySchema` / `PokemonSpeciesListQuery`
- `PokemonFormListQuerySchema` / `PokemonFormListQuery`
- `PokemonSpeciesDetailQuerySchema` / `PokemonSpeciesDetailQuery`
- `PokemonFormDetailQuerySchema` / `PokemonFormDetailQuery`
- `PokemonIncludeQuerySchema` / `PokemonIncludeQuery` — the permissive `include` value shape (`string | string[]`) used by the route query schemas.

Route query schemas accept string, number, CSV, and array values for list-type fields, because HTTP query values arrive as strings while internal service calls may pass parsed numbers and arrays. Singular numeric fields accept number-or-string so HTTP string values validate. `include` accepts any string or string array so Herta's permissive parser (CSV split, unknown names ignored, empty string allowed) is modeled at the contract boundary. Unknown query keys are allowed (`additionalProperties: true`) so Herta can keep ignoring keys the contract does not yet model.

`PokemonSearchQueryKeys` is exported as a readonly tuple of the query keys Herta parses for species/form search.

### Spawn conditions

`PokemonSpawnConditionSchema` models the concrete shapes Herta emits for embedded spawn conditions:

- `weather`: `{ isRaining: boolean | null, isThundering: boolean | null } | null`
- `sky`: `{ canSeeSky: boolean | null, minSkyLight: number | null, maxSkyLight: number | null } | null`
- `position`: `{ minY: number | null, maxY: number | null } | null`
- `lure`: `{ minLureLevel: number | null, maxLureLevel: number | null } | null`

Each sub-shape is also exported as its own schema and type (`PokemonSpawnConditionWeatherSchema`, `PokemonSpawnConditionSkySchema`, `PokemonSpawnConditionPositionSchema`, `PokemonSpawnConditionLureSchema`).

### Move accuracy

`PokemonMoveRefSchema.accuracy` is `number | null`. Herta maps embedded move accuracy booleans to `null` before returning endpoint data, so boolean accuracy is rejected by the contract.

## Current first-slice notes

- Species images are nullable; presence is per species.
- Form images are nullable and deferred. Do not rely on form image refs yet.
- Drops are item refs `{ id, name }`; ranged drops keep `percentage`.
