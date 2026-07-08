import { Type, type Static, type TSchema } from "@sinclair/typebox";

const Nullable = <TSchemaValue extends TSchema>(schema: TSchemaValue) =>
  Type.Union([schema, Type.Null()]);

export const AbilityFlagSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  slug: Type.String(),
  description: Nullable(Type.String()),
});

export type AbilityFlag = Static<typeof AbilityFlagSchema>;

export const AbilityFormReferenceSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  slug: Type.String(),
  speciesId: Type.Integer(),
});

export type AbilityFormReference = Static<typeof AbilityFormReferenceSchema>;

export const AbilitySchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  slug: Type.String(),
  desc: Nullable(Type.String()),
  shortDesc: Nullable(Type.String()),
  flags: Type.Array(AbilityFlagSchema),
  forms: Type.Array(AbilityFormReferenceSchema),
});

export type Ability = Static<typeof AbilitySchema>;

export const AbilityListResponseSchema = Type.Object({
  data: Type.Array(AbilitySchema),
  total: Type.Integer(),
  limit: Type.Integer(),
  offset: Type.Integer(),
});

export type AbilityListResponse = Static<typeof AbilityListResponseSchema>;

export const AbilityDetailResponseSchema = AbilitySchema;
export type AbilityDetailResponse = Static<typeof AbilityDetailResponseSchema>;

export const MoveTypeRefSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  slug: Type.String(),
});

export type MoveTypeRef = Static<typeof MoveTypeRefSchema>;

export const MoveCategorySchema = Type.Object({
  id: Type.Integer(),
  slug: Type.String(),
  name: Type.String(),
  description: Nullable(Type.String()),
});

export type MoveCategory = Static<typeof MoveCategorySchema>;

export const MoveTargetSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  slug: Type.String(),
  description: Nullable(Type.String()),
});

export type MoveTarget = Static<typeof MoveTargetSchema>;

export const MoveFlagTypeSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  slug: Type.String(),
  description: Nullable(Type.String()),
});

export type MoveFlagType = Static<typeof MoveFlagTypeSchema>;

export const MoveStatSchema = Type.Object({
  id: Type.Integer(),
  slug: Type.String(),
  name: Type.String(),
});

export type MoveStat = Static<typeof MoveStatSchema>;

export const MoveBoostSchema = Type.Object({
  stat: MoveStatSchema,
  stages: Type.Integer(),
  isSelf: Type.Boolean(),
});

export type MoveBoost = Static<typeof MoveBoostSchema>;

export const MoveConditionTypeSchema = Type.Object({
  id: Type.Integer(),
  slug: Type.String(),
  name: Type.String(),
});

export type MoveConditionType = Static<typeof MoveConditionTypeSchema>;

export const MoveConditionSchema = Type.Object({
  id: Type.Integer(),
  slug: Type.String(),
  name: Type.String(),
  type: MoveConditionTypeSchema,
  description: Nullable(Type.String()),
});

export type MoveCondition = Static<typeof MoveConditionSchema>;

export const MoveEffectSchema = Type.Object({
  conditionType: MoveConditionTypeSchema,
  condition: Nullable(MoveConditionSchema),
  chance: Type.Number(),
  isSelf: Type.Boolean(),
});

export type MoveEffect = Static<typeof MoveEffectSchema>;

export const MoveZDataSchema = Type.Object({
  zPower: Nullable(Type.Integer()),
  zEffect: Nullable(Type.String()),
  zCrystal: Nullable(Type.String()),
  isZExclusive: Type.Boolean(),
});

export type MoveZData = Static<typeof MoveZDataSchema>;

export const MoveSpeciesReferenceSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  slug: Type.String(),
});

export type MoveSpeciesReference = Static<typeof MoveSpeciesReferenceSchema>;

export const MoveSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
  slug: Type.String(),
  desc: Nullable(Type.String()),
  shortDesc: Nullable(Type.String()),
  type: MoveTypeRefSchema,
  category: MoveCategorySchema,
  target: Nullable(MoveTargetSchema),
  power: Nullable(Type.Integer()),
  accuracy: Nullable(Type.Union([Type.Number(), Type.Boolean()])),
  pp: Type.Integer(),
  priority: Type.Integer(),
  critRatio: Nullable(Type.Integer()),
  minHits: Nullable(Type.Integer()),
  maxHits: Nullable(Type.Integer()),
  drainPercent: Nullable(Type.Integer()),
  healPercent: Nullable(Type.Integer()),
  recoilPercent: Nullable(Type.Integer()),
  flags: Type.Array(MoveFlagTypeSchema),
  boosts: Type.Array(MoveBoostSchema),
  effects: Type.Array(MoveEffectSchema),
  maxPower: Nullable(Type.Integer()),
  zData: Nullable(MoveZDataSchema),
  gmaxSpecies: Type.Array(MoveSpeciesReferenceSchema),
  forms: Type.Array(AbilityFormReferenceSchema),
});

