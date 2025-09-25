import { CreateTableCommand, ListTablesCommand } from '@aws-sdk/client-dynamodb'

import { dynamoConfig } from '../config/dynamodb'
import { rawClient } from '../utils/dynamoClient'

async function ensureTable() {
  const tables = await rawClient.send(new ListTablesCommand({}))

  const exists = tables.TableNames?.includes(dynamoConfig.tableName)
  if (exists) {
    console.log(`Table ${dynamoConfig.tableName} already exists`)
    return
  }

  console.log(`Creating table ${dynamoConfig.tableName}...`)
  await rawClient.send(
    new CreateTableCommand({
      TableName: dynamoConfig.tableName,
      AttributeDefinitions: [
        { AttributeName: 'propertyId', AttributeType: 'S' },
        { AttributeName: 'status', AttributeType: 'S' },
      ],
      KeySchema: [
        { AttributeName: 'propertyId', KeyType: 'HASH' },
        { AttributeName: 'status', KeyType: 'RANGE' },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    }),
  )

  console.log('Waiting for table to become active...')
  await new Promise((resolve) => setTimeout(resolve, 3000))
  console.log(`Table ${dynamoConfig.tableName} created.`)
}

async function run() {
  try {
    await ensureTable()
  } catch (error) {
    console.error('Failed to create table', error)
    process.exit(1)
  }
}

run()
