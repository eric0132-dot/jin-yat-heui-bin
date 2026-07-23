import type { Festival, Season } from '../types'

export interface CalendarContext {
  date: Date
  season: Season
  seasonLabel: string
  festivals: Festival[]
  festivalLabels: string[]
  hint: string
}

const SEASON_LABELS: Record<Season, string> = {
  spring: '春季',
  summer: '夏季',
  autumn: '秋季',
  winter: '冬季',
}

const FESTIVAL_LABELS: Record<Festival, string> = {
  cny: '農曆新年',
  chingming: '清明時節',
  dragonboat: '端午龍舟',
  midautumn: '中秋',
  halloween: '萬聖節',
  christmas: '聖誕',
  summerholiday: '暑假',
}

/** Approximate HK festival windows by month/day (no lunar calc — good enough for offline tips). */
export function getActiveFestivals(date: Date): Festival[] {
  const m = date.getMonth() + 1
  const d = date.getDate()
  const festivals: Festival[] = []

  // CNY window roughly late Jan – mid Feb
  if ((m === 1 && d >= 20) || (m === 2 && d <= 20)) festivals.push('cny')
  // Ching Ming ~ early April
  if (m === 4 && d <= 12) festivals.push('chingming')
  // Dragon Boat ~ early–mid June
  if (m === 6 && d <= 20) festivals.push('dragonboat')
  // Mid-Autumn ~ mid Sep – early Oct
  if ((m === 9 && d >= 10) || (m === 10 && d <= 10)) festivals.push('midautumn')
  // Halloween late Oct
  if (m === 10 && d >= 20) festivals.push('halloween')
  // Christmas Dec
  if (m === 12) festivals.push('christmas')
  // Summer holiday Jul–Aug
  if (m === 7 || m === 8) festivals.push('summerholiday')

  return festivals
}

export function getSeason(date: Date): Season {
  const m = date.getMonth() + 1
  if (m >= 3 && m <= 5) return 'spring'
  if (m >= 6 && m <= 8) return 'summer'
  if (m >= 9 && m <= 11) return 'autumn'
  return 'winter'
}

function buildHint(season: Season, festivals: Festival[]): string {
  if (festivals.includes('cny')) return '新年氣氛濃，適合逛花市、行廟同家庭聚會。'
  if (festivals.includes('christmas')) return '聖誕燈飾同冬日行山都啱晒，記得帶外套。'
  if (festivals.includes('midautumn')) return '中秋前後適合維港賞月、食月餅同戶外晚間活動。'
  if (festivals.includes('dragonboat')) return '端午時節，不妨去岸邊睇龍舟或歎糉。'
  if (festivals.includes('halloween')) return '萬聖節氣氛旺，適合夜間市區遊同主題活動。'
  if (festivals.includes('chingming')) return '清明前後天氣轉暖，適合郊外踏青。'
  if (festivals.includes('summerholiday')) return '暑假炎熱潮濕，優先室內、水上或早晚戶外。'

  const seasonHints: Record<Season, string> = {
    spring: '春日氣溫宜人，行山、郊遊同戶外博物館都啱。',
    summer: '夏天炎熱多雨，建議室內、海島或清晨／黃昏出發。',
    autumn: '秋高氣爽，行山同戶外景點係黃金季節。',
    winter: '冬日清涼乾爽，適合長途行山、溫泉同市區漫步。',
  }
  return seasonHints[season]
}

export function getCalendarContext(date: Date = new Date()): CalendarContext {
  const season = getSeason(date)
  const festivals = getActiveFestivals(date)
  return {
    date,
    season,
    seasonLabel: SEASON_LABELS[season],
    festivals,
    festivalLabels: festivals.map((f) => FESTIVAL_LABELS[f]),
    hint: buildHint(season, festivals),
  }
}

export { SEASON_LABELS, FESTIVAL_LABELS }
