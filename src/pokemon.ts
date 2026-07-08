import { Type, type Static, type TSchema } from "@sinclair/typebox";

const Nullable = <TSchemaValue extends TSchema>(schema: TSchemaValue) =>
  Type.Union([schema, Type.Null()]);

export const PokemonImageRefSchema = Type.Object({
  id: Type.String(),
  url: Type.String(),
});

export type PokemonImageRef = Static<typeof PokemonImageRefSchema>;

export const PokemonNamedRefSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  slug: Type.String(),
});

export type PokemonNamedRef = Static<typeof PokemonNamedRefSchema>;

export const PokemonTypeRefSchema = PokemonNamedRefSchema;
export type PokemonTypeRef = Static<typeof PokemonTypeRefSchema>;

export const PokemonAbilityRefSchema = PokemonNamedRefSchema;
export type PokemonAbilityRef = Static<typeof PokemonAbilityRefSchema>;

export const PokemonMoveCategoryRefSchema = PokemonNamedRefSchema;
export type PokemonMoveCategoryRef = Static<typeof PokemonMoveCategoryRefSchema>;

export const PokemonMoveRefSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  slug: Type.String(),
  type: PokemonTypeRefSchema,
  category: PokemonMoveCategoryRefSchema,
  power: Nullable(Type.Integer()),
  accuracy: Nullable(Type.Number()),
  pp: Nullable(Type.Integer()),
});

export type PokemonMoveRef = Static<typeof PokemonMoveRefSchema>;

export const PokemonAspectRefSchema = PokemonNamedRefSchema;
export type PokemonAspectRef = Static<typeof PokemonAspectRefSchema>;

export const PokemonAspectChoiceRefSchema = Type.Object({
  id: Type.Integer(),
  slug: Type.String(),
  name: Type.String(),
  value: Type.String(),
});

export type PokemonAspectChoiceRef = Static<typeof PokemonAspectChoiceRefSchema>;

export const PokemonExperienceGroupSchema = Type.Object({
  id: Type.Integer(),
  slug: Type.String(),
  name: Type.String(),
  formula: Type.String(),
});

export type PokemonExperienceGroup = Static<typeof PokemonExperienceGroupSchema>;

export const PokemonEggGroupSchema = PokemonNamedRefSchema;
export type PokemonEggGroup = Static<typeof PokemonEggGroupSchema>;

export const PokemonSpeciesHitboxSchema = Type.Object({
  width: Type.Number(),
  height: Type.Number(),
  fixed: Type.Boolean(),
});

export type PokemonSpeciesHitbox = Static<typeof PokemonSpeciesHitboxSchema>;

export const PokemonSpeciesLightingSchema = Type.Object({
  lightLevel: Type.Integer(),
  liquidGlowMode: Nullable(Type.String()),
});

export type PokemonSpeciesLighting = Static<typeof PokemonSpeciesLightingSchema>;

export const PokemonSpeciesRidingSchema = Type.Object({
  data: Type.Unknown(),
});

export type PokemonSpeciesRiding = Static<typeof PokemonSpeciesRidingSchema>;

export const PokemonSpeciesSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  slug: Type.String(),
  description: Nullable(Type.String()),
  generation: Type.Integer(),
  catchRate: Type.Integer(),
  baseFriendship: Type.Integer(),
  eggCycles: Type.Integer(),
  maleRatio: Nullable(Type.Number()),
  baseScale: Nullable(Type.Number()),
  image: Nullable(PokemonImageRefSchema),
  experienceGroup: Nullable(PokemonExperienceGroupSchema),
  eggGroups: Type.Array(PokemonEggGroupSchema),
  hitbox: Nullable(PokemonSpeciesHitboxSchema),
  lighting: Nullable(PokemonSpeciesLightingSchema),
  riding: Nullable(PokemonSpeciesRidingSchema),
});

export type PokemonSpecies = Static<typeof PokemonSpeciesSchema>;

export const PokemonFormOverridesSchema = Type.Object({
  catchRate: Type.Optional(Type.Integer()),
  baseFriendship: Type.Optional(Type.Integer()),
  eggCycles: Type.Optional(Type.Integer()),
  maleRatio: Type.Optional(Nullable(Type.Number())),
  baseScale: Type.Optional(Nullable(Type.Number())),
});

