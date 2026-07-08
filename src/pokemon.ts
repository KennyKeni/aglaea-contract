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
  accuracy: Type.Union([Type.Number(), Type.Boolean(), Type.Null()]),
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

export const PokemonSpawnReferenceSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
});

export type PokemonSpawnReference = Static<typeof PokemonSpawnReferenceSchema>;

export const PokemonSpawnConditionWeatherSchema = Type.Object({
  name: Type.String(),
});

export const PokemonSpawnConditionSkySchema = Type.Object({
  name: Type.String(),
});

export const PokemonSpawnConditionPositionSchema = Type.Object({
  name: Type.String(),
});

export const PokemonSpawnConditionLureSchema = Type.Object({
  name: Type.String(),
});

export const PokemonSpawnConditionSchema = Type.Object({
  id: Type.Integer(),
  type: Type.String(),
  multiplier: Nullable(Type.Number()),
  biomes: Type.Array(PokemonSpawnReferenceSchema),
  biomeTags: Type.Array(PokemonSpawnReferenceSchema),
  timeRanges: Type.Array(PokemonSpawnReferenceSchema),
  moonPhases: Type.Array(PokemonSpawnReferenceSchema),
  weather: Nullable(Type.Unknown()),
  sky: Nullable(Type.Unknown()),
  position: Nullable(Type.Unknown()),
  lure: Nullable(Type.Unknown()),
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
