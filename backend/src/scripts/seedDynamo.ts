import { BatchWriteCommand } from '@aws-sdk/lib-dynamodb'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import { dynamoConfig } from '../config/dynamodb'
import type { Property } from '../models/property'
import { documentClient } from '../utils/dynamoClient'

const DATA_PATH = resolve(__dirname, '../data/properties.json')

const properties: Property[] = JSON.parse(readFileSync(DATA_PATH, 'utf-8'))

const batches: Property[][] = []
for (let i = 0; i < properties.length; i += 25) {
  batches.push(properties.slice(i, i + 25))
}

async function seed() {
  for (const batch of batches) {
    await documentClient.send(
      new BatchWriteCommand({
        RequestItems: {
          [dynamoConfig.tableName]: batch.map((item: Property) => ({
            PutRequest: {
              Item: item,
            },
          })),
        },
      }),
    )
  }

  console.log(`Seeded ${properties.length} properties into ${dynamoConfig.tableName}`)
}

seed().catch((error) => {
  console.error('Failed to seed data', error)
  process.exit(1)
})