export type PokemonFormOverrides = Static<typeof PokemonFormOverridesSchema>;

export const PokemonAbilitySlotRefSchema = PokemonNamedRefSchema;
export type PokemonAbilitySlotRef = Static<typeof PokemonAbilitySlotRefSchema>;

export const PokemonFormAbilitySchema = Type.Object({
  ability: PokemonAbilityRefSchema,
  slot: PokemonAbilitySlotRefSchema,
});

export type PokemonFormAbility = Static<typeof PokemonFormAbilitySchema>;

export const PokemonFormTypeSchema = Type.Object({
  type: PokemonTypeRefSchema,
  slot: Type.Integer(),
});

export type PokemonFormType = Static<typeof PokemonFormTypeSchema>;

export const PokemonMoveLearnMethodRefSchema = PokemonNamedRefSchema;
export type PokemonMoveLearnMethodRef = Static<typeof PokemonMoveLearnMethodRefSchema>;

export const PokemonFormMoveSchema = Type.Object({
  move: PokemonMoveRefSchema,
  method: PokemonMoveLearnMethodRefSchema,
  level: Nullable(Type.Integer()),
});

export type PokemonFormMove = Static<typeof PokemonFormMoveSchema>;

export const PokemonLabelSchema = PokemonNamedRefSchema;
export type PokemonLabel = Static<typeof PokemonLabelSchema>;

export const PokemonItemRefSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
});

export type PokemonItemRef = Static<typeof PokemonItemRefSchema>;

export const PokemonDropPercentageSchema = Type.Object({
  item: PokemonItemRefSchema,
  percentage: Type.Number(),
});

export type PokemonDropPercentage = Static<typeof PokemonDropPercentageSchema>;

export const PokemonDropRangeSchema = Type.Object({
  item: PokemonItemRefSchema,
  percentage: Type.Number(),
  quantityMin: Type.Integer(),
  quantityMax: Type.Integer(),
});

export type PokemonDropRange = Static<typeof PokemonDropRangeSchema>;

export const PokemonFormDropsSchema = Type.Object({
  amount: Type.Integer(),
  percentages: Type.Array(PokemonDropPercentageSchema),
  ranges: Type.Array(PokemonDropRangeSchema),
});

export type PokemonFormDrops = Static<typeof PokemonFormDropsSchema>;

export const PokemonFormHitboxSchema = Type.Object({
  width: Type.Number(),
  height: Type.Number(),
  fixed: Type.Boolean(),
});

export type PokemonFormHitbox = Static<typeof PokemonFormHitboxSchema>;

export const PokemonFormAspectComboSchema = Type.Object({
  comboIndex: Type.Integer(),
  aspects: Type.Array(PokemonAspectRefSchema),
});

export type PokemonFormAspectCombo = Static<typeof PokemonFormAspectComboSchema>;

export const PokemonBehaviourSchema = Type.Object({
  data: Type.Unknown(),
});

export type PokemonBehaviour = Static<typeof PokemonBehaviourSchema>;

export const PokemonSpawnReferenceSchema = PokemonNamedRefSchema;

export type PokemonSpawnReference = Static<typeof PokemonSpawnReferenceSchema>;

export const PokemonSpawnConditionWeatherSchema = Type.Object({
  isRaining: Nullable(Type.Boolean()),
  isThundering: Nullable(Type.Boolean()),
});

export type PokemonSpawnConditionWeather = Static<
  typeof PokemonSpawnConditionWeatherSchema
>;

export const PokemonSpawnConditionSkySchema = Type.Object({
  canSeeSky: Nullable(Type.Boolean()),
  minSkyLight: Nullable(Type.Number()),
  maxSkyLight: Nullable(Type.Number()),
});

export type PokemonSpawnConditionSky = Static<
  typeof PokemonSpawnConditionSkySchema
>;

export const PokemonSpawnConditionPositionSchema = Type.Object({
  minY: Nullable(Type.Number()),
  maxY: Nullable(Type.Number()),
});

export type PokemonSpawnConditionPosition = Static<
  typeof PokemonSpawnConditionPositionSchema
>;

export const PokemonSpawnConditionLureSchema = Type.Object({
  minLureLevel: Nullable(Type.Number()),
  maxLureLevel: Nullable(Type.Number()),
});

