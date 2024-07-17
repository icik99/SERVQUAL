import SurveyService from "../service/surveyService.js";

const create = async (req, res, next) =>{

    try {
        const payload = req.body
        const data =await  SurveyService.create(payload)
        res.status(200).json({
            status : 200,
            message: "thanks for submitted survey!",
            data: data,
        });
    } catch (error) {
        next(error);
    }
}

const get = async(req, res,next) => {
    try {
        const data =await  SurveyService.get(req.params.id)
        res.status(200).json({
            status : 200,
            message: "succes retrieved survey data!",
            data: data,
        });
    } catch (error) {
        next(error);
    }
}

export default {create, get}