import {surveySchema, validate} from "../validator/validate.js";
import {db} from "../app/database.js"
import {ResponseError} from "../error/response-error.js";

const create = async (payload) => {

    const {nama, jenisKelamin, pendidikan, usia, surveyResult } = validate(surveySchema, payload)

    return await  db.respondent.create({
        data: {
            nama,
            jenisKelamin,
            pendidikan,
            usia,
            survey : {
                create : {
                    result : {
                        create : surveyResult.map((sur) => ({
                            dimension : sur.dimension,
                            perception : {
                                create : sur.answer.perception.map((per) => ({
                                    answer : per
                                }))
                            },expectation : {
                                create : sur.answer.expectation.map((per) => ({
                                    answer : per
                                }))
                            }
                        }))
                    }
                }
            }
        }, select : {
            nama : true, jenisKelamin : true, pendidikan: true, survey :{
                select : {
                    tanggal : true,
                    id : true
                }
            }
        }
    });


}


const get = async (payload) => {

    const data =  await db.survey.findFirst({
        where : {
            id : payload
        }, select : {
            tanggal : true,
            respondent : {
                select : {
                    nama : true,
                    usia : true,
                    jenisKelamin : true,
                    pendidikan : true,
                }
            }, result : {
                select : {
                    dimension : true,
                    expectation : {
                        select : {
                            answer : true
                        }
                    }, perception : {select : {answer : true}}
                }
            }
        }
    })

    if(!data) {
        throw new ResponseError(404, "Survey not found.");
    }

   return {
        tanggal: data.tanggal,
        respondent: data.respondent,
        result: data.result.map(item => ({
            dimension: item.dimension,
            expectation: item.expectation.map(answer => answer.answer),
            perception: item.perception.map(answer => answer.answer)
        }))
    }


}

export default {create, get};
