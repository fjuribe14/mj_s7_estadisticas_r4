import cors from "cors";
import helmet from "helmet";
import express from "express";
import compression from "compression";
import { BaseMiddleware, MiddlewareContract } from "@ant/framework";

const jsonM = class extends BaseMiddleware {
  handle = express.json();
};
const xmlM = class extends BaseMiddleware {
  handle = express.text({ type: "application/xml" });
};
const corsM = class extends BaseMiddleware {
  handle = cors();
};
const compressM = class extends BaseMiddleware {
  handle = compression();
};
const formM = class extends BaseMiddleware {
  handle = express.urlencoded({ extended: false });
};
const helmetM = class extends BaseMiddleware {
  handle = helmet();
};

export const GlobalMiddlewares: (new () => MiddlewareContract)[] = [
  jsonM,
  xmlM,
  formM,
  corsM,
  helmetM,
  compressM,
];
