import express from "express";

import { publicRouter } from "../routes/public.js";
import { errorMiddlware } from "../middleware/error-middleware.js";

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use("/", errorMiddlware);