export type PokemonSpawnConditionLure = Static<
  typeof PokemonSpawnConditionLureSchema
>;

export const PokemonSpawnConditionSchema = Type.Object({
  id: Type.Integer(),
  type: Type.String(),
  multiplier: Nullable(Type.Number()),
  biomes: Type.Array(PokemonSpawnReferenceSchema),
  biomeTags: Type.Array(PokemonSpawnReferenceSchema),
  timeRanges: Type.Array(PokemonSpawnReferenceSchema),
  moonPhases: Type.Array(PokemonSpawnReferenceSchema),
  weather: Nullable(PokemonSpawnConditionWeatherSchema),
  sky: Nullable(PokemonSpawnConditionSkySchema),
  position: Nullable(PokemonSpawnConditionPositionSchema),
  lure: Nullable(PokemonSpawnConditionLureSchema),
});

export type PokemonSpawnCondition = Static<typeof PokemonSpawnConditionSchema>;

export const PokemonSpawnSchema = Type.Object({
  id: Type.Integer(),
  bucket: PokemonSpawnReferenceSchema,
  positionType: PokemonSpawnReferenceSchema,
  weight: Type.Number(),
  levelMin: Type.Integer(),
  levelMax: Type.Integer(),
  conditions: Type.Array(PokemonSpawnConditionSchema),
});

export type PokemonSpawn = Static<typeof PokemonSpawnSchema>;

export const PokemonFormSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  fullName: Type.String(),
  slug: Type.String(),
  description: Nullable(Type.String()),
  generation: Nullable(Type.Integer()),
  image: Nullable(PokemonImageRefSchema),
  height: Type.Number(),
  weight: Type.Number(),
  overrides: Nullable(PokemonFormOverridesSchema),
  baseHp: Type.Integer(),
  baseAttack: Type.Integer(),
  baseDefence: Type.Integer(),
  baseSpecialAttack: Type.Integer(),
  baseSpecialDefence: Type.Integer(),
  baseSpeed: Type.Integer(),
  baseExperienceYield: Nullable(Type.Integer()),
  evHp: Type.Integer(),
  evAttack: Type.Integer(),
  evDefence: Type.Integer(),
  evSpecialAttack: Type.Integer(),
  evSpecialDefence: Type.Integer(),
  evSpeed: Type.Integer(),
  labels: Type.Array(PokemonLabelSchema),
  aspectChoices: Type.Array(PokemonAspectChoiceRefSchema),
  types: Type.Array(PokemonFormTypeSchema),
  abilities: Type.Array(PokemonFormAbilitySchema),
  moves: Type.Array(PokemonFormMoveSchema),
  hitbox: Nullable(PokemonFormHitboxSchema),
  drops: Nullable(PokemonFormDropsSchema),
  aspectCombos: Type.Array(PokemonFormAspectComboSchema),
  behaviour: Nullable(PokemonBehaviourSchema),
  spawns: Type.Array(PokemonSpawnSchema),
});

export type PokemonForm = Static<typeof PokemonFormSchema>;

export const PokemonSpeciesWithFormsSchema = Type.Composite([
  PokemonSpeciesSchema,
  Type.Object({
    forms: Type.Array(PokemonFormSchema),
  }),
]);

export type PokemonSpeciesWithForms = Static<typeof PokemonSpeciesWithFormsSchema>;

export const PokemonFormWithSpeciesSchema = Type.Composite([
  PokemonFormSchema,
  Type.Object({
    species: PokemonSpeciesSchema,
  }),
]);

export type PokemonFormWithSpecies = Static<typeof PokemonFormWithSpeciesSchema>;

export const PokemonSpeciesListResponseSchema = Type.Object({
  data: Type.Array(PokemonSpeciesWithFormsSchema),
  total: Type.Integer(),
  limit: Type.Integer(),
  offset: Type.Integer(),
});

export type PokemonSpeciesListResponse = Static<typeof PokemonSpeciesListResponseSchema>;

export const PokemonFormListResponseSchema = Type.Object({
  data: Type.Array(PokemonFormWithSpeciesSchema),
  total: Type.Integer(),
  limit: Type.Integer(),
  offset: Type.Integer(),
});

export type PokemonFormListResponse = Static<typeof PokemonFormListResponseSchema>;

