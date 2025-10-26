"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const node_crypto_1 = require("node:crypto");
const errorHandler_1 = require("../middleware/errorHandler");
const propertyRepository_1 = require("../repositories/propertyRepository");
const logger_1 = require("../utils/logger");
const validation_1 = require("../utils/validation");
const router = (0, express_1.Router)();
router.get('/', async (req, res, next) => {
    try {
        const { status, propertyType, city, minPrice, maxPrice, search } = req.query;
        const filters = {
            status: typeof status === 'string' ? status : undefined,
            propertyType: typeof propertyType === 'string' ? propertyType : undefined,
            city: typeof city === 'string' ? city : undefined,
            minPrice: typeof minPrice === 'string' ? Number(minPrice) : undefined,
            maxPrice: typeof maxPrice === 'string' ? Number(maxPrice) : undefined,
            search: typeof search === 'string' ? search : undefined,
        };
        const properties = await (0, propertyRepository_1.listProperties)(filters);
        res.json({ items: properties, count: properties.length });
    }
    catch (error) {
        next(error);
    }
});
router.get('/:id', async (req, res, next) => {
    try {
        const property = await (0, propertyRepository_1.getPropertyById)(req.params.id);
        if (!property) {
            return next(new errorHandler_1.ApiError(404, 'Property not found'));
        }
        return res.json(property);
    }
    catch (error) {
        return next(error);
    }
});
router.post('/', async (req, res, next) => {
    var _a, _b, _c, _d, _e;
    try {
        const parseResult = validation_1.propertySchema.safeParse(req.body);
        if (!parseResult.success) {
            return next(new errorHandler_1.ApiError(400, parseResult.error.message));
        }
        const now = new Date().toISOString();
        const body = parseResult.data;
        const property = {
            ...body,
            propertyId: (_a = body.propertyId) !== null && _a !== void 0 ? _a : (0, node_crypto_1.randomUUID)(),
            createdAt: now,
            updatedAt: now,
            status: (_b = body.status) !== null && _b !== void 0 ? _b : 'pending',
            sellerId: (_c = body.sellerId) !== null && _c !== void 0 ? _c : 'SELLER_DEMO_001',
            features: (_d = body.features) !== null && _d !== void 0 ? _d : [],
            images: (_e = body.images) !== null && _e !== void 0 ? _e : [],
        };
        await (0, propertyRepository_1.createProperty)(property);
        logger_1.logger.info('Created property', {
            propertyId: property.propertyId,
            title: property.title,
            sellerId: property.sellerId,
            status: property.status,
            price: property.price,
            location: `${property.address.city}, ${property.address.state}`
        });
        res.status(201).json(property);
    }
    catch (error) {
        logger_1.logger.error('Failed to create property', error);
        next(error);
    }
});
router.put('/:id', async (req, res, next) => {
    try {
        const parseResult = validation_1.propertySchema.partial().safeParse(req.body);
        if (!parseResult.success) {
            return next(new errorHandler_1.ApiError(400, parseResult.error.message));
        }
        const updates = parseResult.data;
        // Set timestamps based on status change
        if (updates.status === 'approved') {
            updates.approvedAt = new Date().toISOString();
        }
        else if (updates.status === 'rejected') {
            updates.rejectedAt = new Date().toISOString();
        }
        const updated = await (0, propertyRepository_1.updateProperty)(req.params.id, updates);
        if (!updated) {
            return next(new errorHandler_1.ApiError(404, 'Property not found'));
        }
        logger_1.logger.info('Updated property', {
            propertyId: req.params.id,
            status: updates.status,
            changes: Object.keys(updates),
        });
        return res.json(updated);
    }
    catch (error) {
        logger_1.logger.error('Failed to update property', error);
        return next(error);
    }
});
router.delete('/:id', async (req, res, next) => {
    try {
        const removed = await (0, propertyRepository_1.deleteProperty)(req.params.id);
        if (!removed) {
            return next(new errorHandler_1.ApiError(404, 'Property not found'));
        }
        logger_1.logger.warn('Deleted property', req.params.id);
        return res.status(204).send();
    }
    catch (error) {
        return next(error);
    }
});
exports.default = router;
