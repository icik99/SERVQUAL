import express from "express";
import cors from "cors"
import { publicRouter } from "../routes/public.js";
import {errorMidleware} from "../middleware/error-middleware.js";

export const web = express();
web.use(express.json());
web.use(publicRouter);
web.use(cors())
web.use("/", errorMidleware );

