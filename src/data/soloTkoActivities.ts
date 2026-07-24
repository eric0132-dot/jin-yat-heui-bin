/** Solo-friendly short (<2h) boredom-busters around Tseung Kwan O / Hang Hau. */
export const soloTkoSeed: Array<{
  id: string
  name: string
  description: string
  types: Array<
    | 'outdoor'
    | 'indoor'
    | 'food'
    | 'culture'
    | 'nature'
    | 'shopping'
    | 'sports'
    | 'relax'
  >
  companions: Array<'solo' | 'family' | 'couple' | 'friends'>
  duration: 'short' | 'halfday' | 'fullday'
  budget: 'free' | 'low' | 'mid' | 'high'
  districts: string[]
  seasons: 'all' | Array<'spring' | 'summer' | 'autumn' | 'winter'>
  festivals?: Array<
    | 'cny'
    | 'chingming'
    | 'dragonboat'
    | 'midautumn'
    | 'halloween'
    | 'christmas'
    | 'summerholiday'
  >
  tips?: string
  heatFriendly?: boolean
}> = [
  {
    id: 'tko-promenade-solo',
    name: '將軍澳海濱長廊散步',
    description: '沿海濱吹風行一圈，睇海同對岸，一個人放空最啱兩小時內。',
    types: ['outdoor', 'relax', 'sports'],
    companions: ['solo', 'couple', 'family'],
    duration: 'short',
    budget: 'free',
    districts: ['將軍澳'],
    seasons: 'all',
    tips: '黃昏至入夜燈光更舒服；帶耳機都行。',
  },
  {
    id: 'hang-hau-village-solo',
    name: '坑口村掃街解悶',
    description: '行村口小店、食碗粉麵或者甜品，短短一轉心情會好啲。',
    types: ['food', 'outdoor', 'culture'],
    companions: ['solo', 'friends'],
    duration: 'short',
    budget: 'low',
    districts: ['坑口'],
    seasons: 'all',
  },
  {
    id: 'tko-mall-solo',
    name: '將軍澳商場放空',
    description: 'PopCorn、東港城或新都城慢慢行，睇人、食嘢、吹冷氣。',
    types: ['shopping', 'indoor', 'food', 'relax'],
    companions: ['solo', 'friends', 'couple'],
    duration: 'short',
    budget: 'low',
    districts: ['將軍澳', '坑口'],
    seasons: 'all',
    heatFriendly: true,
    festivals: ['summerholiday'],
  },
  {
    id: 'lohas-waterfront-solo',
    name: '康城海濱慢行',
    description: '康城一帶海傍散步，空間開揚，適合一個人靜靜行。',
    types: ['outdoor', 'relax', 'nature'],
    companions: ['solo', 'couple', 'family'],
    duration: 'short',
    budget: 'free',
    districts: ['康城', '將軍澳南'],
    seasons: 'all',
  },
  {
    id: 'tko-library-solo',
    name: '將軍澳圖書館充電',
    description: '借位睇書、睇雜誌或者發呆，安靜又唔使使錢。',
    types: ['indoor', 'culture', 'relax'],
    companions: ['solo'],
    duration: 'short',
    budget: 'free',
    districts: ['將軍澳'],
    seasons: 'all',
    heatFriendly: true,
  },
  {
    id: 'tko-cinema-solo',
    name: '將軍澳／坑口睇戲',
    description: '商場戲院獨自睇一場，兩小時內消磨得舒服。',
    types: ['indoor', 'relax'],
    companions: ['solo', 'couple', 'friends'],
    duration: 'short',
    budget: 'low',
    districts: ['將軍澳', '坑口'],
    seasons: 'all',
    heatFriendly: true,
  },
  {
    id: 'tko-park-jog-solo',
    name: '將軍澳公園緩跑',
    description: '公園路徑跑一圈或者快走，流汗解悶一流。',
    types: ['sports', 'outdoor', 'relax'],
    companions: ['solo', 'friends'],
    duration: 'short',
    budget: 'free',
    districts: ['將軍澳'],
    seasons: 'all',
    tips: '夏天建議早晚去，避開正午。',
  },
  {
    id: 'tiu-keng-leng-solo',
    name: '調景嶺海傍散步',
    description: '調景嶺一帶公園同海景短行，交通方便，一個人都自在。',
    types: ['outdoor', 'relax'],
    companions: ['solo', 'couple'],
    duration: 'short',
    budget: 'free',
    districts: ['調景嶺', '將軍澳'],
    seasons: 'all',
  },
  {
    id: 'velodrome-park-solo',
    name: '香港單車館公園散步',
    description: '公園草地同設施區閒逛，短休解悶。',
    types: ['outdoor', 'relax', 'sports'],
    companions: ['solo', 'family', 'friends'],
    duration: 'short',
    budget: 'free',
    districts: ['將軍澳'],
    seasons: ['autumn', 'winter', 'spring'],
  },
  {
    id: 'hang-hau-cafe-solo',
    name: '坑口咖啡店坐低',
    description: '找間 Cafe 叫杯嘢，睇書或者發呆，雨天大熱都啱。',
    types: ['food', 'indoor', 'relax'],
    companions: ['solo', 'couple'],
    duration: 'short',
    budget: 'mid',
    districts: ['坑口'],
    seasons: 'all',
    heatFriendly: true,
  },
  {
    id: 'tko-pool-solo',
    name: '將軍澳泳池游水',
    description: '室內或室外泳池游幾轉，消暑兼放電（視開放期）。',
    types: ['sports', 'indoor', 'relax'],
    companions: ['solo', 'friends'],
    duration: 'short',
    budget: 'low',
    districts: ['將軍澳'],
    seasons: ['summer', 'autumn', 'spring'],
    heatFriendly: true,
    festivals: ['summerholiday'],
  },
  {
    id: 'tko-cycle-short-solo',
    name: '將軍澳單車徑短騎',
    description: '租或自備單車，沿區內單車徑騎一小時左右就夠解悶。',
    types: ['sports', 'outdoor'],
    companions: ['solo', 'friends', 'couple'],
    duration: 'short',
    budget: 'low',
    districts: ['將軍澳', '坑口', '康城'],
    seasons: ['autumn', 'winter', 'spring'],
  },
  {
    id: 'tko-bookstore-solo',
    name: '商場書店／動漫店閒逛',
    description: '坑口或將軍澳商場內書店慢慢睇，唔買都過癮。',
    types: ['shopping', 'indoor', 'culture', 'relax'],
    companions: ['solo'],
    duration: 'short',
    budget: 'free',
    districts: ['坑口', '將軍澳'],
    seasons: 'all',
    heatFriendly: true,
  },
  {
    id: 'tko-night-promenade-solo',
    name: '將軍澳海濱夜行',
    description: '晚飯後一個人行海濱睇夜燈，短途就夠散心。',
    types: ['outdoor', 'relax'],
    companions: ['solo', 'couple'],
    duration: 'short',
    budget: 'free',
    districts: ['將軍澳'],
    seasons: 'all',
  },
  {
    id: 'tko-karaoke-solo',
    name: '商場唱 K 短唱',
    description: '一個人開房唱幾首歌，大聲解悶，兩小時內搞掂。',
    types: ['indoor', 'relax'],
    companions: ['solo', 'friends'],
    duration: 'short',
    budget: 'mid',
    districts: ['將軍澳', '坑口'],
    seasons: 'all',
    heatFriendly: true,
  },
  {
    id: 'tko-dessert-solo',
    name: '坑口／將軍澳歎甜品',
    description: '豆花、糖水或甜品店坐低，甜一下心情會好。',
    types: ['food', 'indoor', 'relax'],
    companions: ['solo', 'friends', 'couple'],
    duration: 'short',
    budget: 'low',
    districts: ['坑口', '將軍澳'],
    seasons: 'all',
    heatFriendly: true,
  },
  {
    id: 'tko-photo-walk-solo',
    name: '將軍澳街拍散步',
    description: '帶電話影海濱、建築同街景，當自己攝影師解悶。',
    types: ['outdoor', 'culture', 'relax'],
    companions: ['solo'],
    duration: 'short',
    budget: 'free',
    districts: ['將軍澳', '坑口', '康城'],
    seasons: 'all',
  },
  {
    id: 'clear-water-bay-lookout-solo',
    name: '清水灣道短途睇海',
    description: '巴士或的士短途到望海位吹風，唔使行長程都解悶。',
    types: ['outdoor', 'nature', 'relax'],
    companions: ['solo', 'couple'],
    duration: 'short',
    budget: 'low',
    districts: ['清水灣', '西貢'],
    seasons: ['autumn', 'winter', 'spring'],
    tips: '交通時間要計埋；天氣清朗先啱。',
  },
]
