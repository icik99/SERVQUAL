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


const getById = async (payload) => {

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


    const average = (arr) => {
        if (arr.length < 1) {
            return 0;
        }
        return (arr.reduce((a, b) => a + b, 0)) / arr.length
    }


    const interpretation = (gap) => {
        if (gap < 0) {
            return 'Memerlukan Perhatian Khusus'
        }

        return 'Kelebihan / Keunggulan Layanan'
    }


   return  {
        tanggal: data.tanggal,
        respondent: data.respondent,
        result: data.result.map((item) => {
            const averageExp = average(item.expectation.map(answer => answer.answer))
            const averagePer = average(item.perception.map(answer => answer.answer))
            const gap = averagePer - averageExp
            const resultInterpretation = interpretation(gap)
            return ({
                dimension: item.dimension,
                average : {
                    expectation : averageExp,
                    perception : averagePer
                },
                gap,
                interpretation : resultInterpretation
            })
        })

    }


}

const getAll = async () => {
     const data = await  db.survey.findMany({
        select : {
            respondent : {
                select : {
                    nama : true, usia : true,pendidikan : true, jenisKelamin : true
                }
            }, id : true, tanggal : true
        }
    })


    if (data.length === 0){
        throw new ResponseError(404, "No Surveys not found");
    }

    return data

}

export default {create, getById, getAll};
