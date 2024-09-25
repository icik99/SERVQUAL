import { logger } from "./src/app/logger.js";
import { web } from "./src/app/web.js";

const port = process.env.PORT || 3000;

web.listen(port, () => {
    logger.info(`App is running on port ${port}`);
});

process.on('uncaughtException', (err) => {
    logger.error(`Uncaught Exception: ${err.message}`);
});
