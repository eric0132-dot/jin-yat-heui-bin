import type { ActivityType, Budget, Companion, Duration, HkDistrict } from '../types'
import { HK_DISTRICTS } from './districts'

export const COMPANION_OPTIONS: { value: Companion | 'any'; label: string }[] = [
  { value: 'any', label: '唔限' },
  { value: 'solo', label: '單人' },
  { value: 'family', label: '家庭' },
  { value: 'couple', label: '情侶' },
  { value: 'friends', label: '朋友' },
]

export const TYPE_OPTIONS: { value: ActivityType; label: string }[] = [
  { value: 'outdoor', label: '戶外' },
  { value: 'indoor', label: '室內' },
  { value: 'nature', label: '郊遊' },
  { value: 'food', label: '美食' },
  { value: 'culture', label: '文化' },
  { value: 'shopping', label: '購物' },
  { value: 'sports', label: '運動' },
  { value: 'relax', label: '放鬆' },
]

export const DURATION_OPTIONS: { value: Duration | 'any'; label: string }[] = [
  { value: 'any', label: '唔限' },
  { value: 'short', label: '2 小時內' },
  { value: 'halfday', label: '半日' },
  { value: 'fullday', label: '全日' },
]

export const BUDGET_OPTIONS: { value: Budget | 'any'; label: string }[] = [
  { value: 'any', label: '唔限' },
  { value: 'free', label: '免費' },
  { value: 'low', label: '$100 內' },
  { value: 'mid', label: '$100–400' },
  { value: 'high', label: '$400+' },
]

export const DISTRICT_OPTIONS: { value: HkDistrict | 'any'; label: string }[] = [
  { value: 'any', label: '唔限' },
  ...HK_DISTRICTS.map((d) => ({ value: d, label: d })),
]

export const DURATION_LABEL: Record<Duration, string> = {
  short: '約 2 小時內',
  halfday: '約半日',
  fullday: '約全日',
}

export const BUDGET_LABEL: Record<Budget, string> = {
  free: '免費',
  low: '約 $100 內',
  mid: '約 $100–400',
  high: '約 $400 以上',
}

export const TYPE_LABEL: Record<ActivityType, string> = Object.fromEntries(
  TYPE_OPTIONS.map((o) => [o.value, o.label]),
) as Record<ActivityType, string>