export type Move = Static<typeof MoveSchema>;

export const MoveListResponseSchema = Type.Object({
  data: Type.Array(MoveSchema),
  total: Type.Integer(),
  limit: Type.Integer(),
  offset: Type.Integer(),
});

export type MoveListResponse = Static<typeof MoveListResponseSchema>;

export const MoveDetailResponseSchema = MoveSchema;
export type MoveDetailResponse = Static<typeof MoveDetailResponseSchema>;

export const ItemNamespaceReferenceSchema = Type.Object({
  id: Type.Integer(),
  slug: Type.String(),
  name: Type.String(),
});

export type ItemNamespaceReference = Static<
  typeof ItemNamespaceReferenceSchema
>;

export const ItemStatReferenceSchema = Type.Object({
  id: Type.Integer(),
  slug: Type.String(),
  name: Type.String(),
});

export type ItemStatReference = Static<typeof ItemStatReferenceSchema>;

export const ItemTagSchema = Type.Object({
  id: Type.Integer(),
  slug: Type.String(),
  name: Type.String(),
});

export type ItemTag = Static<typeof ItemTagSchema>;

export const ItemFlagSchema = Type.Object({
  id: Type.Integer(),
  slug: Type.String(),
  name: Type.String(),
});

export type ItemFlag = Static<typeof ItemFlagSchema>;

export const ItemBoostSchema = Type.Object({
  stat: ItemStatReferenceSchema,
  stages: Type.Integer(),
});

export type ItemBoost = Static<typeof ItemBoostSchema>;

export const RecipeSlotTypeSchema = Type.Object({
  id: Type.Integer(),
  slug: Type.String(),
  name: Type.String(),
  description: Nullable(Type.String()),
});

export type RecipeSlotType = Static<typeof RecipeSlotTypeSchema>;

export const RecipeItemInputItemSchema = Type.Object({
  id: Type.Integer(),
  name: Type.String(),
});

export type RecipeItemInputItem = Static<typeof RecipeItemInputItemSchema>;

export const RecipeInputSchema = Type.Object({
  item: RecipeItemInputItemSchema,
  slot: Nullable(Type.Integer()),
  slotType: Nullable(RecipeSlotTypeSchema),
});

export type RecipeInput = Static<typeof RecipeInputSchema>;

export const RecipeTagInputSchema = Type.Object({
  tag: ItemTagSchema,
  slot: Nullable(Type.Integer()),
  slotType: Nullable(RecipeSlotTypeSchema),
});

export type RecipeTagInput = Static<typeof RecipeTagInputSchema>;

export const RecipeTypeSchema = Type.Object({
  id: Type.Integer(),
  slug: Type.String(),
  name: Type.String(),
});

export type RecipeType = Static<typeof RecipeTypeSchema>;

export const RecipeSchema = Type.Object({
  id: Type.Integer(),
  type: RecipeTypeSchema,
  resultCount: Type.Integer(),
  experience: Nullable(Type.Integer()),
  cookingTime: Nullable(Type.Integer()),
  inputs: Type.Array(RecipeInputSchema),
  tagInputs: Type.Array(RecipeTagInputSchema),
});

export type Recipe = Static<typeof RecipeSchema>;

export const ItemSchema = Type.Object({
  id: Type.Integer(),
  slug: Type.String(),
  name: Type.String(),
  num: Nullable(Type.Integer()),
  desc: Nullable(Type.String()),
  shortDesc: Nullable(Type.String()),
  generation: Nullable(Type.Integer()),
  namespace: Nullable(ItemNamespaceReferenceSchema),
  implemented: Type.Boolean(),
  boosts: Type.Array(ItemBoostSchema),
  flags: Type.Array(ItemFlagSchema),
  tags: Type.Array(ItemTagSchema),
  recipes: Type.Array(RecipeSchema),
});

export type Item = Static<typeof ItemSchema>;

export const ItemListResponseSchema = Type.Object({
  data: Type.Array(ItemSchema),
  total: Type.Integer(),
  limit: Type.Integer(),
  offset: Type.Integer(),
});

export type ItemListResponse = Static<typeof ItemListResponseSchema>;

export const ItemDetailResponseSchema = ItemSchema;
export type ItemDetailResponse = Static<typeof ItemDetailResponseSchema>;
