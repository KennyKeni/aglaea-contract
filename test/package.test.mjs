import test from "node:test";
import assert from "node:assert/strict";
import { Value } from "@sinclair/typebox/value";
import {
  PokemonFormLightingSchema as RootPokemonFormLightingSchema,
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
  PokemonFormDetailResponseSchema as RootPokemonFormDetailResponseSchema,
  PokemonSpawnReferenceSchema as RootPokemonSpawnReferenceSchema,
  PokemonSpeciesDetailResponseSchema as RootPokemonSpeciesDetailResponseSchema,
  AbilityListResponseSchema as RootAbilityListResponseSchema,
  MoveDetailResponseSchema as RootMoveDetailResponseSchema,
  ItemListResponseSchema as RootItemListResponseSchema,
} from "@aglaea/contract";
import {
  PokemonDropRangeSchema,
  PokemonFormDetailResponseSchema,
  PokemonFormDetailResponseSchema as PokemonFormDetailResponseSchemaFromPokemon,
  PokemonFormLightingSchema,
  PokemonMoveRefSchema,
  PokemonSpawnConditionSchema,
  PokemonSpawnConditionLureSchema,
  PokemonSpawnConditionPositionSchema,
  PokemonSpawnConditionSkySchema,
  PokemonSpawnConditionWeatherSchema,
  PokemonSpawnReferenceSchema,
  PokemonSpawnSchema,
  PokemonSpeciesDetailResponseSchema,
  PokemonSpeciesDetailResponseSchema as PokemonSpeciesDetailResponseSchemaFromPokemon,
} from "@aglaea/contract/pokemon";
import {
  AbilityDetailResponseSchema,
  AbilityListResponseSchema,
  AbilitySchema,
  ItemDetailResponseSchema,
  ItemListResponseSchema,
  ItemSchema,
  MoveDetailResponseSchema,
  MoveListResponseSchema,
  MoveSchema,
} from "@aglaea/contract/read-domain";

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

const abilityListItem = {
  id: 4,
  name: "Battle Armor",
  slug: "battle-armor",
  desc: null,
  shortDesc: "This Pokemon cannot be struck by a critical hit.",
  flags: [],
  forms: [],
};

const abilityDetail = {
  id: 4,
  name: "Battle Armor",
  slug: "battle-armor",
  desc: null,
  shortDesc: "This Pokemon cannot be struck by a critical hit.",
  flags: [
    {
      id: 1,
      name: "Breakable",
      slug: "breakable",
      description:
        "Can be suppressed by Mold Breaker and similar abilities.",
    },
  ],
  forms: [
    { id: 208, name: "Kabuto", slug: "kabuto", speciesId: 140 },
  ],
};

const moveListItem = {
  id: 1,
  name: "Pound",
  slug: "pound",
  desc: null,
  shortDesc: "No additional effect.",
  type: { id: 13, name: "Normal", slug: "normal" },
  category: {
    id: 1,
    slug: "physical",
    name: "Physical",
    description: "Move deals damage with the Attack and Defense stats.",
  },
  target: {
    id: 12,
    name: "Normal",
    slug: "normal",
    description: "Targets a single adjacent Pokemon (default).",
  },
  power: 40,
  accuracy: 100,
  pp: 35,
  priority: 0,
  critRatio: null,
  minHits: null,
  maxHits: null,
  drainPercent: null,
  healPercent: null,
  recoilPercent: null,
  flags: [],
  boosts: [],
  effects: [],
  maxPower: null,
  zData: null,
  gmaxSpecies: [],
  forms: [],
};

const moveDetail = {
  id: 14,
  name: "Swords Dance",
  slug: "swords-dance",
  desc: "Raises the user's Attack by 2 stages.",
  shortDesc: "Raises the user's Attack by 2.",
  type: { id: 13, name: "Normal", slug: "normal" },
  category: {
    id: 3,
    slug: "status",
    name: "Status",
    description: "Move does not deal damage.",
  },
  target: {
    id: 15,
    name: "Self",
    slug: "self",
    description: "Targets the user only.",
  },
  power: 0,
  accuracy: true,
  pp: 20,
  priority: 0,
  critRatio: null,
  minHits: null,
  maxHits: null,
  drainPercent: null,
  healPercent: null,
  recoilPercent: null,
  flags: [],
  boosts: [
    {
      stat: { id: 2, slug: "attack", name: "Attack" },
      stages: 2,
      isSelf: true,
    },
  ],
  effects: [],
  maxPower: null,
  zData: {
    zPower: null,
    zEffect: "clearnegativeboost",
    zCrystal: null,
    isZExclusive: false,
  },
  gmaxSpecies: [],
  forms: [],
};

