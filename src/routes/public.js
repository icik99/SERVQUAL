import express from "express";
import {test, testPost} from "../controller/test.js";

const publicRouter = express.Router();

publicRouter.get("/api/test", test);
publicRouter.post("/api/test", testPost);

export { publicRouter };
