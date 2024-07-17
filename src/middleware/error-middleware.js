import { ResponseError } from "../error/response-error.js";

const errorMidleware = async (err, req, res, next) => {

	if (!err) {
		next();
		return;
	}

	if (err instanceof ResponseError) {
		res
			.status(err.status)
			.json({
				message: err.message,
				errors: err.status,
			})
			.end();
	} else {
		res
			.status(500)
			.json({
				message: "Internal Server Error",
				errors: 500,
			})
			.end();
	}
};

export { errorMidleware };