const itemListItem = {
  id: 2,
  slug: "ability-capsule",
  name: "Ability Capsule",
  num: null,
  desc: null,
  shortDesc: null,
  generation: null,
  namespace: { id: 8, slug: "cobblemon", name: "Cobblemon" },
  implemented: true,
  boosts: [],
  flags: [],
  tags: [{ id: 1, slug: "ability-changers", name: "Ability Changers" }],
  recipes: [],
};

const itemDetail = {
  id: 5,
  slug: "absorb-bulb",
  name: "Absorb Bulb",
  num: 545,
  desc: null,
  shortDesc:
    "Raises holder's Sp. Atk by 1 stage if hit by a Water-type attack. Single use.",
  generation: 5,
  namespace: { id: 8, slug: "cobblemon", name: "Cobblemon" },
  implemented: true,
  boosts: [
    {
      stat: { id: 4, slug: "special-attack", name: "Special Attack" },
      stages: 1,
    },
  ],
  flags: [],
  tags: [{ id: 70, slug: "held-is-held-item", name: "Held > Is Held Item" }],
  recipes: [],
};

const paginated = (data, total, limit = 20, offset = 0) => ({
  data,
  total,
  limit,
  offset,
});

test("read-domain subpath exports ability, move, and item list/detail schemas", () => {
  assert.equal(AbilitySchema.type, "object");
  assert.equal(MoveSchema.type, "object");
  assert.equal(ItemSchema.type, "object");

  assert.equal(AbilityListResponseSchema.type, "object");
  assert.equal(AbilityDetailResponseSchema.type, "object");
  assert.equal(MoveListResponseSchema.type, "object");
  assert.equal(MoveDetailResponseSchema.type, "object");
  assert.equal(ItemListResponseSchema.type, "object");
  assert.equal(ItemDetailResponseSchema.type, "object");

  assert.equal(RootAbilityListResponseSchema.type, "object");
  assert.equal(RootMoveDetailResponseSchema.type, "object");
  assert.equal(RootItemListResponseSchema.type, "object");
});

test("AbilityListResponseSchema and AbilityDetailResponseSchema accept retained payloads", () => {
  assert.equal(
    Value.Check(AbilityListResponseSchema, paginated([abilityListItem], 1)),
    true,
  );
  assert.equal(
    Value.Check(AbilityListResponseSchema, {
      data: [],
      total: 0,
      limit: 20,
      offset: 0,
    }),
    true,
  );
  assert.equal(Value.Check(AbilityDetailResponseSchema, abilityDetail), true);
});

test("MoveListResponseSchema and MoveDetailResponseSchema accept retained payloads", () => {
  assert.equal(
    Value.Check(MoveListResponseSchema, paginated([moveListItem], 1, 1, 0)),
    true,
  );
  assert.equal(Value.Check(MoveDetailResponseSchema, moveDetail), true);
});

test("ItemListResponseSchema and ItemDetailResponseSchema accept retained payloads", () => {
  assert.equal(
    Value.Check(ItemListResponseSchema, paginated([itemListItem], 1)),
    true,
  );
  assert.equal(Value.Check(ItemDetailResponseSchema, itemDetail), true);
});

test("MoveSchema accepts number, boolean, and null accuracy", () => {
  assert.equal(
    Value.Check(MoveSchema, { ...moveDetail, accuracy: 100 }),
    true,
  );
  assert.equal(
    Value.Check(MoveSchema, { ...moveDetail, accuracy: 99.5 }),
    true,
  );
  assert.equal(
    Value.Check(MoveSchema, { ...moveDetail, accuracy: true }),
    true,
  );
  assert.equal(
    Value.Check(MoveSchema, { ...moveDetail, accuracy: false }),
    true,
  );
  assert.equal(
    Value.Check(MoveSchema, { ...moveDetail, accuracy: null }),
    true,
  );
});

