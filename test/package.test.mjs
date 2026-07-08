import test from "node:test";
import assert from "node:assert/strict";
import { Value } from "@sinclair/typebox/value";
import {
  PokemonFormListResponseSchema,
  PokemonSpeciesListResponseSchema,
} from "@aglaea/contract";
import {
  PokemonSpeciesDetailResponseSchema,
  PokemonDropRangeSchema,
} from "@aglaea/contract/pokemon";

test("package-name exports expose Pokemon response schemas", () => {
  assert.equal(
    Value.Check(PokemonSpeciesListResponseSchema, {
      data: [],
      total: 0,
      limit: 20,
      offset: 0,
    }),
    true,
  );

  assert.equal(
    Value.Check(PokemonFormListResponseSchema, {
      data: [],
      total: 0,
      limit: 20,
      offset: 0,
    }),
    true,
  );

  assert.equal(PokemonSpeciesDetailResponseSchema.type, "object");
});

test("PokemonDropRangeSchema requires percentage for ranged drops", () => {
  const rangeWithPercentage = {
    item: { id: 109, name: "glow-ink-sac" },
    percentage: 10,
    quantityMin: 1,
    quantityMax: 3,
  };

  assert.equal(
    Value.Check(PokemonDropRangeSchema, rangeWithPercentage),
    true,
  );

  const { percentage, ...rangeWithoutPercentage } = rangeWithPercentage;
  assert.equal(
    Value.Check(PokemonDropRangeSchema, rangeWithoutPercentage),
    false,
  );
});
