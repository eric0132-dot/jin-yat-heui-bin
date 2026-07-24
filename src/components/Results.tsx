import { motion } from 'framer-motion'
import { BUDGET_LABEL, DURATION_LABEL, TYPE_LABEL } from '../data/labels'
import type { AppView, ScoredActivity } from '../types'

interface Props {
  results: ScoredActivity[]
  seasonHint: string
  view: AppView
  showLocation: boolean
  onSelect: (item: ScoredActivity) => void
}

function locationTag(
  item: ScoredActivity,
  showLocation: boolean,
  view: AppView,
): string | null {
  if (!showLocation) return null
  if (item.activity.placeLabel) return item.activity.placeLabel
  if (item.activity.districts.length > 0) return item.activity.districts.join('、')
  return view === 'classic' ? '各區' : '各區都行'
}

export function Results({
  results,
  seasonHint,
  view,
  showLocation,
  onSelect,
}: Props) {
  const title =
    view === 'all' ? '全部推薦' : view === 'niche' ? '小眾推薦' : '推薦活動'
  const blurb =
    view === 'all'
      ? showLocation
        ? `經典同小眾合併列出全部合條件項目。${seasonHint}`
        : `一次睇晒所有合條件推薦（唔設上限）。${seasonHint}`
      : showLocation
        ? `已按選定區域分析地點（可多選）。${seasonHint}`
        : view === 'niche'
          ? `靈感唔綁死地點；想睇指明地區可多選 18 區。${seasonHint}`
          : `未揀 18 區時唔顯示指明地點。${seasonHint}`

  return (
    <section className="panel results" id="results">
      <div className="panel-head">
        <h2>{title}</h2>
        <p>
          {blurb}
          {results.length > 0 ? ` 共 ${results.length} 項。` : ''}
        </p>
      </div>

      {results.length === 0 ? (
        <p className="empty">暫時冇符合條件嘅活動，試下放寬類型、消費或地區。</p>
      ) : (
        <ul className="result-list">
          {results.map((item, index) => {
            const loc = locationTag(item, showLocation, view)
            return (
              <motion.li
                key={item.activity.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: Math.min(index * 0.02, 0.35),
                  duration: 0.35,
                }}
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
                    {loc && <span className="tag">{loc}</span>}
                  </div>
                </button>
              </motion.li>
            )
          })}
        </ul>
      )}
    </section>
  )
}
