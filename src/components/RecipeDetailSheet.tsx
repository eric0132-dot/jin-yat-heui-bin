import { AnimatePresence, motion } from 'framer-motion'
import {
  COOK_TIME_LABEL,
  FLAVOR_LABEL,
  INGREDIENT_LABEL,
  MEAL_LABEL,
  SOURCE_LABEL,
} from '../data/recipeLabels'
import type { ScoredRecipe } from '../types'

interface Props {
  item: ScoredRecipe | null
  onClose: () => void
}

export function RecipeDetailSheet({ item, onClose }: Props) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="sheet-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="sheet sheet-recipe"
            role="dialog"
            aria-modal="true"
            aria-labelledby="recipe-sheet-title"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sheet-handle" aria-hidden />
            <p className="sheet-reasons">
              {MEAL_LABEL[item.recipe.meal]} · {SOURCE_LABEL[item.recipe.source]} · 1–3 人份
            </p>
            <h2 id="recipe-sheet-title">{item.recipe.name}</h2>
            <p className="sheet-desc">{item.recipe.description}</p>

            <div className="result-tags sheet-flavors">
              {item.recipe.flavors.map((f) => (
                <span key={f} className="tag tag-flavor">
                  {FLAVOR_LABEL[f]}
                </span>
              ))}
              <span className="tag">{INGREDIENT_LABEL[item.recipe.mainIngredient]}</span>
              <span className="tag">{COOK_TIME_LABEL[item.recipe.cookTime]}</span>
            </div>

            <h3 className="sheet-subhead">材料</h3>
            <ul className="recipe-list">
              {item.recipe.ingredients.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>

            <h3 className="sheet-subhead">步驟</h3>
            <ol className="recipe-steps">
              {item.recipe.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>

            {item.recipe.tips && (
              <p className="sheet-tips">小貼士：{item.recipe.tips}</p>
            )}

            <button type="button" className="btn btn-primary sheet-close" onClick={onClose}>
              收起
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
