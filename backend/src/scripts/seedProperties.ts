import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { generateProperties } from '../utils/generateProperties'

const TOTAL_PROPERTIES = 24
const DATA_PATH = resolve(__dirname, '../data/properties.json')

const properties = generateProperties(TOTAL_PROPERTIES)

writeFileSync(DATA_PATH, JSON.stringify(properties, null, 2))

console.log(`Generated ${properties.length} properties at ${DATA_PATH}`)
