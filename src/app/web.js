import express from "express";
import cors from "cors"
import { publicRouter } from "../routes/public.js";
import {errorMidleware} from "../middleware/error-middleware.js";

export const web = express();
web.use(express.json());
web.use(cors())
web.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
})
web.use("/", errorMidleware );


web.use(publicRouter);

