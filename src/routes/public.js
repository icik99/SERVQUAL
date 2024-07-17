import express from "express";
import SurveyController from "../controller/surveyController.js";
import SurveyService from "../service/surveyService.js";
import surveyController from "../controller/surveyController.js";
const publicRouter = express.Router();

publicRouter.post('/api/survey', SurveyController.create);
publicRouter.get('/api/survey/:id', surveyController.get);

export { publicRouter };
