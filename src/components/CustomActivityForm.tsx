import { useState, type FormEvent } from 'react'
import { HK_DISTRICTS } from '../data/districts'
import {
  BUDGET_OPTIONS,
  COMPANION_OPTIONS,
  DURATION_OPTIONS,
  TYPE_OPTIONS,
} from '../data/labels'
import type {
  Activity,
  ActivityKind,
  ActivityType,
  Budget,
  Companion,
  Duration,
  HkDistrict,
} from '../types'
import { createCustomActivity } from '../lib/customStore'

interface Props {
  defaultKind: ActivityKind
  onAdd: (activity: Activity) => void
}

export function CustomActivityForm({ defaultKind, onAdd }: Props) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [kind, setKind] = useState<ActivityKind>(defaultKind)
  const [companions, setCompanions] = useState<Companion[]>(['solo'])
  const [types, setTypes] = useState<ActivityType[]>(['relax'])
  const [duration, setDuration] = useState<Duration>('short')
  const [budget, setBudget] = useState<Budget>('low')
  const [districts, setDistricts] = useState<HkDistrict[]>([])
  const [placeLabel, setPlaceLabel] = useState('')
  const [tips, setTips] = useState('')
  const [error, setError] = useState('')

  const toggleCompanion = (c: Companion) => {
    setCompanions((prev) =>
      prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c],
    )
  }

  const toggleType = (t: ActivityType) => {
    setTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t],
    )
  }

  const toggleDistrict = (d: HkDistrict) => {
    setDistricts((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d],
    )
  }

  const reset = () => {
    setName('')
    setDescription('')
    setKind(defaultKind)
    setCompanions(['solo'])
    setTypes(['relax'])
    setDuration('short')
    setBudget('low')
    setDistricts([])
    setPlaceLabel('')
    setTips('')
    setError('')
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !description.trim()) {
      setError('請填活動名稱同簡介。')
      return
    }
    if (companions.length === 0 || types.length === 0) {
      setError('請至少揀一種同行同類型。')
      return
    }

    const activity = createCustomActivity({
      kind,
      name: name.trim(),
      description: description.trim(),
      companions,
      types,
      duration,
      budget,
      districts,
      placeLabel: placeLabel.trim() || undefined,
      seasons: 'all',
      tips: tips.trim() || undefined,
      heatFriendly: types.includes('indoor'),
    })
    onAdd(activity)
    reset()
    setOpen(false)
  }

  return (
    <section className="panel custom-panel" id="custom">
      <div className="panel-head">
        <h2>自訂活動</h2>
        <p>加喺呢部裝置本地，離線都保留；唔會上傳。之後推薦會一併計入。</p>
      </div>

      {!open ? (
        <button type="button" className="btn btn-secondary" onClick={() => setOpen(true)}>
          新增活動
        </button>
      ) : (
        <form className="custom-form" onSubmit={onSubmit}>
          <label className="field">
            <span>名稱</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如：行天橋影相"
              maxLength={40}
            />
          </label>

          <label className="field">
            <span>簡介</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="簡單寫做咩、氣氛點"
              rows={3}
              maxLength={160}
            />
          </label>

          <div className="filter-block">
            <h3>歸類</h3>
            <div className="chip-row">
              <button
                type="button"
                className={`chip ${kind === 'classic' ? 'is-on' : ''}`}
                onClick={() => setKind('classic')}
              >
                經典
              </button>
              <button
                type="button"
                className={`chip ${kind === 'niche' ? 'is-on' : ''}`}
                onClick={() => setKind('niche')}
              >
                小眾
              </button>
            </div>
          </div>

          <div className="filter-block">
            <h3>同行</h3>
            <div className="chip-row">
              {COMPANION_OPTIONS.filter((o) => o.value !== 'any').map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`chip ${companions.includes(opt.value as Companion) ? 'is-on' : ''}`}
                  onClick={() => toggleCompanion(opt.value as Companion)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <h3>類型</h3>
            <div className="chip-row">
              {TYPE_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`chip ${types.includes(opt.value) ? 'is-on' : ''}`}
                  onClick={() => toggleType(opt.value)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <h3>時長</h3>
            <div className="chip-row">
              {DURATION_OPTIONS.filter((o) => o.value !== 'any').map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`chip ${duration === opt.value ? 'is-on' : ''}`}
                  onClick={() => setDuration(opt.value as Duration)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <h3>消費</h3>
            <div className="chip-row">
              {BUDGET_OPTIONS.filter((o) => o.value !== 'any').map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`chip ${budget === opt.value ? 'is-on' : ''}`}
                  onClick={() => setBudget(opt.value as Budget)}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-block">
            <h3>地區（可多選，可留空）</h3>
            <div className="chip-row chip-row-districts">
              {HK_DISTRICTS.map((d) => (
                <button
                  key={d}
                  type="button"
                  className={`chip ${districts.includes(d) ? 'is-on' : ''}`}
                  onClick={() => toggleDistrict(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <label className="field">
            <span>地點備註（可選）</span>
            <input
              value={placeLabel}
              onChange={(e) => setPlaceLabel(e.target.value)}
              placeholder="揀咗 18 區篩選時先顯示"
              maxLength={40}
            />
          </label>

          <label className="field">
            <span>小貼士（可選）</span>
            <input
              value={tips}
              onChange={(e) => setTips(e.target.value)}
              placeholder="例如：記得帶水"
              maxLength={80}
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <div className="filter-actions">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                reset()
                setOpen(false)
              }}
            >
              取消
            </button>
            <button type="submit" className="btn btn-primary">
              儲存到本機
            </button>
          </div>
        </form>
      )}
    </section>
  )
}
