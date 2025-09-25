"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const node_path_1 = __importDefault(require("node:path"));
const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.local';
dotenv_1.default.config({ path: node_path_1.default.resolve(process.cwd(), envFile) });
const config = {
    port: Number((_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5001),
    nodeEnv: (_b = process.env.NODE_ENV) !== null && _b !== void 0 ? _b : 'development',
    corsOrigin: (_d = (_c = process.env.CORS_ORIGIN) === null || _c === void 0 ? void 0 : _c.split(',')) !== null && _d !== void 0 ? _d : '*',
};
exports.default = config;
