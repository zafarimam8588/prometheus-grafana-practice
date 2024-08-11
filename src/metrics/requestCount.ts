import client from "prom-client";
import { Request, Response, NextFunction } from "express";

const requestCounter = new client.Counter({
  name: "http_total_request",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"],
});

export const requestCountMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.on("finish", () => {
    requestCounter.inc({
      method: req.method,
      route: req.route ? req.route.path : req.path,
      status_code: res.statusCode,
    });
  });

  next();
};
