import { useEffect, useState } from 'react'
import { CustomActivityForm } from './components/CustomActivityForm'
import { DetailSheet } from './components/DetailSheet'
import { FilterPanel } from './components/FilterPanel'
import { Hero } from './components/Hero'
import { InstallPrompt } from './components/InstallPrompt'
import { Results } from './components/Results'
import { getCalendarContext } from './data/calendar'
import {
  deleteCustomActivity,
  loadCustomActivities,
  saveCustomActivities,
} from './lib/customStore'
import { isStandaloneDisplay } from './lib/install'
import { catalogSize, pickSurprise, recommend } from './lib/recommend'
import type { Activity, ActivityKind, AppView, Filters, ScoredActivity } from './types'

const defaultFilters: Filters = {
  companion: 'any',
  types: [],
  duration: 'any',
  budget: 'any',
  districts: [],
}

export default function App() {
  const calendar = getCalendarContext()
  const [view, setView] = useState<AppView>('classic')
  const [filters, setFilters] = useState<Filters>(defaultFilters)
  const [selected, setSelected] = useState<ScoredActivity | null>(null)
  const [custom, setCustom] = useState<Activity[]>([])
  const [offline, setOffline] = useState(!navigator.onLine)
  const [installed, setInstalled] = useState(isStandaloneDisplay)

  useEffect(() => {
    setCustom(loadCustomActivities())
  }, [])

  const results = recommend(filters, calendar, view, custom)
  const showLocation = filters.districts.length > 0
  const totalCatalog = catalogSize(view, custom)
  const formKind: ActivityKind = view === 'niche' ? 'niche' : 'classic'

  useEffect(() => {
    const goOffline = () => setOffline(true)
    const goOnline = () => setOffline(false)
    const onInstalled = () => setInstalled(true)
    window.addEventListener('offline', goOffline)
    window.addEventListener('online', goOnline)
    window.addEventListener('appinstalled', onInstalled)
    return () => {
      window.removeEventListener('offline', goOffline)
      window.removeEventListener('online', goOnline)
      window.removeEventListener('appinstalled', onInstalled)
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

  const scrollToInstall = () => {
    document.getElementById('install')?.scrollIntoView({ behavior: 'smooth' })
  }

  const switchView = (next: AppView) => {
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
        {installed && <span className="status-pill">已安裝</span>}
        {!installed && (
          <button
            type="button"
            className="status-pill status-action"
            onClick={scrollToInstall}
          >
            安裝 App
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
        <button
          type="button"
          className={`view-tab ${view === 'all' ? 'is-on' : ''}`}
          aria-pressed={view === 'all'}
          onClick={() => switchView('all')}
        >
          全部推薦
        </button>
      </nav>

      <Hero
        calendar={calendar}
        view={view}
        onStart={scrollToFilters}
        onInstall={installed ? undefined : scrollToInstall}
      />

      <main className="main">
        <InstallPrompt />
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
        <CustomActivityForm defaultKind={formKind} onAdd={handleAddCustom} />
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
