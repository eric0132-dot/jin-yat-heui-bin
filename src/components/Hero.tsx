import { motion } from 'framer-motion'
import type { CalendarContext } from '../data/calendar'
import type { ActivityKind } from '../types'

interface Props {
  calendar: CalendarContext
  view: ActivityKind
  onStart: () => void
}

export function Hero({ calendar, view, onStart }: Props) {
  const isNiche = view === 'niche'

  return (
    <header className={`hero ${isNiche ? 'hero-niche' : ''}`}>
      <div className="hero-glow" aria-hidden />
      <div className="hero-grid" aria-hidden />
      <motion.div
        className="hero-inner"
        key={view}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hero-kicker">
          {isNiche
            ? '唔使指定景點 · 日常都可以好有節目'
            : '香港活動靈感 · 可安裝離線用'}
        </p>
        <h1 className="brand">{isNiche ? '小眾玩法' : '今日去邊'}</h1>
        <p className="hero-lead">
          {isNiche
            ? '睇戲、行超市、坐電車……揀同行同預算，拎啲空泛但實用嘅小眾靈感。'
            : '家庭定單人？幾耐？使幾多？揀完條件，即刻推薦啱時節嘅活動。'}
        </p>
        <div className="hero-cta">
          <button type="button" className="btn btn-primary" onClick={onStart}>
            {isNiche ? '開始揀小眾' : '開始揀活動'}
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