export const PokemonSpeciesDetailResponseSchema = PokemonSpeciesWithFormsSchema;
export type PokemonSpeciesDetailResponse = Static<typeof PokemonSpeciesDetailResponseSchema>;

export const PokemonFormDetailResponseSchema = PokemonFormWithSpeciesSchema;
export type PokemonFormDetailResponse = Static<typeof PokemonFormDetailResponseSchema>;

export const PokemonRelationIncludeNames = [
  "forms",
  "types",
  "abilities",
  "moves",
  "labels",
  "aspects",
  "drops",
  "eggGroups",
  "experienceGroup",
  "hitboxes",
  "lighting",
  "riding",
  "behaviour",
  "spawns",
] as const;

export type PokemonRelationIncludeName =
  (typeof PokemonRelationIncludeNames)[number];

export const PokemonRelationIncludeNameSchema = Type.Union(
  PokemonRelationIncludeNames.map((name) => Type.Literal(name)),
);

export const PokemonIncludeNames = [
  ...PokemonRelationIncludeNames,
  "*",
] as const;

export type PokemonIncludeName = (typeof PokemonIncludeNames)[number];

export const PokemonIncludeNameSchema = Type.Union(
  PokemonIncludeNames.map((name) => Type.Literal(name)),
);

const StringOrStringArray = Type.Union([Type.String(), Type.Array(Type.String())]);

const IdOrSlug = Type.Union([Type.Integer(), Type.String()]);
const IdOrSlugList = Type.Union([
  Type.Integer(),
  Type.String(),
  Type.Array(Type.Union([Type.Integer(), Type.String()])),
]);

const NumericValue = Type.Union([Type.Integer(), Type.Number(), Type.String()]);
const NumericList = Type.Union([
  NumericValue,
  Type.Array(NumericValue),
]);

const StatBound = NumericValue;

export const PokemonSearchQueryKeys = [
  "include",
  "name",
  "speciesIds",
  "speciesId",
  "speciesSlugs",
  "speciesSlug",
  "species",
  "formIds",
  "formSlugs",
  "typeIds",
  "typeSlugs",
  "abilityIds",
  "abilitySlugs",
  "moveIds",
  "moveSlugs",
  "eggGroupIds",
  "eggGroupSlugs",
  "labelIds",
  "labelSlugs",
  "dropItemIds",
  "dropItemSlugs",
  "biomeIds",
  "biomeSlugs",
  "biomeTagIds",
  "biomeTagSlugs",
  "spawnBucketIds",
  "spawnBucketSlugs",
  "speciesGeneration",
  "generation",
  "speciesGenerations",
  "generations",
  "formGeneration",
  "formGenerations",
  "hasForm.typeIds",
  "hasForm.typeId",
  "hasForm.typeSlugs",
  "hasForm.type",
  "hasForm.types",
  "hasForm.abilityIds",
  "hasForm.abilityId",
  "hasForm.abilitySlugs",
  "hasForm.ability",
  "hasForm.abilities",
  "hasForm.moveIds",
  "hasForm.moveId",
  "hasForm.moveSlugs",
  "hasForm.move",
  "hasForm.moves",
  "hasForm.labelIds",
  "hasForm.labelId",
  "hasForm.labelSlugs",
  "hasForm.label",
  "hasForm.labels",
  "hasForm.dropItemIds",
  "hasForm.dropItemId",
  "hasForm.dropItemSlugs",
  "hasForm.dropItem",
  "hasForm.dropItems",
  "hasForm.biomeIds",
  "hasForm.biomeId",
  "hasForm.biomeSlugs",
  "hasForm.biome",
  "hasForm.biomes",
  "hasForm.biomeTagIds",
  "hasForm.biomeTagId",
  "hasForm.biomeTagSlugs",
  "hasForm.biomeTag",
  "hasForm.biomeTags",
  "hasForm.spawnBucketIds",
  "hasForm.spawnBucketId",
  "hasForm.spawnBucketSlugs",
  "hasForm.spawnBucket",
  "hasForm.spawnBuckets",
  "hpMin",
  "hpMax",
  "attackMin",
  "attackMax",
  "defenseMin",
  "defenseMax",
  "specialAttackMin",
  "specialAttackMax",
  "specialDefenseMin",
  "specialDefenseMax",
  "speedMin",
  "speedMax",
  "totalStatsMin",
  "totalStatsMax",
  "heightMin",
  "heightMax",
  "weightMin",
  "weightMax",
  "catchRateMin",
  "catchRateMax",
  "baseFriendshipMin",
  "baseFriendshipMax",
  "eggCyclesMin",
  "eggCyclesMax",
  "maleRatioMin",
  "maleRatioMax",
  "baseExperienceYieldMin",
  "baseExperienceYieldMax",
  "limit",
  "offset",
] as const;