test("MoveSchema rejects string accuracy such as 'true'", () => {
  assert.equal(
    Value.Check(MoveSchema, { ...moveDetail, accuracy: "true" }),
    false,
  );
});

test("ItemSchema rejects string implemented such as 'yes'", () => {
  assert.equal(
    Value.Check(ItemSchema, { ...itemDetail, implemented: "yes" }),
    false,
  );
  assert.equal(
    Value.Check(ItemSchema, { ...itemDetail, implemented: false }),
    true,
  );
});

test("AbilitySchema rejects a form reference missing speciesId when forms are present", () => {
  const brokenForm = { id: 208, name: "Kabuto", slug: "kabuto" };
  assert.equal(
    Value.Check(AbilitySchema, { ...abilityDetail, forms: [brokenForm] }),
    false,
  );

  const validForm = { ...brokenForm, speciesId: 140 };
  assert.equal(
    Value.Check(AbilitySchema, { ...abilityDetail, forms: [validForm] }),
    true,
  );
});

test("PokemonSpawnReferenceSchema now requires slug on embedded spawn refs", () => {
  const validRef = { id: 1, name: "plains", slug: "plains" };
  assert.equal(Value.Check(PokemonSpawnReferenceSchema, validRef), true);

  const { slug, ...refWithoutSlug } = validRef;
  assert.equal(Value.Check(PokemonSpawnReferenceSchema, refWithoutSlug), false);
});

test("root and @aglaea/contract/pokemon expose the enriched Pokemon detail schemas", () => {
  assert.equal(
    RootPokemonFormDetailResponseSchema,
    PokemonFormDetailResponseSchemaFromPokemon,
  );
  assert.equal(
    RootPokemonSpeciesDetailResponseSchema,
    PokemonSpeciesDetailResponseSchemaFromPokemon,
  );
  assert.equal(
    RootPokemonSpawnReferenceSchema,
    PokemonSpawnReferenceSchema,
  );

  assert.equal(Value.Check(PokemonFormDetailResponseSchema, {}), false);
  assert.equal(Value.Check(PokemonSpeciesDetailResponseSchema, {}), false);
});

const aspectChoice = {
  id: 1,
  slug: "gender",
  name: "Gender",
  value: "male",
};

const aspectRef = { id: 1, name: "Male", slug: "male" };

const dropPercentage = {
  item: { id: 109, name: "glow-ink-sac" },
  percentage: 10,
};

const dropRange = {
  item: { id: 109, name: "glow-ink-sac" },
  percentage: 10,
  quantityMin: 1,
  quantityMax: 3,
};

const namedSpawnRef = { id: 1, name: "plains", slug: "plains" };

const namedBiomeTagRef = { id: 2, name: "overworld", slug: "overworld" };
const namedTimeRangeRef = { id: 3, name: "day", slug: "day" };
const namedMoonPhaseRef = { id: 4, name: "full", slug: "full" };

const spawnCondition = {
  id: 1,
  type: "surface",
  multiplier: 1.5,
  biomes: [namedSpawnRef],
  biomeTags: [namedBiomeTagRef],
  timeRanges: [namedTimeRangeRef],
  moonPhases: [namedMoonPhaseRef],
  weather: { isRaining: false, isThundering: null },
  sky: { canSeeSky: true, minSkyLight: 8, maxSkyLight: 15 },
  position: { minY: 60, maxY: null },
  lure: null,
};

const spawn = {
  id: 1,
  bucket: namedSpawnRef,
  positionType: namedSpawnRef,
  weight: 0.5,
  levelMin: 5,
  levelMax: 15,
  conditions: [spawnCondition],
};

const formMove = {
  move: {
    ...baseMoveRef,
    accuracy: 100,
  },
  method: { id: 1, name: "Level Up", slug: "level-up" },
  level: 1,
};

const formType = {
  type: { id: 12, name: "Grass", slug: "grass" },
  slot: 1,
};

const formAbility = {
  ability: { id: 65, name: "Overgrow", slug: "overgrow" },
  slot: { id: 1, name: "Ability 1", slug: "ability-1" },
};

