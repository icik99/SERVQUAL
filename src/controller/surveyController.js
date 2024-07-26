import SurveyService from "../service/surveyService.js";

const create = async (req, res, next) =>{
    try {
        const payload = req.body
        const data = await  SurveyService.create(payload)
        res.status(200).json({
            status : 200,
            message: "thanks for submitted survey!",
            data: data,
        });
    } catch (error) {
        next(error);
    }
}

const getAll = async (req, res, next) =>{
    try  {
        const data =  await  SurveyService.getAll()
        res.status(200).json({
            status : 200,
            message: "succes retrieved all surveys data!",
            data: data,
        });
    }catch (error) {
        next(error);
    }
}

const getById = async(req, res,next) => {
    try {
        const data =await  SurveyService.getById(req.params.id)
        res.status(200).json({
            status : 200,
            message: "succes retrieved survey data!",
            data: data,
        });
    } catch (error) {
        next(error);
    }
}

export default {create, getById,getAll}