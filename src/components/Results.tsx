import { motion } from 'framer-motion'
import { BUDGET_LABEL, DURATION_LABEL, TYPE_LABEL } from '../data/labels'
import type { ScoredActivity } from '../types'

interface Props {
  results: ScoredActivity[]
  seasonHint: string
  onSelect: (item: ScoredActivity) => void
}

export function Results({ results, seasonHint, onSelect }: Props) {
  return (
    <section className="panel results" id="results">
      <div className="panel-head">
        <h2>推薦活動</h2>
        <p>{seasonHint}</p>
      </div>

      {results.length === 0 ? (
        <p className="empty">暫時冇符合條件嘅活動，試下放寬類型或消費。</p>
      ) : (
        <ul className="result-list">
          {results.map((item, index) => (
            <motion.li
              key={item.activity.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: Math.min(index * 0.04, 0.28), duration: 0.4 }}
            >
              <button
                type="button"
                className="result-card"
                onClick={() => onSelect(item)}
              >
                <div className="result-top">
                  <h3>{item.activity.name}</h3>
                  <span className="result-meta">
                    {DURATION_LABEL[item.activity.duration]} ·{' '}
                    {BUDGET_LABEL[item.activity.budget]}
                  </span>
                </div>
                <p className="result-desc">{item.activity.description}</p>
                <div className="result-tags">
                  {item.reasons.slice(0, 2).map((r) => (
                    <span key={r} className="tag tag-accent">
                      {r}
                    </span>
                  ))}
                  {item.activity.types.slice(0, 2).map((t) => (
                    <span key={t} className="tag">
                      {TYPE_LABEL[t]}
                    </span>
                  ))}
                  <span className="tag">{item.activity.districts[0]}</span>
                </div>
              </button>
            </motion.li>
          ))}
        </ul>
      )}
    </section>
  )
}
