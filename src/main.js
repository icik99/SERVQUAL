import { logger } from "./app/logger.js";
import { web } from "./app/web.js";

web.listen(3000, () => {
	logger.info("App start");
});
