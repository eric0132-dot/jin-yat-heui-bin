import { motion } from 'framer-motion'

interface Props {
  onStart: () => void
}

export function CookHero({ onStart }: Props) {
  return (
    <header className="hero hero-cook">
      <div className="hero-glow" aria-hidden />
      <div className="hero-grid" aria-hidden />
      <motion.div
        className="hero-inner"
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="hero-kicker">茶餐廳 · 連鎖 · 家常菜 · 可離線查</p>
        <h1 className="brand">今日煮咩好</h1>
        <p className="hero-lead">
          按早餐、午餐、晚餐、湯水同煮食時間揀；每道菜有 1–3 人份量材料、步驟同主味標籤。
        </p>
        <div className="hero-cta">
          <button type="button" className="btn btn-primary" onClick={onStart}>
            開始揀食譜
          </button>
        </div>
      </motion.div>
    </header>
  )
}
