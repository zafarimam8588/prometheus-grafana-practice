"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanupMiddleware = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
const activeRequestGuage = new prom_client_1.default.Gauge({
    name: "active_request",
    help: "No of active request",
});
const cleanupMiddleware = (req, res, next) => {
    activeRequestGuage.inc();
    res.on("finish", () => {
        activeRequestGuage.dec();
    });
    next();
};
exports.cleanupMiddleware = cleanupMiddleware;