const enrichedFormDetail = {
  id: 1,
  name: "Normal",
  fullName: "Bulbasaur",
  slug: "bulbasaur",
  description: "A seed Pokemon.",
  generation: 1,
  image: { id: "bulbasaur", url: "https://example.com/bulbasaur.png" },
  height: 0.7,
  weight: 6.9,
  overrides: null,
  baseHp: 45,
  baseAttack: 49,
  baseDefence: 49,
  baseSpecialAttack: 65,
  baseSpecialDefence: 65,
  baseSpeed: 45,
  baseExperienceYield: 64,
  evHp: 1,
  evAttack: 0,
  evDefence: 0,
  evSpecialAttack: 0,
  evSpecialDefence: 0,
  evSpeed: 0,
  labels: [{ id: 1, name: "Starter", slug: "starter" }],
  aspectChoices: [aspectChoice],
  types: [formType],
  abilities: [formAbility],
  moves: [formMove],
  hitbox: { width: 0.7, height: 0.7, fixed: false },
  lighting: null,
  drops: {
    amount: 1,
    percentages: [dropPercentage],
    ranges: [dropRange],
  },
  aspectCombos: [{ comboIndex: 0, aspects: [aspectRef] }],
  behaviour: { data: { custom: "opaque" } },
  spawns: [spawn],
  species: {
    id: 1,
    name: "Bulbasaur",
    slug: "bulbasaur",
    description: "A seed Pokemon.",
    generation: 1,
    catchRate: 45,
    baseFriendship: 70,
    eggCycles: 20,
    maleRatio: 0.875,
    baseScale: 1.0,
    image: { id: "bulbasaur", url: "https://example.com/bulbasaur.png" },
    experienceGroup: {
      id: 1,
      slug: "medium-slow",
      name: "Medium Slow",
      formula: "5n^3/2 - 100n^2 + 750n",
    },
    eggGroups: [
      { id: 1, name: "Monster", slug: "monster" },
      { id: 2, name: "Grass", slug: "grass" },
    ],
    hitbox: { width: 0.7, height: 0.7, fixed: false },
    lighting: { lightLevel: 0, liquidGlowMode: null },
    riding: null,
  },
};

test("PokemonFormDetailResponseSchema accepts an enriched form detail payload", () => {
  assert.equal(
    Value.Check(PokemonFormDetailResponseSchema, enrichedFormDetail),
    true,
  );
});

test("PokemonFormDetailResponseSchema rejects spawn refs missing slug", () => {
  const { slug, ...refWithoutSlug } = namedSpawnRef;
  const brokenSpawn = { ...spawn, bucket: refWithoutSlug };
  const brokenForm = {
    ...enrichedFormDetail,
    spawns: [brokenSpawn],
  };
  assert.equal(
    Value.Check(PokemonFormDetailResponseSchema, brokenForm),
    false,
  );
});

test("PokemonFormDetailResponseSchema accepts null behaviour/drops/hitbox/image", () => {
  const minimalForm = {
    ...enrichedFormDetail,
    image: null,
    hitbox: null,
    drops: null,
    behaviour: null,
  };
  assert.equal(Value.Check(PokemonFormDetailResponseSchema, minimalForm), true);
});

const baseSpecies = {
  id: 1,
  name: "Bulbasaur",
  slug: "bulbasaur",
  description: "A seed Pokemon.",
  generation: 1,
  catchRate: 45,
  baseFriendship: 70,
  eggCycles: 20,
  maleRatio: 0.875,
  baseScale: 1.0,
  image: { id: "bulbasaur", url: "https://example.com/bulbasaur.png" },
  experienceGroup: {
    id: 1,
    slug: "medium-slow",
    name: "Medium Slow",
    formula: "5n^3/2 - 100n^2 + 750n",
  },
  eggGroups: [
    { id: 1, name: "Monster", slug: "monster" },
    { id: 2, name: "Grass", slug: "grass" },
  ],
  hitbox: { width: 0.7, height: 0.7, fixed: false },
  lighting: { lightLevel: 0, liquidGlowMode: null },
  riding: null,
};

const formForSpeciesDetail = ({ species, ...form }) => form;
const primarySpeciesForm = formForSpeciesDetail(enrichedFormDetail);

