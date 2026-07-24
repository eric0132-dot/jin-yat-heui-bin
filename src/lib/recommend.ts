import { activities } from '../data/activities'
import { isLocationSpecific } from '../data/districts'
import { nicheActivities } from '../data/nicheActivities'
import type { CalendarContext } from '../data/calendar'
import type { Activity, AppView, Filters, ScoredActivity } from '../types'

function matchesSeason(activity: Activity, season: CalendarContext['season']): boolean {
  return activity.seasons === 'all' || activity.seasons.includes(season)
}

function poolFor(view: AppView, custom: Activity[]): Activity[] {
  if (view === 'all') {
    return [...activities, ...nicheActivities, ...custom]
  }
  const base = view === 'niche' ? nicheActivities : activities
  return [...base, ...custom.filter((a) => a.kind === view)]
}

export function recommend(
  filters: Filters,
  calendar: CalendarContext,
  view: AppView = 'classic',
  custom: Activity[] = [],
  limit?: number,
): ScoredActivity[] {
  const scored: ScoredActivity[] = []
  const districtFilters = filters.districts
  const effectiveLimit =
    limit ?? (view === 'all' ? Number.POSITIVE_INFINITY : 16)

  for (const activity of poolFor(view, custom)) {
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

    if (view === 'all') {
      reasons.push(activity.kind === 'niche' ? '小眾' : '經典')
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

    if (filters.companion === 'solo' && activity.companions.includes('solo')) {
      score += 5
      if (activity.duration === 'short') {
        score += 3
        reasons.push('單人短途')
      } else {
        reasons.push('適合單人')
      }
    }

    if (
      filters.companion === 'schoolPickup' &&
      activity.companions.includes('schoolPickup')
    ) {
      score += 10
      reasons.push('放學前啱做')
      if (activity.duration === 'short') {
        score += 4
      }
    }

    // Prefer TKO / Hang Hau short solos when user picked 西貢區
    if (
      filters.companion === 'solo' &&
      districtFilters.includes('西貢區') &&
      activity.districts.includes('西貢區') &&
      activity.duration === 'short'
    ) {
      score += 8
      reasons.push('將軍澳／坑口一帶')
    }

    if (
      filters.companion === 'schoolPickup' &&
      districtFilters.includes('西貢區') &&
      activity.districts.includes('西貢區') &&
      activity.duration === 'short'
    ) {
      score += 8
      reasons.push('將軍澳／坑口一帶')
    }

    if (activity.kind === 'niche' && view !== 'all' && reasons.length === 0) {
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

  if (!Number.isFinite(effectiveLimit)) return scored
  return scored.slice(0, effectiveLimit)
}

export function pickSurprise(
  filters: Filters,
  calendar: CalendarContext,
  view: AppView = 'classic',
  custom: Activity[] = [],
): ScoredActivity | null {
  const list = recommend(filters, calendar, view, custom, 24)
  if (list.length === 0) return null
  const top = list.slice(0, Math.min(8, list.length))
  return top[Math.floor(Math.random() * top.length)] ?? null
}

export function catalogSize(view: AppView, custom: Activity[]): number {
  return poolFor(view, custom).length
}
