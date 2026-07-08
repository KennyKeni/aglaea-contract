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
