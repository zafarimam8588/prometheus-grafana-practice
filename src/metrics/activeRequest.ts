import { Request, Response, NextFunction } from "express";
import client from "prom-client";

const activeRequestGuage = new client.Gauge({
  name: "active_request",
  help: "No of active request",
});

export const cleanupMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  activeRequestGuage.inc();

  res.on("finish", () => {
    activeRequestGuage.dec();
  });
  next();
};
