import fs from 'fs';
import path from 'path';

const LOG_DIR = path.join(process.cwd(), 'logs');
const LOG_FILE = path.join(LOG_DIR, 'server.log');

// Ensure log directory exists
if (!fs.existsSync(LOG_DIR)) {
  fs.mkdirSync(LOG_DIR, { recursive: true });
}

// Create a write stream for the log file
const logStream = fs.createWriteStream(LOG_FILE, { flags: 'a' });

// Helper function to format the log message
const formatLogMessage = (level: string, message: string, meta?: any) => {
  const timestamp = new Date().toISOString();
  const metaString = meta ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] ${level}: ${message}${metaString}`;
};

// Logger object with different log levels
export const logger = {
  info: (message: string, meta?: any) => {
    const logMessage = formatLogMessage('INFO', message, meta);
    console.log(logMessage.trim());
  },

  error: (message: string, meta?: any) => {
    const logMessage = formatLogMessage('ERROR', message, meta);
    console.error(logMessage.trim());
  },

  warn: (message: string, meta?: any) => {
    const logMessage = formatLogMessage('WARN', message, meta);
    console.warn(logMessage.trim());
  },

  debug: (message: string, meta?: any) => {
    const logMessage = formatLogMessage('DEBUG', message, meta);
    console.debug(logMessage.trim());
  }
}; 