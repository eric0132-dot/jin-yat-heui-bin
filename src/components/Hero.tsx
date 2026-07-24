import { motion } from 'framer-motion'
import type { CalendarContext } from '../data/calendar'
import type { AppView } from '../types'

interface Props {
  calendar: CalendarContext
  view: AppView
  onStart: () => void
  onInstall?: () => void
}

export function Hero({ calendar, view, onStart, onInstall }: Props) {
  const copy =
    view === 'niche'
      ? {
          kicker: '唔使指定景點 · 日常都可以好有節目',
          brand: '小眾玩法',
          lead: '睇戲、行超市、坐電車……揀同行同預算，拎啲空泛但實用嘅小眾靈感。',
          cta: '開始揀小眾',
          className: 'hero-niche',
        }
      : view === 'all'
        ? {
            kicker: '經典 + 小眾 · 一次睇晒合條件推薦',
            brand: '全部推薦',
            lead: '合併兩個資料庫，按你嘅篩選列出所有符合嘅活動，方便一次瀏覽。',
            cta: '開始瀏覽全部',
            className: 'hero-all',
          }
        : {
            kicker: '香港活動靈感 · 可安裝離線用',
            brand: '今日去邊',
            lead: '家庭定單人？幾耐？使幾多？揀完條件，即刻推薦啱時節嘅活動。',
            cta: '開始揀活動',
            className: '',
          }

  return (
    <header className={`hero ${copy.className}`}>
      <div className="hero-glow" aria-hidden />
      <div className="hero-grid" aria-hidden />
      <motion.div
        className="hero-inner"
        key={view}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hero-kicker">{copy.kicker}</p>
        <h1 className="brand">{copy.brand}</h1>
        <p className="hero-lead">{copy.lead}</p>
        <div className="hero-cta">
          <button type="button" className="btn btn-primary" onClick={onStart}>
            {copy.cta}
          </button>
          {onInstall && (
            <button type="button" className="btn btn-secondary" onClick={onInstall}>
              安裝到手機
            </button>
          )}
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
