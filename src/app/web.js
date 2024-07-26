import express from "express";
import cors from "cors";
import { publicRouter } from "../routes/public.js";
import { errorMidleware } from "../middleware/error-middleware.js";

export const web = express();
web.use(express.json());


const corsOptions = {
    origin: 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept'],
};

web.use(cors(corsOptions));

web.use((req, res, next) => {
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

web.use(publicRouter);
web.use("/", errorMidleware);
