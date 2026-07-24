import { activities } from '../data/activities'
import { isLocationSpecific } from '../data/districts'
import { nicheActivities } from '../data/nicheActivities'
import type { CalendarContext } from '../data/calendar'
import type { Activity, ActivityKind, Filters, ScoredActivity } from '../types'

function matchesSeason(activity: Activity, season: CalendarContext['season']): boolean {
  return activity.seasons === 'all' || activity.seasons.includes(season)
}

function poolFor(kind: ActivityKind): Activity[] {
  return kind === 'niche' ? nicheActivities : activities
}

export function recommend(
  filters: Filters,
  calendar: CalendarContext,
  kind: ActivityKind = 'classic',
  limit = 12,
): ScoredActivity[] {
  const scored: ScoredActivity[] = []
  const districtFilter = filters.district

  for (const activity of poolFor(kind)) {
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

    const specific = isLocationSpecific(activity.districts)
    const matchesDistrict =
      districtFilter !== 'any' && activity.districts.includes(districtFilter)

    // 揀咗 18 區先做地區分析：只留該區同「各區都行」
    if (districtFilter !== 'any' && specific && !matchesDistrict) {
      continue
    }

    let score = 10
    const reasons: string[] = []

    if (matchesDistrict) {
      score += 16
      reasons.push(`${districtFilter}推介`)
    } else if (districtFilter !== 'any' && !specific) {
      score += 3
      reasons.push('各區都行')
    }

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

    if (kind === 'niche' && reasons.length === 0) {
      reasons.push('小眾靈感')
    } else if (reasons.length === 0) {
      reasons.push('符合你嘅條件')
    }

    scored.push({ activity, score, reasons })
  }

  scored.sort(
    (a, b) =>
      b.score - a.score || a.activity.name.localeCompare(b.activity.name, 'zh-HK'),
  )
  return scored.slice(0, limit)
}

export function pickSurprise(
  filters: Filters,
  calendar: CalendarContext,
  kind: ActivityKind = 'classic',
): ScoredActivity | null {
  const list = recommend(filters, calendar, kind, 20)
  if (list.length === 0) return null
  const top = list.slice(0, Math.min(8, list.length))
  return top[Math.floor(Math.random() * top.length)] ?? null
}
