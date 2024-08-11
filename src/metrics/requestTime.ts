import client from "prom-client";
import { Request, Response, NextFunction } from "express";
const httpRequestDurationMicroseconds = new client.Histogram({
  name: "http_request_duration_ms",
  help: "Time taken in ms",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.1, 5, 15, 50, 100, 300, 500, 1000, 3000, 5000],
});

export const Totaltimemiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const startTime = Date.now();
  const endTime = Date.now();
  const duration = endTime - startTime;
  res.on("finish", () => {
    httpRequestDurationMicroseconds.observe(
      {
        method: req.method,
        route: req.route ? req.route.path : req.route,
        status_code: res.statusCode,
      },
      duration
    );
  });
  next();
};
