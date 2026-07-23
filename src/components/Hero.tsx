import { motion } from 'framer-motion'
import type { CalendarContext } from '../data/calendar'

interface Props {
  calendar: CalendarContext
  onStart: () => void
}

export function Hero({ calendar, onStart }: Props) {
  return (
    <header className="hero">
      <div className="hero-glow" aria-hidden />
      <div className="hero-grid" aria-hidden />
      <motion.div
        className="hero-inner"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hero-kicker">香港活動靈感 · 可安裝離線用</p>
        <h1 className="brand">今日去邊</h1>
        <p className="hero-lead">
          家庭定單人？幾耐？使幾多？揀完條件，即刻推薦啱時節嘅活動。
        </p>
        <div className="hero-cta">
          <button type="button" className="btn btn-primary" onClick={onStart}>
            開始揀活動
          </button>
        </div>
        <motion.p
          className="season-chip"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
        >
          <span className="season-dot" />
          而家係{calendar.seasonLabel}
          {calendar.festivalLabels.length > 0
            ? ` · ${calendar.festivalLabels.join('、')}`
            : ''}
        </motion.p>
      </motion.div>
    </header>
  )
}
