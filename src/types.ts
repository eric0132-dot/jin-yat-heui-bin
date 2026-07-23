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

export interface Activity {
  id: string
  name: string
  description: string
  types: ActivityType[]
  companions: Companion[]
  duration: Duration
  budget: Budget
  districts: string[]
  seasons: Season[] | 'all'
  festivals?: Festival[]
  tips?: string
  heatFriendly?: boolean
}

export interface Filters {
  companion: Companion | 'any'
  types: ActivityType[]
  duration: Duration | 'any'
  budget: Budget | 'any'
}

export interface ScoredActivity {
  activity: Activity
  score: number
  reasons: string[]
}
