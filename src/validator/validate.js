import Joi from "joi";
import { ResponseError } from "../error/response-error.js";

const surveySchema = Joi.object({
	nama: Joi.string().allow(null, ""),
	jenisKelamin: Joi.string().valid('MALE', 'FEMALE').required()
		.messages({
			'any.only': 'jenisKelamin must be either MALE or FEMALE',
			'any.required': 'jenisKelamin is a required field'
		}),
	pendidikan: Joi.string().required()
		.messages({
			'string.base': 'pendidikan must be a string',
			'string.empty': "pendidikan can't be empty",  // Custom message for empty string
			'any.required': 'pendidikan is a required field'
		}),
	usia: Joi.string().required()
		.messages({
			'string.base': 'usia must be a string',
			'string.empty': "usia can't be empty",
			'any.required': 'usia is a required field'
		}),
	surveyResult: Joi.array().items(
		Joi.object({
			dimension: Joi.string().required()
				.messages({
					'string.base': 'dimension must be a string',
					'string.empty': "dimension can't be empty",
					'any.required': 'dimension is a required field'
				}),
			answer: Joi.object({
				expectation: Joi.array().items(
					Joi.number().integer().min(1).max(7).required()
						.messages({
							'number.base': 'expectation answer must be a number',
							'number.integer': 'expectation answer must be an integer',
							'number.min': 'expectation answer must be greater than or equal to 1',
							'number.max': 'expectation answer must be less than or equal to 7',
							'any.required': 'expectation answer is a required field'
						})
				).required()
					.messages({
						'array.base': 'expectation must be an array',
						'array.includesRequiredUnknowns': 'expectation must contain at least one item'
					}),
				perception: Joi.array().items(
					Joi.number().integer().min(1).max(7).required()
						.messages({
							'number.base': 'perception answer must be a number',
							'number.integer': 'perception answer must be an integer',
							'number.min': 'perception answer must be greater than or equal to 1',
							'number.max': 'perception answer must be less than or equal to 7',
							'any.required': 'perception answer is a required field'
						})
				).required()
					.messages({
						'array.base': 'perception must be an array',
						'array.includesRequiredUnknowns': 'perception must contain at least one item'
					})
			}).required()
				.messages({
					'object.base': 'result must be an object',
					'any.required': 'result is a required field'
				})
		}).required()
			.messages({
				'object.base': 'survey item must be an object',
				'any.required': 'survey item is a required field'
			})
	).required()
		.messages({
			'array.base': 'survey must be an array',
			'array.includesRequiredUnknowns': 'survey must contain at least one item'
		})
});

const validate = (schema, payload) => {
	const result = schema.validate(payload);

	if (result.error) {
		throw new ResponseError(400, result.error.message);
	} else {
		return result.value;
	}
};


export { validate, surveySchema };
