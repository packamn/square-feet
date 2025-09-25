export const dynamoConfig = {
  region: process.env.AWS_REGION ?? 'us-east-1',
  endpoint: process.env.DYNAMODB_ENDPOINT ?? 'http://localhost:8000',
  tableName: process.env.PROPERTIES_TABLE ?? 'Properties',
}
