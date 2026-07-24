import { activities } from '../data/activities'
import { isLocationSpecific } from '../data/districts'
import { nicheActivities } from '../data/nicheActivities'
import type { CalendarContext } from '../data/calendar'
import type { Activity, ActivityKind, Filters, ScoredActivity } from '../types'

function matchesSeason(activity: Activity, season: CalendarContext['season']): boolean {
  return activity.seasons === 'all' || activity.seasons.includes(season)
}

function poolFor(kind: ActivityKind, custom: Activity[]): Activity[] {
  const base = kind === 'niche' ? nicheActivities : activities
  return [...base, ...custom.filter((a) => a.kind === kind)]
}

export function recommend(
  filters: Filters,
  calendar: CalendarContext,
  kind: ActivityKind = 'classic',
  custom: Activity[] = [],
  limit = 16,
): ScoredActivity[] {
  const scored: ScoredActivity[] = []
  const districtFilters = filters.districts

  for (const activity of poolFor(kind, custom)) {
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
    const matchedDistricts =
      districtFilters.length > 0
        ? activity.districts.filter((d) => districtFilters.includes(d))
        : []

    // 揀咗區先做地區分析：只留重疊區同「各區都行」
    if (districtFilters.length > 0 && specific && matchedDistricts.length === 0) {
      continue
    }

    let score = 10
    const reasons: string[] = []

    if (matchedDistricts.length > 0) {
      score += 12 + matchedDistricts.length * 4
      reasons.push(
        matchedDistricts.length === 1
          ? `${matchedDistricts[0]}推介`
          : `${matchedDistricts.length}區吻合`,
      )
    } else if (districtFilters.length > 0 && !specific) {
      score += 3
      reasons.push('各區都行')
    }

    if (activity.custom) {
      score += 5
      reasons.push('自訂')
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
  custom: Activity[] = [],
): ScoredActivity | null {
  const list = recommend(filters, calendar, kind, custom, 24)
  if (list.length === 0) return null
  const top = list.slice(0, Math.min(8, list.length))
  return top[Math.floor(Math.random() * top.length)] ?? null
}

export function catalogSize(kind: ActivityKind, custom: Activity[]): number {
  return poolFor(kind, custom).length
}
