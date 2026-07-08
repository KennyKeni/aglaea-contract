import test from "node:test";
import assert from "node:assert/strict";
import { Value } from "@sinclair/typebox/value";
import {
  PokemonFormListResponseSchema,
  PokemonFormListQuerySchema,
  PokemonFormDetailQuerySchema,
  PokemonIncludeNameSchema,
  PokemonIncludeNames,
  PokemonIncludeQuerySchema,
  PokemonRelationIncludeNameSchema,
  PokemonRelationIncludeNames,
  PokemonSearchQueryKeys,
  PokemonSpeciesListResponseSchema,
  PokemonSpeciesListQuerySchema,
  PokemonSpeciesDetailQuerySchema,
} from "@aglaea/contract";
import {
  PokemonDropRangeSchema,
  PokemonFormDetailResponseSchema,
  PokemonMoveRefSchema,
  PokemonSpawnConditionSchema,
  PokemonSpawnConditionLureSchema,
  PokemonSpawnConditionPositionSchema,
  PokemonSpawnConditionSkySchema,
  PokemonSpawnConditionWeatherSchema,
  PokemonSpeciesDetailResponseSchema,
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

test("package-name exports expose include and query contracts", () => {
  assert.equal(Array.isArray(PokemonRelationIncludeNames), true);
  assert.equal(Array.isArray(PokemonIncludeNames), true);
  assert.equal(PokemonIncludeNames.includes("*"), true);
  assert.equal(PokemonRelationIncludeNames.includes("*"), false);

  assert.equal(PokemonRelationIncludeNameSchema.anyOf.length > 0, true);
  assert.equal(PokemonIncludeNameSchema.anyOf.length > 0, true);

  assert.equal(PokemonSpeciesListQuerySchema.type, "object");
  assert.equal(PokemonFormListQuerySchema.type, "object");
  assert.equal(PokemonSpeciesDetailQuerySchema.type, "object");
  assert.equal(PokemonFormDetailQuerySchema.type, "object");
  assert.equal(PokemonIncludeQuerySchema.anyOf.length > 0, true);
});

test("PokemonSearchQueryKeys is exported and includes representative keys", () => {
  assert.equal(Array.isArray(PokemonSearchQueryKeys), true);
  assert.equal(PokemonSearchQueryKeys.length > 0, true);

  for (const key of [
    "include",
    "speciesIds",
    "hasForm.typeSlugs",
    "limit",
    "offset",
  ]) {
    assert.equal(PokemonSearchQueryKeys.includes(key), true);
  }
});

test("subpath exports expose Pokemon detail response schemas", () => {
  assert.equal(PokemonFormDetailResponseSchema.type, "object");
  assert.equal(PokemonSpeciesDetailResponseSchema.type, "object");
});

test("include name schema accepts known names and the wildcard", () => {
  for (const name of PokemonRelationIncludeNames) {
    assert.equal(Value.Check(PokemonRelationIncludeNameSchema, name), true);
  }
  for (const name of PokemonIncludeNames) {
    assert.equal(Value.Check(PokemonIncludeNameSchema, name), true);
  }
  assert.equal(Value.Check(PokemonIncludeNameSchema, "*"), true);

  assert.equal(Value.Check(PokemonRelationIncludeNameSchema, "*"), false);
  assert.equal(Value.Check(PokemonIncludeNameSchema, "unknownRelation"), false);
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

test("list query schemas accept string, number, CSV, and array values", () => {
  const stringNameQuery = { name: "bulbasaur" };
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, stringNameQuery),
    true,
  );

  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { name: ["a", "b"] }),
    false,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { name: 1 }),
    false,
  );

  const numberQuery = { speciesIds: 1 };
  assert.equal(Value.Check(PokemonSpeciesListQuerySchema, numberQuery), true);

  const csvQuery = { speciesIds: "1,2,3" };
  assert.equal(Value.Check(PokemonSpeciesListQuerySchema, csvQuery), true);

  const arrayQuery = { speciesIds: [1, 2, 3] };
  assert.equal(Value.Check(PokemonSpeciesListQuerySchema, arrayQuery), true);

  const stringArrayQuery = { speciesIds: ["1", "2"] };
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, stringArrayQuery),
    true,
  );

  const slugCsvQuery = { speciesSlugs: "bulbasaur,ivysaur" };
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, slugCsvQuery),
    true,
  );

  const slugArrayQuery = { speciesSlugs: ["bulbasaur", "ivysaur"] };
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, slugArrayQuery),
    true,
  );

  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { speciesSlugs: 1 }),
    false,
  );

  const generationCsvQuery = { generations: "1,2,3" };
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, generationCsvQuery),
    true,
  );

  const generationArrayQuery = { generations: [1, 2, 3] };
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, generationArrayQuery),
    true,
  );

  const statFloatQuery = { hpMin: 50.5, hpMax: 60 };
  assert.equal(Value.Check(PokemonSpeciesListQuerySchema, statFloatQuery), true);

  const nestedQuery = { "hasForm.typeIds": [1, 2] };
  assert.equal(Value.Check(PokemonSpeciesListQuerySchema, nestedQuery), true);

  const paginationQuery = { limit: 20, offset: 0 };
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, paginationQuery),
    true,
  );
});

