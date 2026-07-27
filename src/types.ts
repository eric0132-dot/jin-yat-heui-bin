export type Companion = 'solo' | 'family' | 'couple' | 'friends' | 'schoolPickup'

export type ActivityType =
  | 'outdoor'
  | 'indoor'
  | 'food'
  | 'culture'
  | 'nature'
  | 'shopping'
  | 'sports'
  | 'relax'

export type Duration = 'short' | 'halfday' | 'fullday'

export type Budget = 'free' | 'low' | 'mid' | 'high'

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export type Festival =
  | 'cny'
  | 'chingming'
  | 'dragonboat'
  | 'midautumn'
  | 'halloween'
  | 'christmas'
  | 'summerholiday'

export type ActivityKind = 'classic' | 'niche'

/** App tab: classic, niche, or combined full list */
export type AppView = ActivityKind | 'all'


export type { HkDistrict } from './data/districts'

import type { HkDistrict } from './data/districts'

export interface Activity {
  id: string
  kind: ActivityKind
  name: string
  description: string
  types: ActivityType[]
  companions: Companion[]
  duration: Duration
  budget: Budget
  /** Empty = 各區／唔指明地點 */
  districts: HkDistrict[]
  /** Shown only when user picks district filter(s) */
  placeLabel?: string
  seasons: Season[] | 'all'
  festivals?: Festival[]
  tips?: string
  heatFriendly?: boolean
  /** User-created, stored locally on device */
  custom?: boolean
}

export interface Filters {
  companion: Companion | 'any'
  types: ActivityType[]
  duration: Duration | 'any'
  budget: Budget | 'any'
  /** Multi-select 18 districts; empty = 唔限 */
  districts: HkDistrict[]
}

export interface ScoredActivity {
  activity: Activity
  score: number
  reasons: string[]
}

export type ActivityDraft = Omit<Activity, 'id' | 'custom' | 'districts' | 'placeLabel'> & {
  districts: HkDistrict[]
  placeLabel?: string
}

// —— 今日煮咩好 ——

export type AppSection = 'activities' | 'recipes'

export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'soup'

export type CookTime = 'quick15' | 'mid30' | 'long60'

export type IngredientMain =
  | 'chicken'
  | 'pork'
  | 'beef'
  | 'fish'
  | 'seafood'
  | 'veg'
  | 'egg'
  | 'tofu'
  | 'mixed'

/** 主味標籤 */
export type FlavorTag = 'sweet' | 'salty' | 'umami' | 'spicy' | 'sour' | 'bitter' | 'light'

export type RecipeSource = 'chain' | 'cha_chaan_teng' | 'home'

export interface Recipe {
  id: string
  name: string
  description: string
  source: RecipeSource
  meal: MealType
  cookTime: CookTime
  mainIngredient: IngredientMain
  flavors: FlavorTag[]
  /** 材料行，預設 1–3 人份量 */
  ingredients: string[]
  steps: string[]
  tips?: string
}

export interface RecipeFilters {
  meal: MealType | 'any'
  cookTime: CookTime | 'any'
  mainIngredient: IngredientMain | 'any'
  flavors: FlavorTag[]
  source: RecipeSource | 'any'
}

export interface ScoredRecipe {
  recipe: Recipe
  score: number
}