const alternateForm = {
  ...primarySpeciesForm,
  id: 2,
  name: "Mega",
  fullName: "Mega Bulbasaur",
  slug: "mega-bulbasaur",
};

test("PokemonSpeciesDetailResponseSchema accepts alternate forms", () => {
  const speciesDetail = {
    ...baseSpecies,
    forms: [primarySpeciesForm, alternateForm],
  };
  assert.equal(
    Value.Check(PokemonSpeciesDetailResponseSchema, speciesDetail),
    true,
  );
});

test("PokemonSpeciesDetailResponseSchema accepts nullable gameplay and visual sections", () => {
  const speciesDetail = {
    ...baseSpecies,
    image: null,
    hitbox: null,
    lighting: null,
    riding: { data: { custom: "opaque" } },
    forms: [],
  };
  assert.equal(
    Value.Check(PokemonSpeciesDetailResponseSchema, speciesDetail),
    true,
  );
});

test("PokemonSpeciesDetailResponseSchema requires a riding data envelope", () => {
  const speciesDetail = {
    ...baseSpecies,
    riding: { unexpectedOnly: true },
    forms: [],
  };
  assert.equal(
    Value.Check(PokemonSpeciesDetailResponseSchema, speciesDetail),
    false,
  );
});

test("PokemonSpawnSchema validates a full spawn with named refs", () => {
  assert.equal(Value.Check(PokemonSpawnSchema, spawn), true);
  assert.equal(
    Value.Check(PokemonSpawnSchema, {
      ...spawn,
      bucket: { id: 1, name: "plains" },
    }),
    false,
  );
});

test("PokemonSpawnConditionSchema rejects condition refs missing slug", () => {
  assert.equal(Value.Check(PokemonSpawnConditionSchema, spawnCondition), true);
  assert.equal(
    Value.Check(PokemonSpawnConditionSchema, {
      ...spawnCondition,
      biomes: [{ id: 1, name: "plains" }],
    }),
    false,
  );
});

test("PokemonFormLightingSchema is exported from root and ./pokemon and mirrors species lighting shape", () => {
  assert.equal(RootPokemonFormLightingSchema, PokemonFormLightingSchema);
  assert.equal(PokemonFormLightingSchema.type, "object");

  assert.equal(
    Value.Check(PokemonFormLightingSchema, {
      lightLevel: 14,
      liquidGlowMode: "land",
    }),
    true,
  );
  assert.equal(
    Value.Check(PokemonFormLightingSchema, {
      lightLevel: 0,
      liquidGlowMode: null,
    }),
    true,
  );

  assert.equal(
    Value.Check(PokemonFormLightingSchema, { liquidGlowMode: "land" }),
    false,
  );
  assert.equal(
    Value.Check(PokemonFormLightingSchema, {
      lightLevel: "14",
      liquidGlowMode: "land",
    }),
    false,
  );
});

test("PokemonFormDetailResponseSchema accepts an enriched form detail payload with form lighting", () => {
  const formWithLighting = {
    ...enrichedFormDetail,
    lighting: { lightLevel: 14, liquidGlowMode: "land" },
  };
  assert.equal(
    Value.Check(PokemonFormDetailResponseSchema, formWithLighting),
    true,
  );
});

test("PokemonFormDetailResponseSchema accepts a minimal form detail payload with lighting null", () => {
  const minimalForm = {
    ...enrichedFormDetail,
    image: null,
    hitbox: null,
    drops: null,
    behaviour: null,
    lighting: null,
  };
  assert.equal(Value.Check(PokemonFormDetailResponseSchema, minimalForm), true);
});

test("PokemonFormDetailResponseSchema rejects invalid form lighting", () => {
  const missingLightLevel = {
    ...enrichedFormDetail,
    lighting: { liquidGlowMode: "land" },
  };
  assert.equal(
    Value.Check(PokemonFormDetailResponseSchema, missingLightLevel),
    false,
  );

  const nonNumberLightLevel = {
    ...enrichedFormDetail,
    lighting: { lightLevel: "14", liquidGlowMode: "land" },
  };
  assert.equal(
    Value.Check(PokemonFormDetailResponseSchema, nonNumberLightLevel),
    false,
  );
});
