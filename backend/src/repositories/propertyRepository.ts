import {
  DeleteCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";

import { dynamoConfig } from "../config/dynamodb";
import type { Property } from "../models/property";
import { documentClient } from "../utils/dynamoClient";

type PropertyFilters = {
  status?: string;
  propertyType?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sellerId?: string;
};

const TABLE_NAME = dynamoConfig.tableName;

export const listProperties = async (filters: PropertyFilters = {}): Promise<Property[]> => {
  const response = await documentClient.send(
    new ScanCommand({
      TableName: TABLE_NAME,
    }),
  );

  const items = (response.Items as Property[]) ?? [];
  const statusFilter = filters.status?.split(',').map((value) => value.trim().toLowerCase());
  const searchTerm = filters.search?.toLowerCase();

  return items.filter((property) => {
    if (filters.sellerId && property.sellerId !== filters.sellerId) {
      return false;
    }

    if (statusFilter && statusFilter.length > 0 && !statusFilter.includes(property.status.toLowerCase())) {
      return false;
    }

    if (filters.propertyType && property.propertyType !== filters.propertyType) {
      return false;
    }

    if (filters.city && property.address.city.toLowerCase() !== filters.city.toLowerCase()) {
      return false;
    }

    if (typeof filters.minPrice === 'number' && property.price < filters.minPrice) {
      return false;
    }

    if (typeof filters.maxPrice === 'number' && property.price > filters.maxPrice) {
      return false;
    }

    if (searchTerm) {
      const haystack = `${property.title} ${property.description} ${property.address.city} ${property.address.state}`.toLowerCase();
      if (!haystack.includes(searchTerm)) {
        return false;
      }
    }

    return true;
  });
};

export const getPropertyById = async (
  propertyId: string,
): Promise<Property | null> => {
  const response = await documentClient.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      KeyConditionExpression: "propertyId = :pid",
      ExpressionAttributeValues: {
        ":pid": propertyId,
      },
      Limit: 1,
    }),
  );

  if (!response.Items || response.Items.length === 0) {
    return null;
  }

  return response.Items[0] as Property;
};

export const createProperty = async (property: Property): Promise<Property> => {
  await documentClient.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: property,
    }),
  );

  return property;
};

export const updateProperty = async (
  propertyId: string,
  updates: Partial<Property>,
): Promise<Property | null> => {
  const existing = await getPropertyById(propertyId);
  if (!existing) {
    return null;
  }

  const next: Property = {
    ...existing,
    ...updates,
    propertyId,
    updatedAt: new Date().toISOString(),
  };

  const statusChanged = updates.status && updates.status !== existing.status;

  if (statusChanged) {
    await documentClient.send(
      new DeleteCommand({
        TableName: TABLE_NAME,
        Key: {
          propertyId: existing.propertyId,
          status: existing.status,
        },
      }),
    );

    await createProperty(next);
    return next;
  }

  await documentClient.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: {
        propertyId: existing.propertyId,
        status: existing.status,
      },
      UpdateExpression:
        "set #title = :title, #description = :description, #price = :price, #currency = :currency, #address = :address, #propertyType = :propertyType, #bedrooms = :bedrooms, #bathrooms = :bathrooms, #squareFootage = :squareFootage, #lotSize = :lotSize, #yearBuilt = :yearBuilt, #features = :features, #images = :images, #sellerId = :sellerId, #updatedAt = :updatedAt",
      ExpressionAttributeNames: {
        "#title": "title",
        "#description": "description",
        "#price": "price",
        "#currency": "currency",
        "#address": "address",
        "#propertyType": "propertyType",
        "#bedrooms": "bedrooms",
        "#bathrooms": "bathrooms",
        "#squareFootage": "squareFootage",
        "#lotSize": "lotSize",
        "#yearBuilt": "yearBuilt",
        "#features": "features",
        "#images": "images",
        "#sellerId": "sellerId",
        "#updatedAt": "updatedAt",
      },
      ExpressionAttributeValues: {
        ":title": next.title,
        ":description": next.description,
        ":price": next.price,
        ":currency": next.currency,
        ":address": next.address,
        ":propertyType": next.propertyType,
        ":bedrooms": next.bedrooms,
        ":bathrooms": next.bathrooms,
        ":squareFootage": next.squareFootage,
        ":lotSize": next.lotSize,
        ":yearBuilt": next.yearBuilt,
        ":features": next.features,
        ":images": next.images,
        ":sellerId": next.sellerId,
        ":updatedAt": next.updatedAt,
      },
    }),
  );

  return next;
};

export const deleteProperty = async (propertyId: string): Promise<boolean> => {
  const existing = await getPropertyById(propertyId);
  if (!existing) {
    return false;
  }

  await documentClient.send(
    new DeleteCommand({
      TableName: TABLE_NAME,
      Key: {
        propertyId: existing.propertyId,
        status: existing.status,
      },
    }),
  );

  return true;
};
