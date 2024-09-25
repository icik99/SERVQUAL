import express from "express";
import SurveyController from "../controller/surveyController.js";
const publicRouter = express.Router();

publicRouter.post('/api/survey', SurveyController.create);
publicRouter.get('/api/survey', SurveyController.getAll);
publicRouter.get('/api/survey/:id', SurveyController.getById);
publicRouter.get('/api/rekap-survey', SurveyController.getAllAverage);

export { publicRouter };
