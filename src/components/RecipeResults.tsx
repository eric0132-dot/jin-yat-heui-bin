import { motion } from 'framer-motion'
import {
  COOK_TIME_LABEL,
  FLAVOR_LABEL,
  INGREDIENT_LABEL,
  MEAL_LABEL,
  SOURCE_LABEL,
} from '../data/recipeLabels'
import type { ScoredRecipe } from '../types'

interface Props {
  results: ScoredRecipe[]
  onSelect: (item: ScoredRecipe) => void
}

export function RecipeResults({ results, onSelect }: Props) {
  return (
    <section className="panel results" id="recipe-results">
      <div className="panel-head">
        <h2>推薦食譜</h2>
        <p>
          茶餐廳、連鎖同家常菜，材料同步驟已按 1–3 人份量整理。
          {results.length > 0 ? ` 共 ${results.length} 道。` : ''}
        </p>
      </div>

      {results.length === 0 ? (
        <p className="empty">暫時冇符合條件嘅食譜，試下放寬主味或餐別。</p>
      ) : (
        <ul className="result-list">
          {results.map((item, index) => (
            <motion.li
              key={item.recipe.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.02, 0.3), duration: 0.35 }}
            >
              <button
                type="button"
                className="result-card"
                onClick={() => onSelect(item)}
              >
                <div className="result-top">
                  <h3>{item.recipe.name}</h3>
                  <span className="result-meta">
                    {MEAL_LABEL[item.recipe.meal]} · {COOK_TIME_LABEL[item.recipe.cookTime]}
                  </span>
                </div>
                <p className="result-desc">{item.recipe.description}</p>
                <div className="result-tags">
                  {item.recipe.flavors.map((f) => (
                    <span key={f} className="tag tag-flavor">
                      {FLAVOR_LABEL[f]}
                    </span>
                  ))}
                  <span className="tag">{INGREDIENT_LABEL[item.recipe.mainIngredient]}</span>
                  <span className="tag">{SOURCE_LABEL[item.recipe.source]}</span>
                </div>
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  )
}
