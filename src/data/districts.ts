/** Official Hong Kong 18 districts */
export const HK_DISTRICTS = [
  '中西區',
  '灣仔區',
  '東區',
  '南區',
  '油尖旺區',
  '深水埗區',
  '九龍城區',
  '黃大仙區',
  '觀塘區',
  '荃灣區',
  '屯門區',
  '元朗區',
  '北區',
  '大埔區',
  '西貢區',
  '沙田區',
  '葵青區',
  '離島區',
] as const

export type HkDistrict = (typeof HK_DISTRICTS)[number]

/** Map neighbourhood / place labels → 18 districts; 各區 = anywhere */
const PLACE_TO_DISTRICT: Record<string, HkDistrict | 'any'> = {
  各區: 'any',
  各區岸邊: 'any',
  新界: 'any',
  港島: 'any',
  新界郊野: 'any',
  中西區: '中西區',
  中環: '中西區',
  金鐘: '中西區',
  半山: '中西區',
  灣仔: '灣仔區',
  灣仔區: '灣仔區',
  銅鑼灣: '灣仔區',
  維園: '灣仔區',
  東區: '東區',
  北角: '東區',
  港島東: '東區',
  南區: '南區',
  黃竹坑: '南區',
  赤柱: '南區',
  油尖旺: '油尖旺區',
  油尖旺區: '油尖旺區',
  尖沙咀: '油尖旺區',
  油麻地: '油尖旺區',
  旺角: '油尖旺區',
  西九龍: '油尖旺區',
  西九: '油尖旺區',
  深水埗: '深水埗區',
  深水埗區: '深水埗區',
  九龍城: '九龍城區',
  九龍城區: '九龍城區',
  黃大仙: '黃大仙區',
  黃大仙區: '黃大仙區',
  觀塘: '觀塘區',
  觀塘區: '觀塘區',
  荃灣: '荃灣區',
  荃灣區: '荃灣區',
  屯門: '屯門區',
  屯門區: '屯門區',
  元朗: '元朗區',
  元朗區: '元朗區',
  天水圍: '元朗區',
  北區: '北區',
  大埔: '大埔區',
  大埔區: '大埔區',
  西貢: '西貢區',
  西貢區: '西貢區',
  沙田: '沙田區',
  沙田區: '沙田區',
  葵青: '葵青區',
  葵青區: '葵青區',
  離島: '離島區',
  離島區: '離島區',
  大嶼山: '離島區',
  南丫島: '離島區',
  長洲: '離島區',
}

export function normalizeDistricts(raw: string[]): HkDistrict[] {
  const set = new Set<HkDistrict>()
  for (const place of raw) {
    const mapped = PLACE_TO_DISTRICT[place]
    if (!mapped || mapped === 'any') continue
    set.add(mapped)
  }
  return [...set]
}

export function placeLabelFrom(raw: string[]): string | undefined {
  const labels = raw.filter((p) => PLACE_TO_DISTRICT[p] !== 'any')
  return labels.length > 0 ? labels.join('、') : undefined
}

export function isLocationSpecific(districts: HkDistrict[]): boolean {
  return districts.length > 0
}
