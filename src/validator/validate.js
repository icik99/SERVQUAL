import Joi from "joi";
import { ResponseError } from "../error/response-error.js";

const respondedSchema = Joi.object({
	nama: Joi.string().allow(null, ""),
	jenisKelamin: Joi.string().required().messages({
		"any.required": "Jenis Kelamin Tidak Boleh Kosong",
		"string.empty": "Jenis Kelamin Tidak Boleh Kosong",
	}),
	pendidikan: Joi.string().required().messages({
		"any.required": "Pendidikan Tidak Boleh Kosong",
		"string.empty": "Pendidikan Tidak Boleh Kosong",
	}),
	usia: Joi.string().required().messages({
		"any.required": "Usia Tidak Boleh Kosong",
		"string.empty": "Usia Tidak Boleh Kosong",
	}),
});

const validate = (schema, payload) => {
	const result = schema.validate(payload);
	if (result.error) {
		throw new ResponseError(400, result.error.message);
	} else {
		return result.value;
	}
};

export { validate, respondedSchema };