test("slug alias fields reject numeric values and accept string or string[]", () => {
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { speciesSlug: 1 }),
    false,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { speciesSlug: "bulbasaur" }),
    true,
  );

  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { species: 1 }),
    false,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { species: "bulbasaur" }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { species: ["bulbasaur", "ivysaur"] }),
    true,
  );

  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { "hasForm.type": 1 }),
    false,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { "hasForm.type": "grass" }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { "hasForm.type": ["grass", "poison"] }),
    true,
  );

  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { "hasForm.ability": 1 }),
    false,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { "hasForm.ability": ["overgrow", "chlorophyll"] }),
    true,
  );

  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { "hasForm.move": 1 }),
    false,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { "hasForm.move": "tackle" }),
    true,
  );

  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { "hasForm.label": 1 }),
    false,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { "hasForm.dropItem": 1 }),
    false,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { "hasForm.biome": 1 }),
    false,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { "hasForm.biomeTag": 1 }),
    false,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { "hasForm.spawnBucket": 1 }),
    false,
  );

  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { "hasForm.typeId": 1 }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { "hasForm.typeIds": [1, 2] }),
    true,
  );
});

test("singular numeric query fields accept HTTP string values", () => {
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { generation: "1" }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { formGeneration: "2" }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { hpMin: "50" }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { heightMax: "12.5" }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { limit: "20", offset: "0" }),
    true,
  );

  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { generation: 1 }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { hpMin: 50 }),
    true,
  );
});

test("route query schemas accept Herta's permissive include values", () => {
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { include: "forms,types" }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { include: "unknown" }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { include: "" }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { include: ["forms", "unknown"] }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { include: "*" }),
    true,
  );

  assert.equal(Value.Check(PokemonIncludeQuerySchema, "forms,types"), true);
  assert.equal(Value.Check(PokemonIncludeQuerySchema, "unknown"), true);
  assert.equal(Value.Check(PokemonIncludeQuerySchema, ""), true);
  assert.equal(Value.Check(PokemonIncludeQuerySchema, ["forms", "unknown"]), true);

  assert.equal(Value.Check(PokemonIncludeQuerySchema, 5), false);
  assert.equal(Value.Check(PokemonIncludeQuerySchema, [1, 2]), false);
});

test("list query schemas stay permissive for unknown query keys", () => {
  assert.equal(
    Value.Check(PokemonSpeciesListQuerySchema, { unknownKey: "ignored" }),
    true,
  );
  assert.equal(
    Value.Check(PokemonFormListQuerySchema, { futureFlag: 42 }),
    true,
  );
});

