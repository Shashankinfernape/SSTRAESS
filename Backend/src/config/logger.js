// backend/src/config/logger.js
import 'dotenv/config';

const DEBUG = process.env.DEBUG_MODE === 'true';

const logger = {
  info: (message, ...args) => {
    console.log(`[INFO] ${message}`, ...args);
  },
  warn: (message, ...args) => {
    console.warn(`[WARN] ${message}`, ...args);
  },
  error: (message, error, ...args) => {
    console.error(`[ERROR] ${message}`, ...args);
    if (error && DEBUG) {
      // Log the full error stack in debug mode
      console.error(error.stack || error);
    }
  },
  debug: (message, ...args) => {
    if (DEBUG) {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  },
};

export default logger;