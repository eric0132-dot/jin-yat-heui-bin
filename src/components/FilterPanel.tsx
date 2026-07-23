import {
  BUDGET_OPTIONS,
  COMPANION_OPTIONS,
  DURATION_OPTIONS,
  TYPE_OPTIONS,
} from '../data/labels'
import type { ActivityType, Filters } from '../types'

interface Props {
  filters: Filters
  onChange: (next: Filters) => void
  onSurprise: () => void
}

export function FilterPanel({ filters, onChange, onSurprise }: Props) {
  const toggleType = (type: ActivityType) => {
    const has = filters.types.includes(type)
    onChange({
      ...filters,
      types: has
        ? filters.types.filter((t) => t !== type)
        : [...filters.types, type],
    })
  }

  return (
    <section className="panel filters" id="filters">
      <div className="panel-head">
        <h2>你想點玩</h2>
        <p>揀同行、類型、時長同消費，下面會即時更新推薦。</p>
      </div>

      <div className="filter-block">
        <h3>同行</h3>
        <div className="chip-row" role="radiogroup" aria-label="同行">
          {COMPANION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={filters.companion === opt.value}
              className={`chip ${filters.companion === opt.value ? 'is-on' : ''}`}
              onClick={() => onChange({ ...filters, companion: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-block">
        <h3>活動類型</h3>
        <div className="chip-row" aria-label="活動類型">
          {TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              aria-pressed={filters.types.includes(opt.value)}
              className={`chip ${filters.types.includes(opt.value) ? 'is-on' : ''}`}
              onClick={() => toggleType(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-block">
        <h3>時長</h3>
        <div className="chip-row" role="radiogroup" aria-label="時長">
          {DURATION_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={filters.duration === opt.value}
              className={`chip ${filters.duration === opt.value ? 'is-on' : ''}`}
              onClick={() => onChange({ ...filters, duration: opt.value })}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filter-block">
        <h3>消費</h3>
        <div className="chip-row" role="radiogroup" aria-label="消費">
          {BUDGET_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={filters.budget === opt.value}
              className={`chip ${filters.budget === opt.value ? 'is-on' : ''}`}
              onClick={() => onChange({ ...filters, budget: opt.value })}
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
              companion: 'any',
              types: [],
              duration: 'any',
              budget: 'any',
            })
          }
        >
          重設
        </button>
        <button type="button" className="btn btn-secondary" onClick={onSurprise}>
          隨機一個
        </button>
      </div>
    </section>
  )
}