test("detail query schemas accept permissive include and unknown keys", () => {
  assert.equal(
    Value.Check(PokemonSpeciesDetailQuerySchema, { include: "*" }),
    true,
  );
  assert.equal(
    Value.Check(PokemonFormDetailQuerySchema, { include: ["forms", "moves"] }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpeciesDetailQuerySchema, { include: "nope" }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpeciesDetailQuerySchema, { include: "forms,unknown" }),
    true,
  );
  assert.equal(
    Value.Check(PokemonFormDetailQuerySchema, { include: "" }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpeciesDetailQuerySchema, { random: "value" }),
    true,
  );
});

const baseMoveRef = {
  id: 33,
  name: "tackle",
  slug: "tackle",
  type: { id: 1, name: "normal", slug: "normal" },
  category: { id: 1, name: "physical", slug: "physical" },
  power: 40,
  pp: 35,
};

test("PokemonMoveRefSchema accepts number and null accuracy", () => {
  assert.equal(
    Value.Check(PokemonMoveRefSchema, { ...baseMoveRef, accuracy: 100 }),
    true,
  );
  assert.equal(
    Value.Check(PokemonMoveRefSchema, { ...baseMoveRef, accuracy: null }),
    true,
  );
});

test("PokemonMoveRefSchema rejects boolean accuracy", () => {
  assert.equal(
    Value.Check(PokemonMoveRefSchema, { ...baseMoveRef, accuracy: true }),
    false,
  );
  assert.equal(
    Value.Check(PokemonMoveRefSchema, { ...baseMoveRef, accuracy: false }),
    false,
  );
});

const baseSpawnCondition = {
  id: 1,
  type: "surface",
  multiplier: 1.5,
  biomes: [],
  biomeTags: [],
  timeRanges: [],
  moonPhases: [],
};

test("PokemonSpawnConditionSchema accepts concrete weather/sky/position/lure shapes", () => {
  const condition = {
    ...baseSpawnCondition,
    weather: { isRaining: true, isThundering: null },
    sky: { canSeeSky: null, minSkyLight: 0, maxSkyLight: 15 },
    position: { minY: 60, maxY: null },
    lure: { minLureLevel: 1, maxLureLevel: 4 },
  };
  assert.equal(Value.Check(PokemonSpawnConditionSchema, condition), true);
});

test("PokemonSpawnConditionSchema accepts null for each condition field", () => {
  const condition = {
    ...baseSpawnCondition,
    weather: null,
    sky: null,
    position: null,
    lure: null,
  };
  assert.equal(Value.Check(PokemonSpawnConditionSchema, condition), true);
});

test("PokemonSpawnConditionSchema rejects arbitrary objects for condition fields", () => {
  assert.equal(
    Value.Check(PokemonSpawnConditionWeatherSchema, { name: "rain" }),
    false,
  );
  assert.equal(
    Value.Check(PokemonSpawnConditionSkySchema, { foo: 1 }),
    false,
  );
  assert.equal(
    Value.Check(PokemonSpawnConditionPositionSchema, { minY: "60" }),
    false,
  );
  assert.equal(
    Value.Check(PokemonSpawnConditionLureSchema, { minLureLevel: "1" }),
    false,
  );

  assert.equal(
    Value.Check(PokemonSpawnConditionSchema, {
      ...baseSpawnCondition,
      weather: { name: "rain" },
    }),
    false,
  );
});

test("concrete spawn condition sub-schemas validate their intended shapes", () => {
  assert.equal(
    Value.Check(PokemonSpawnConditionWeatherSchema, {
      isRaining: true,
      isThundering: false,
    }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpawnConditionSkySchema, {
      canSeeSky: null,
      minSkyLight: 4,
      maxSkyLight: 15,
    }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpawnConditionPositionSchema, {
      minY: 60,
      maxY: 320,
    }),
    true,
  );
  assert.equal(
    Value.Check(PokemonSpawnConditionLureSchema, {
      minLureLevel: 1,
      maxLureLevel: 4,
    }),
    true,
  );
});
