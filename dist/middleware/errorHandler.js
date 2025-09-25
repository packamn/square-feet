"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundHandler = exports.ApiError = void 0;
class ApiError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.ApiError = ApiError;
const notFoundHandler = (_req, res) => {
    res.status(404).json({ error: 'Not Found' });
};
exports.notFoundHandler = notFoundHandler;
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof ApiError) {
        return res.status(err.status).json({ error: err.message });
    }
    console.error('Unexpected error', err);
    return res.status(500).json({ error: 'Internal Server Error' });
};
exports.errorHandler = errorHandler;
