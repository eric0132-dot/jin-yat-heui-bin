import type { Activity, ActivityDraft } from '../types'
import { normalizeDistricts, placeLabelFrom } from '../data/districts'

const STORAGE_KEY = 'jin-yat-heui-bin:custom-activities:v1'

function isActivity(value: unknown): value is Activity {
  if (!value || typeof value !== 'object') return false
  const a = value as Activity
  return (
    typeof a.id === 'string' &&
    typeof a.name === 'string' &&
    (a.kind === 'classic' || a.kind === 'niche') &&
    Array.isArray(a.types) &&
    Array.isArray(a.companions) &&
    Array.isArray(a.districts)
  )
}

export function loadCustomActivities(): Activity[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed.filter(isActivity).map((a) => ({ ...a, custom: true }))
  } catch {
    return []
  }
}

export function saveCustomActivities(list: Activity[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list))
}

export function createCustomActivity(draft: ActivityDraft): Activity {
  const districts = draft.districts
  return {
    ...draft,
    id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    districts,
    placeLabel:
      draft.placeLabel?.trim() ||
      (districts.length > 0 ? districts.join('、') : undefined),
    custom: true,
  }
}

/** Helper when draft still uses raw place strings */
export function draftFromRawPlaces(
  draft: Omit<ActivityDraft, 'districts'> & { places: string[] },
): ActivityDraft {
  return {
    ...draft,
    districts: normalizeDistricts(draft.places),
    placeLabel: draft.placeLabel || placeLabelFrom(draft.places),
  }
}

export function deleteCustomActivity(list: Activity[], id: string): Activity[] {
  return list.filter((a) => a.id !== id)
}
