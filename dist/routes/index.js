"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const properties_1 = __importDefault(require("./properties"));
const router = (0, express_1.Router)();
router.get('/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});
router.get('/status', (_req, res) => {
    var _a;
    res.json({
        service: 'square-feet-api',
        uptime: process.uptime(),
        env: (_a = process.env.NODE_ENV) !== null && _a !== void 0 ? _a : 'development',
    });
});
router.use('/properties', properties_1.default);
exports.default = router;
