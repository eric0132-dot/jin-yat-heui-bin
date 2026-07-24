import { useEffect, useState } from 'react'
import { CustomActivityForm } from './components/CustomActivityForm'
import { DetailSheet } from './components/DetailSheet'
import { FilterPanel } from './components/FilterPanel'
import { Hero } from './components/Hero'
import { Results } from './components/Results'
import { getCalendarContext } from './data/calendar'
import {
  deleteCustomActivity,
  loadCustomActivities,
  saveCustomActivities,
} from './lib/customStore'
import { catalogSize, pickSurprise, recommend } from './lib/recommend'
import type { Activity, ActivityKind, Filters, ScoredActivity } from './types'

const defaultFilters: Filters = {
  companion: 'any',
  types: [],
  duration: 'any',
  budget: 'any',
  districts: [],
}

export default function App() {
  const calendar = getCalendarContext()
  const [view, setView] = useState<ActivityKind>('classic')
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [selected, setSelected] = useState<ScoredActivity | null>(null)
  const [custom, setCustom] = useState<Activity[]>([])
  const [installEvent, setInstallEvent] = useState<{
    prompt: () => Promise<void>
  } | null>(null)
  const [offline, setOffline] = useState(!navigator.onLine)

  useEffect(() => {
    setCustom(loadCustomActivities())
  }, [])

  const results = recommend(filters, calendar, view, custom)
  const showLocation = filters.districts.length > 0
  const totalCatalog = catalogSize(view, custom)

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

  const switchView = (next: ActivityKind) => {
    setView(next)
    setSelected(null)
  }

  const handleAddCustom = (activity: Activity) => {
    const next = [...custom, activity]
    setCustom(next)
    saveCustomActivities(next)
    setView(activity.kind)
  }

  const handleDeleteCustom = (id: string) => {
    const next = deleteCustomActivity(custom, id)
    setCustom(next)
    saveCustomActivities(next)
    setSelected(null)
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

      <nav className="view-tabs" aria-label="活動分類">
        <button
          type="button"
          className={`view-tab ${view === 'classic' ? 'is-on' : ''}`}
          aria-pressed={view === 'classic'}
          onClick={() => switchView('classic')}
        >
          經典推薦
        </button>
        <button
          type="button"
          className={`view-tab ${view === 'niche' ? 'is-on' : ''}`}
          aria-pressed={view === 'niche'}
          onClick={() => switchView('niche')}
        >
          小眾活動
        </button>
      </nav>

      <Hero calendar={calendar} view={view} onStart={scrollToFilters} />

      <main className="main">
        <FilterPanel
          filters={filters}
          onChange={setFilters}
          onSurprise={() => {
            const pick = pickSurprise(filters, calendar, view, custom)
            if (pick) setSelected(pick)
          }}
        />
        <Results
          results={results}
          seasonHint={calendar.hint}
          view={view}
          showLocation={showLocation}
          onSelect={setSelected}
        />
        <CustomActivityForm defaultKind={view} onAdd={handleAddCustom} />
      </main>

      <footer className="footer">
        <p>今日去邊 · 資料內建於裝置，安裝後可離線使用</p>
        <p className="footer-note">
          顯示 {results.length} 個推薦 · 本頁資料庫 {totalCatalog} 項
          {custom.length > 0 ? `（含自訂 ${custom.length}）` : ''}
          {showLocation ? ` · ${filters.districts.join('、')}` : ''}
        </p>
      </footer>

      <DetailSheet
        item={selected}
        showLocation={showLocation}
        onClose={() => setSelected(null)}
        onDeleteCustom={handleDeleteCustom}
      />
    </div>
  )
}
