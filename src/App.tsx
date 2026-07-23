import { useEffect, useState } from 'react'
import { DetailSheet } from './components/DetailSheet'
import { FilterPanel } from './components/FilterPanel'
import { Hero } from './components/Hero'
import { Results } from './components/Results'
import { getCalendarContext } from './data/calendar'
import { pickSurprise, recommend } from './lib/recommend'
import type { Filters, ScoredActivity } from './types'

const defaultFilters: Filters = {
  companion: 'any',
  types: [],
  duration: 'any',
  budget: 'any',
}

export default function App() {
  const calendar = getCalendarContext()
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [selected, setSelected] = useState<ScoredActivity | null>(null)
  const [installEvent, setInstallEvent] = useState<{
    prompt: () => Promise<void>
  } | null>(null)
  const [offline, setOffline] = useState(!navigator.onLine)

  const results = recommend(filters, calendar)

  useEffect(() => {
    const onBeforeInstall = (e: Event) => {
      e.preventDefault()
      const ev = e as Event & {
        prompt: () => Promise<void>
        userChoice: Promise<{ outcome: string }>
      }
      setInstallEvent({
        prompt: async () => {
          await ev.prompt()
        },
      })
    }
    const goOffline = () => setOffline(true)
    const goOnline = () => setOffline(false)
    window.addEventListener('beforeinstallprompt', onBeforeInstall)
    window.addEventListener('offline', goOffline)
    window.addEventListener('online', goOnline)
    return () => {
      window.removeEventListener('beforeinstallprompt', onBeforeInstall)
      window.removeEventListener('offline', goOffline)
      window.removeEventListener('online', goOnline)
    }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const scrollToFilters = () => {
    document.getElementById('filters')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      <div className="status-bar">
        {offline && <span className="status-pill">離線模式</span>}
        {installEvent && (
          <button
            type="button"
            className="status-pill status-action"
            onClick={() => void installEvent.prompt()}
          >
            安裝到主畫面
          </button>
        )}
      </div>

      <Hero calendar={calendar} onStart={scrollToFilters} />

      <main className="main">
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          onSurprise={() => {
            const pick = pickSurprise(filters, calendar)
            if (pick) setSelected(pick)
          }}
        />
        <Results
          results={results}
          seasonHint={calendar.hint}
          onSelect={setSelected}
        />
      </main>

      <footer className="footer">
        <p>今日去邊 · 資料內建於裝置，安裝後可離線使用</p>
        <p className="footer-note">共 {results.length} 個推薦 · 精選資料庫驗證版</p>
      </footer>

      <DetailSheet item={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
