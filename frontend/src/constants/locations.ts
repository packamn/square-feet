export const TELANGANA_STATE = 'Telangana'
export const HYDERABAD_CITY = 'Hyderabad'

export const HYDERABAD_AREAS = [
  'Nagole',
  'Gachibowli',
  'HITEC City',
  'Kukatpally',
  'Ameerpet',
  'Jubilee Hills',
  'Banjara Hills',
  'Secunderabad',
  'Bowenpally',
  'Malkajgiri',
  'Saroor Nagar',
  'Tolichowki',
  'Attapur',
  'Dilsukhnagar',
  'LB Nagar',
  'Uppal',
  'Kompally',
  'Miyapur',
  'Kondapur',
  'Madhapur',
] as const

export type HyderabadArea = typeof HYDERABAD_AREAS[number]

