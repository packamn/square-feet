"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const env_1 = __importDefault(require("./config/env"));
const routes_1 = __importDefault(require("./routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: env_1.default.corsOrigin }));
app.use(express_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use('/api', routes_1.default);
app.get('/', (_req, res) => {
    res.json({ name: 'SquareFeet API', status: 'running' });
});
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
const server = app.listen(env_1.default.port, () => {
    console.log(`🚀 API running on port ${env_1.default.port} (${env_1.default.nodeEnv})`);
});
process.on('SIGTERM', () => {
    server.close(() => process.exit(0));
});
process.on('SIGINT', () => {
    server.close(() => process.exit(0));
});
