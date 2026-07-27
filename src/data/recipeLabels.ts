import type {
  CookTime,
  FlavorTag,
  IngredientMain,
  MealType,
  RecipeSource,
} from '../types'

export const MEAL_OPTIONS: { value: MealType | 'any'; label: string }[] = [
  { value: 'any', label: '唔限' },
  { value: 'breakfast', label: '早餐' },
  { value: 'lunch', label: '午餐' },
  { value: 'dinner', label: '晚餐' },
  { value: 'soup', label: '湯水' },
]

export const COOK_TIME_OPTIONS: { value: CookTime | 'any'; label: string }[] = [
  { value: 'any', label: '唔限' },
  { value: 'quick15', label: '15 分鐘內' },
  { value: 'mid30', label: '約 30 分鐘' },
  { value: 'long60', label: '30 分鐘以上' },
]

export const INGREDIENT_OPTIONS: { value: IngredientMain | 'any'; label: string }[] = [
  { value: 'any', label: '唔限' },
  { value: 'chicken', label: '雞' },
  { value: 'pork', label: '豬' },
  { value: 'beef', label: '牛' },
  { value: 'fish', label: '魚' },
  { value: 'seafood', label: '海鮮' },
  { value: 'egg', label: '蛋' },
  { value: 'tofu', label: '豆腐' },
  { value: 'veg', label: '蔬菜' },
  { value: 'mixed', label: '雜錦' },
]

export const FLAVOR_OPTIONS: { value: FlavorTag; label: string }[] = [
  { value: 'sweet', label: '甜' },
  { value: 'salty', label: '鹹' },
  { value: 'umami', label: '鮮' },
  { value: 'spicy', label: '辣' },
  { value: 'sour', label: '酸' },
  { value: 'bitter', label: '苦' },
  { value: 'light', label: '清淡' },
]

export const SOURCE_OPTIONS: { value: RecipeSource | 'any'; label: string }[] = [
  { value: 'any', label: '唔限' },
  { value: 'cha_chaan_teng', label: '茶餐廳' },
  { value: 'chain', label: '連鎖餐廳' },
  { value: 'home', label: '家常菜' },
]

export const MEAL_LABEL: Record<MealType, string> = {
  breakfast: '早餐',
  lunch: '午餐',
  dinner: '晚餐',
  soup: '湯水',
}

export const COOK_TIME_LABEL: Record<CookTime, string> = {
  quick15: '約 15 分鐘內',
  mid30: '約 30 分鐘',
  long60: '30 分鐘以上',
}

export const INGREDIENT_LABEL: Record<IngredientMain, string> = {
  chicken: '雞',
  pork: '豬',
  beef: '牛',
  fish: '魚',
  seafood: '海鮮',
  egg: '蛋',
  tofu: '豆腐',
  veg: '蔬菜',
  mixed: '雜錦',
}

export const FLAVOR_LABEL: Record<FlavorTag, string> = {
  sweet: '甜',
  salty: '鹹',
  umami: '鮮',
  spicy: '辣',
  sour: '酸',
  bitter: '苦',
  light: '清淡',
}

export const SOURCE_LABEL: Record<RecipeSource, string> = {
  chain: '連鎖餐廳',
  cha_chaan_teng: '茶餐廳',
  home: '家常菜',
}
