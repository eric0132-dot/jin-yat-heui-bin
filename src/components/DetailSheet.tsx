import { AnimatePresence, motion } from 'framer-motion'
import { BUDGET_LABEL, DURATION_LABEL, TYPE_LABEL } from '../data/labels'
import type { ScoredActivity } from '../types'

interface Props {
  item: ScoredActivity | null
  onClose: () => void
}

export function DetailSheet({ item, onClose }: Props) {
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
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="sheet-title"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sheet-handle" aria-hidden />
            <p className="sheet-reasons">{item.reasons.join(' · ')}</p>
            <h2 id="sheet-title">{item.activity.name}</h2>
            <p className="sheet-desc">{item.activity.description}</p>

            <dl className="sheet-facts">
              <div>
                <dt>時長</dt>
                <dd>{DURATION_LABEL[item.activity.duration]}</dd>
              </div>
              <div>
                <dt>消費</dt>
                <dd>{BUDGET_LABEL[item.activity.budget]}</dd>
              </div>
              <div>
                <dt>地區</dt>
                <dd>
                  {item.activity.kind === 'niche'
                    ? '各區都行'
                    : item.activity.districts.join('、')}
                </dd>
              </div>
              <div>
                <dt>類型</dt>
                <dd>
                  {item.activity.types.map((t) => TYPE_LABEL[t]).join('、')}
                </dd>
              </div>
            </dl>

            {item.activity.tips && (
              <p className="sheet-tips">小貼士：{item.activity.tips}</p>
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