export type PokemonSearchQueryKey =
  (typeof PokemonSearchQueryKeys)[number];

export const PokemonIncludeQuerySchema = Type.Union([
  Type.String(),
  Type.Array(Type.String()),
]);
export type PokemonIncludeQuery = Static<typeof PokemonIncludeQuerySchema>;

const PokemonBaseSearchQuerySchema = Type.Object(
  {
    include: Type.Optional(PokemonIncludeQuerySchema),
    name: Type.Optional(Type.String()),

    speciesIds: Type.Optional(IdOrSlugList),
    speciesId: Type.Optional(IdOrSlug),
    speciesSlugs: Type.Optional(StringOrStringArray),
    speciesSlug: Type.Optional(Type.String()),
    species: Type.Optional(StringOrStringArray),

    formIds: Type.Optional(IdOrSlugList),
    formSlugs: Type.Optional(StringOrStringArray),

    typeIds: Type.Optional(IdOrSlugList),
    typeSlugs: Type.Optional(StringOrStringArray),
    abilityIds: Type.Optional(IdOrSlugList),
    abilitySlugs: Type.Optional(StringOrStringArray),
    moveIds: Type.Optional(IdOrSlugList),
    moveSlugs: Type.Optional(StringOrStringArray),
    eggGroupIds: Type.Optional(IdOrSlugList),
    eggGroupSlugs: Type.Optional(StringOrStringArray),
    labelIds: Type.Optional(IdOrSlugList),
    labelSlugs: Type.Optional(StringOrStringArray),
    dropItemIds: Type.Optional(IdOrSlugList),
    dropItemSlugs: Type.Optional(StringOrStringArray),
    biomeIds: Type.Optional(IdOrSlugList),
    biomeSlugs: Type.Optional(StringOrStringArray),
    biomeTagIds: Type.Optional(IdOrSlugList),
    biomeTagSlugs: Type.Optional(StringOrStringArray),
    spawnBucketIds: Type.Optional(IdOrSlugList),
    spawnBucketSlugs: Type.Optional(StringOrStringArray),

    speciesGeneration: Type.Optional(NumericValue),
    generation: Type.Optional(NumericValue),
    speciesGenerations: Type.Optional(NumericList),
    generations: Type.Optional(NumericList),
    formGeneration: Type.Optional(NumericValue),
    formGenerations: Type.Optional(NumericList),

    "hasForm.typeIds": Type.Optional(IdOrSlugList),
    "hasForm.typeId": Type.Optional(IdOrSlug),
    "hasForm.typeSlugs": Type.Optional(StringOrStringArray),
    "hasForm.type": Type.Optional(StringOrStringArray),
    "hasForm.types": Type.Optional(StringOrStringArray),
    "hasForm.abilityIds": Type.Optional(IdOrSlugList),
    "hasForm.abilityId": Type.Optional(IdOrSlug),
    "hasForm.abilitySlugs": Type.Optional(StringOrStringArray),
    "hasForm.ability": Type.Optional(StringOrStringArray),
    "hasForm.abilities": Type.Optional(StringOrStringArray),
    "hasForm.moveIds": Type.Optional(IdOrSlugList),
    "hasForm.moveId": Type.Optional(IdOrSlug),
    "hasForm.moveSlugs": Type.Optional(StringOrStringArray),
    "hasForm.move": Type.Optional(StringOrStringArray),
    "hasForm.moves": Type.Optional(StringOrStringArray),
    "hasForm.labelIds": Type.Optional(IdOrSlugList),
    "hasForm.labelId": Type.Optional(IdOrSlug),
    "hasForm.labelSlugs": Type.Optional(StringOrStringArray),
    "hasForm.label": Type.Optional(StringOrStringArray),
    "hasForm.labels": Type.Optional(StringOrStringArray),
    "hasForm.dropItemIds": Type.Optional(IdOrSlugList),
    "hasForm.dropItemId": Type.Optional(IdOrSlug),
    "hasForm.dropItemSlugs": Type.Optional(StringOrStringArray),
    "hasForm.dropItem": Type.Optional(StringOrStringArray),
    "hasForm.dropItems": Type.Optional(StringOrStringArray),
    "hasForm.biomeIds": Type.Optional(IdOrSlugList),
    "hasForm.biomeId": Type.Optional(IdOrSlug),
    "hasForm.biomeSlugs": Type.Optional(StringOrStringArray),
    "hasForm.biome": Type.Optional(StringOrStringArray),
    "hasForm.biomes": Type.Optional(StringOrStringArray),
    "hasForm.biomeTagIds": Type.Optional(IdOrSlugList),
    "hasForm.biomeTagId": Type.Optional(IdOrSlug),
    "hasForm.biomeTagSlugs": Type.Optional(StringOrStringArray),
    "hasForm.biomeTag": Type.Optional(StringOrStringArray),
    "hasForm.biomeTags": Type.Optional(StringOrStringArray),
    "hasForm.spawnBucketIds": Type.Optional(IdOrSlugList),
    "hasForm.spawnBucketId": Type.Optional(IdOrSlug),
    "hasForm.spawnBucketSlugs": Type.Optional(StringOrStringArray),
    "hasForm.spawnBucket": Type.Optional(StringOrStringArray),
    "hasForm.spawnBuckets": Type.Optional(StringOrStringArray),

    hpMin: Type.Optional(StatBound),
    hpMax: Type.Optional(StatBound),
    attackMin: Type.Optional(StatBound),
    attackMax: Type.Optional(StatBound),
    defenseMin: Type.Optional(StatBound),
    defenseMax: Type.Optional(StatBound),
    specialAttackMin: Type.Optional(StatBound),
    specialAttackMax: Type.Optional(StatBound),
    specialDefenseMin: Type.Optional(StatBound),
    specialDefenseMax: Type.Optional(StatBound),
    speedMin: Type.Optional(StatBound),
    speedMax: Type.Optional(StatBound),
    totalStatsMin: Type.Optional(StatBound),
    totalStatsMax: Type.Optional(StatBound),
    heightMin: Type.Optional(StatBound),
    heightMax: Type.Optional(StatBound),
    weightMin: Type.Optional(StatBound),
    weightMax: Type.Optional(StatBound),
    catchRateMin: Type.Optional(StatBound),
    catchRateMax: Type.Optional(StatBound),
    baseFriendshipMin: Type.Optional(StatBound),
    baseFriendshipMax: Type.Optional(StatBound),
    eggCyclesMin: Type.Optional(StatBound),
    eggCyclesMax: Type.Optional(StatBound),
    maleRatioMin: Type.Optional(StatBound),
    maleRatioMax: Type.Optional(StatBound),
    baseExperienceYieldMin: Type.Optional(StatBound),
    baseExperienceYieldMax: Type.Optional(StatBound),

    limit: Type.Optional(StatBound),
    offset: Type.Optional(StatBound),
  },
  { additionalProperties: true },
);

export const PokemonSpeciesListQuerySchema = PokemonBaseSearchQuerySchema;
export type PokemonSpeciesListQuery = Static<
  typeof PokemonSpeciesListQuerySchema
>;

export const PokemonFormListQuerySchema = PokemonBaseSearchQuerySchema;
export type PokemonFormListQuery = Static<typeof PokemonFormListQuerySchema>;

export const PokemonSpeciesDetailQuerySchema = Type.Object(
  {
    include: Type.Optional(PokemonIncludeQuerySchema),
  },
  { additionalProperties: true },
);
export type PokemonSpeciesDetailQuery = Static<
  typeof PokemonSpeciesDetailQuerySchema
>;

export const PokemonFormDetailQuerySchema = Type.Object(
  {
    include: Type.Optional(PokemonIncludeQuerySchema),
  },
  { additionalProperties: true },
);
export type PokemonFormDetailQuery = Static<
  typeof PokemonFormDetailQuerySchema
>;
