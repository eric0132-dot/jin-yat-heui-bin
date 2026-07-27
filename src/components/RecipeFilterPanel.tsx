import {
  COOK_TIME_OPTIONS,
  FLAVOR_OPTIONS,
  INGREDIENT_OPTIONS,
  MEAL_OPTIONS,
  SOURCE_OPTIONS,
} from '../data/recipeLabels'
import type { FlavorTag, RecipeFilters } from '../types'

interface Props {
  filters: RecipeFilters
  onChange: (next: RecipeFilters) => void
  onSurprise: () => void
}

export function RecipeFilterPanel({ filters, onChange, onSurprise }: Props) {
  const toggleFlavor = (f: FlavorTag) => {
    const has = filters.flavors.includes(f)
    onChange({
      ...filters,
      flavors: has ? filters.flavors.filter((x) => x !== f) : [...filters.flavors, f],
    })
  }

  return (
    <section className="panel filters" id="recipe-filters">
      <div className="panel-head">
        <h2>今日煮咩好</h2>
        <p>
          按餐別、煮食時間、材料同主味揀；材料份量預設 1–3 人，可視人數加減。
        </p>
      </div>

      <div className="filter-block">
        <h3>餐別</h3>
        <div className="chip-row" role="radiogroup" aria-label="餐別">
          {MEAL_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={filters.meal === opt.value}
              className={`chip ${filters.meal === opt.value ? 'is-on' : ''}`}
              onClick={() => onChange({ ...filters, meal: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-block">
        <h3>煮食時間</h3>
        <div className="chip-row" role="radiogroup" aria-label="煮食時間">
          {COOK_TIME_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={filters.cookTime === opt.value}
              className={`chip ${filters.cookTime === opt.value ? 'is-on' : ''}`}
              onClick={() => onChange({ ...filters, cookTime: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-block">
        <h3>主要材料</h3>
        <div className="chip-row" role="radiogroup" aria-label="主要材料">
          {INGREDIENT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={filters.mainIngredient === opt.value}
              className={`chip ${filters.mainIngredient === opt.value ? 'is-on' : ''}`}
              onClick={() => onChange({ ...filters, mainIngredient: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-block">
        <h3>主味（可多選）</h3>
        <div className="chip-row" aria-label="主味">
          {FLAVOR_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              aria-pressed={filters.flavors.includes(opt.value)}
              className={`chip ${filters.flavors.includes(opt.value) ? 'is-on' : ''}`}
              onClick={() => toggleFlavor(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-block">
        <h3>來源</h3>
        <div className="chip-row" role="radiogroup" aria-label="來源">
          {SOURCE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={filters.source === opt.value}
              className={`chip ${filters.source === opt.value ? 'is-on' : ''}`}
              onClick={() => onChange({ ...filters, source: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-actions">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() =>
            onChange({
              meal: 'any',
              cookTime: 'any',
              mainIngredient: 'any',
              flavors: [],
              source: 'any',
            })
          }
        >
          重設
        </button>
        <button type="button" className="btn btn-secondary" onClick={onSurprise}>
          隨機一道
        </button>
      </div>
    </section>
  )
}
