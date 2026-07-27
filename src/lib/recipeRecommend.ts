import { recipes } from '../data/recipes'
import type { RecipeFilters, ScoredRecipe } from '../types'

export function recommendRecipes(
  filters: RecipeFilters,
  limit?: number,
): ScoredRecipe[] {
  const scored: ScoredRecipe[] = []

  for (const recipe of recipes) {
    if (filters.meal !== 'any' && recipe.meal !== filters.meal) continue
    if (filters.cookTime !== 'any' && recipe.cookTime !== filters.cookTime) continue
    if (
      filters.mainIngredient !== 'any' &&
      recipe.mainIngredient !== filters.mainIngredient
    ) {
      continue
    }
    if (filters.source !== 'any' && recipe.source !== filters.source) continue
    if (
      filters.flavors.length > 0 &&
      !filters.flavors.some((f) => recipe.flavors.includes(f))
    ) {
      continue
    }

    let score = 10
    if (filters.flavors.length > 0) score += 8
    if (filters.meal !== 'any') score += 4
    if (filters.cookTime !== 'any') score += 3

    scored.push({ recipe, score })
  }

  scored.sort(
    (a, b) =>
      b.score - a.score || a.recipe.name.localeCompare(b.recipe.name, 'zh-HK'),
  )

  const cap = limit ?? Number.POSITIVE_INFINITY
  return Number.isFinite(cap) ? scored.slice(0, cap) : scored
}

export function pickRandomRecipe(filters: RecipeFilters): ScoredRecipe | null {
  const list = recommendRecipes(filters, 24)
  if (list.length === 0) return null
  const top = list.slice(0, Math.min(10, list.length))
  return top[Math.floor(Math.random() * top.length)] ?? null
}

export function recipeCatalogSize(): number {
  return recipes.length
}
