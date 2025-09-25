"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const node_crypto_1 = require("node:crypto");
const errorHandler_1 = require("../middleware/errorHandler");
const logger_1 = require("../utils/logger");
const router = (0, express_1.Router)();
const properties = new Map();
router.get('/', (_req, res) => {
    res.json({ items: Array.from(properties.values()), count: properties.size });
});
router.get('/:id', (req, res, next) => {
    const property = properties.get(req.params.id);
    if (!property) {
        return next(new errorHandler_1.ApiError(404, 'Property not found'));
    }
    res.json(property);
});
router.post('/', (req, res) => {
    var _a;
    const now = new Date().toISOString();
    const property = {
        ...req.body,
        propertyId: (_a = req.body.propertyId) !== null && _a !== void 0 ? _a : (0, node_crypto_1.randomUUID)(),
        createdAt: now,
        updatedAt: now,
    };
    properties.set(property.propertyId, property);
    logger_1.logger.info('Created property', property.propertyId);
    res.status(201).json(property);
});
router.put('/:id', (req, res, next) => {
    const existing = properties.get(req.params.id);
    if (!existing) {
        return next(new errorHandler_1.ApiError(404, 'Property not found'));
    }
    const updated = {
        ...existing,
        ...req.body,
        updatedAt: new Date().toISOString(),
    };
    properties.set(req.params.id, updated);
    logger_1.logger.info('Updated property', req.params.id);
    res.json(updated);
});
router.delete('/:id', (req, res, next) => {
    if (!properties.has(req.params.id)) {
        return next(new errorHandler_1.ApiError(404, 'Property not found'));
    }
    properties.delete(req.params.id);
    logger_1.logger.warn('Deleted property', req.params.id);
    res.status(204).send();
});
exports.default = router;
