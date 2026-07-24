export type Companion = 'solo' | 'family' | 'couple' | 'friends'

export type ActivityType =
  | 'outdoor'
  | 'indoor'
  | 'food'
  | 'culture'
  | 'nature'
  | 'shopping'
  | 'sports'
  | 'relax'

export type Duration = 'short' | 'halfday' | 'fullday'

export type Budget = 'free' | 'low' | 'mid' | 'high'

export type Season = 'spring' | 'summer' | 'autumn' | 'winter'

export type Festival =
  | 'cny'
  | 'chingming'
  | 'dragonboat'
  | 'midautumn'
  | 'halloween'
  | 'christmas'
  | 'summerholiday'

export type ActivityKind = 'classic' | 'niche'

export type { HkDistrict } from './data/districts'

import type { HkDistrict } from './data/districts'

export interface Activity {
  id: string
  kind: ActivityKind
  name: string
  description: string
  types: ActivityType[]
  companions: Companion[]
  duration: Duration
  budget: Budget
  /** Empty = 各區／唔指明地點 */
  districts: HkDistrict[]
  /** Shown only when user picks district filter(s) */
  placeLabel?: string
  seasons: Season[] | 'all'
  festivals?: Festival[]
  tips?: string
  heatFriendly?: boolean
  /** User-created, stored locally on device */
  custom?: boolean
}

export interface Filters {
  companion: Companion | 'any'
  types: ActivityType[]
  duration: Duration | 'any'
  budget: Budget | 'any'
  /** Multi-select 18 districts; empty = 唔限 */
  districts: HkDistrict[]
}

export interface ScoredActivity {
  activity: Activity
  score: number
  reasons: string[]
}

export type ActivityDraft = Omit<Activity, 'id' | 'custom' | 'districts' | 'placeLabel'> & {
  districts: HkDistrict[]
  placeLabel?: string
}
