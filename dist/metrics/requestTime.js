"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Totaltimemiddleware = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
const httpRequestDurationMicroseconds = new prom_client_1.default.Histogram({
    name: "http_request_duration_ms",
    help: "Time taken in ms",
    labelNames: ["method", "route", "status_code"],
    buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
});
const Totaltimemiddleware = (req, res, next) => {
    const startTime = Date.now();
    const endTime = Date.now();
    const duration = endTime - startTime;
    res.on("finish", () => {
        httpRequestDurationMicroseconds.observe({
            method: req.method,
            route: req.route ? req.route.path : req.route,
            status_code: res.statusCode,
        }, duration);
    });
    next();
};
exports.Totaltimemiddleware = Totaltimemiddleware;
