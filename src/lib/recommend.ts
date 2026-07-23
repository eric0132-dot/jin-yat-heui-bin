import { activities } from '../data/activities'
import type { CalendarContext } from '../data/calendar'
import type { Activity, Filters, ScoredActivity } from '../types'

function matchesSeason(activity: Activity, season: CalendarContext['season']): boolean {
  return activity.seasons === 'all' || activity.seasons.includes(season)
}

export function recommend(
  filters: Filters,
  calendar: CalendarContext,
  limit = 12,
): ScoredActivity[] {
  const scored: ScoredActivity[] = []

  for (const activity of activities) {
    if (
      filters.companion !== 'any' &&
      !activity.companions.includes(filters.companion)
    ) {
      continue
    }

    if (filters.duration !== 'any' && activity.duration !== filters.duration) {
      continue
    }

    if (filters.budget !== 'any' && activity.budget !== filters.budget) {
      continue
    }

    if (
      filters.types.length > 0 &&
      !filters.types.some((t) => activity.types.includes(t))
    ) {
      continue
    }

    let score = 10
    const reasons: string[] = []

    if (matchesSeason(activity, calendar.season)) {
      score += 8
      reasons.push(`啱${calendar.seasonLabel}`)
    } else if (activity.seasons !== 'all') {
      score -= 4
    }

    const festHits =
      activity.festivals?.filter((f) => calendar.festivals.includes(f)) ?? []
    if (festHits.length > 0) {
      score += 14 * festHits.length
      reasons.push('時節精選')
    }

    if (
      (calendar.season === 'summer' ||
        calendar.festivals.includes('summerholiday')) &&
      activity.heatFriendly
    ) {
      score += 6
      reasons.push('消暑友善')
    }

    if (
      calendar.season === 'autumn' &&
      activity.types.includes('nature') &&
      matchesSeason(activity, 'autumn')
    ) {
      score += 4
    }

    if (filters.companion === 'family' && activity.companions.includes('family')) {
      score += 2
    }

    if (reasons.length === 0) reasons.push('符合你嘅條件')

    scored.push({ activity, score, reasons })
  }

  scored.sort((a, b) => b.score - a.score || a.activity.name.localeCompare(b.activity.name, 'zh-HK'))
  return scored.slice(0, limit)
}

export function pickSurprise(
  filters: Filters,
  calendar: CalendarContext,
): ScoredActivity | null {
  const list = recommend(filters, calendar, 20)
  if (list.length === 0) return null
  const top = list.slice(0, Math.min(8, list.length))
  return top[Math.floor(Math.random() * top.length)] ?? null
}
