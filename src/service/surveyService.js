import {surveySchema, validate} from "../validator/validate.js";
import {db} from "../app/database.js"
import {ResponseError} from "../error/response-error.js";

const create = async (payload) => {

    const {nama, jenisKelamin, pendidikan, usia, surveyResult } = await validate(surveySchema, payload)

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


    const interpretation = (gap, dimension) => {
        let message = '';

    switch(dimension) {
        case 'Tangible':
            message = gap < 0 
                ? 'Memerlukan Perhatian Khusus, Fasilitas fisik, peralatan, atau penampilan staf tidak memenuhi harapan pelanggan. Perlu peningkatan kualitas fisik dan estetika untuk menciptakan kesan yang lebih baik.' 
                : gap === 0 
                    ? 'Memenuhi Harapan Pelanggan, Fasilitas dan penampilan saat ini sesuai dengan harapan pelanggan. Terus pertahankan standar ini untuk menjaga kepuasan.' 
                    : 'Fasilitas fisik dan penampilan melebihi harapan pelanggan. Ini menunjukkan bahwa aspek ini adalah kekuatan kompetitif yang harus dipertahankan dan ditonjolkan.';
            break;

        case 'Reliability':
            message = gap < 0 
                ? 'Memerlukan Perhatian Khusus, Keandalan layanan tidak memenuhi harapan pelanggan. Perlu peningkatan konsistensi dan ketepatan dalam penyampaian layanan.' 
                : gap === 0 
                    ? 'Memenuhi Harapan Pelanggan, Layanan saat ini konsisten dengan harapan pelanggan. Terus jaga konsistensi ini untuk memastikan kepuasan pelanggan.' 
                    : 'Layanan yang diberikan melebihi harapan pelanggan dalam hal keandalan. Ini menunjukkan bahwa area ini adalah keunggulan yang bisa dipromosikan.';
            break;

        case 'Responsiveness':
            message = gap < 0 
                ? 'Memerlukan Perhatian Khusus, Kesediaan untuk membantu atau kecepatan respons tidak memenuhi harapan pelanggan. Perbaiki kecepatan dan efektivitas tanggapan terhadap permintaan pelanggan.' 
                : gap === 0 
                    ? 'Memenuhi Harapan Pelanggan, Kecepatan dan kesiapan tanggapan saat ini sesuai dengan harapan pelanggan. Pertahankan standar ini untuk kepuasan pelanggan.' 
                    : 'Responsivitas layanan melebihi harapan pelanggan. Ini menunjukkan kekuatan dalam hal tanggapan cepat yang harus terus dipertahankan.';
            break;

        case 'Assurance':
            message = gap < 0 
                ? 'Memerlukan Perhatian Khusus, Pengetahuan, kepercayaan, dan kesopanan staf tidak memenuhi harapan pelanggan. Perlu pelatihan tambahan untuk meningkatkan kepercayaan pelanggan.' 
                : gap === 0 
                    ? 'Memenuhi Harapan Pelanggan, Staf saat ini cukup terampil dan sopan, sesuai dengan harapan pelanggan. Pertahankan kualitas ini untuk menjaga kepercayaan pelanggan.' 
                    : 'Kualitas jaminan dan kepercayaan melebihi harapan pelanggan. Ini menunjukkan bahwa staf memberikan kepercayaan lebih yang merupakan keunggulan layanan.';
            break;

        case 'Emphaty':
            message = gap < 0 
                ? 'Memerlukan Perhatian Khusus, Perhatian individual dan pemahaman terhadap kebutuhan pelanggan tidak memenuhi harapan. Perbaiki perhatian pribadi dan pemahaman terhadap pelanggan.' 
                : gap === 0 
                    ? 'Memenuhi Harapan Pelanggan, Staf saat ini menunjukkan perhatian dan pemahaman yang sesuai dengan harapan pelanggan. Terus jaga kualitas ini untuk kepuasan pelanggan.' 
                    : 'Perhatian dan pemahaman terhadap pelanggan melebihi harapan. Ini menunjukkan kekuatan dalam memberikan layanan personal yang harus terus dipertahankan.';
            break;

        default:
            message = 'Dimensi tidak dikenal: Pastikan dimensi yang diberikan benar.';
    }

    return message;
    }


   return  {
        tanggal: data.tanggal,
        respondent: data.respondent,
        result: data.result.map((item) => {
            const averageExp = average(item.expectation.map(answer => answer.answer))
            const averagePer = average(item.perception.map(answer => answer.answer))
            const gap = (averagePer - averageExp).toFixed(2)
            const resultInterpretation = interpretation(gap, item.dimension)
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
