import { createLogger, transports, format } from 'winston'
import 'winston-daily-rotate-file'

const { combine, timestamp, prettyPrint, printf, colorize } = format

const ENV: string = process.env.NODE_ENV ?? 'development'

const datetime = {
  fulldate: (): string => new Date().toLocaleString('en-GB'),
  onlytime: (): string => new Date().toTimeString().substring(0, 8),
}

const logFormat = printf(({ level, message, timestamp }) => {
  return `[${timestamp}] ${level}: ${message}`
})

const defaultOptions = {
  datePattern: 'DD-MM-YYYY',
  format: combine(timestamp({ format: datetime.fulldate }), logFormat),
  handleExceptions: true,
  maxFiles: 50,
  colorize: true,
}

const options = {
  info: {
    ...defaultOptions,
    level: 'info',
    filename: './logs/info-%DATE%.log',
    meta: true,
  },
  warning: {
    ...defaultOptions,
    level: 'warn',
    filename: './logs/warn-%DATE%.log',
  },
  error: {
    ...defaultOptions,
    level: 'error',
    filename: './logs/error-%DATE%.log',
    maxsize: 5242880, // 5MB
    format: combine(timestamp({ format: datetime.fulldate }), prettyPrint()),
  },
  console: {
    format: combine(
      colorize(),
      timestamp({
        format: ENV === 'production' ? datetime.fulldate : datetime.onlytime,
      }),
      logFormat,
    ),
  },
}

export const logger = createLogger({
  transports: [
    new transports.Console(options.console),
    new transports.DailyRotateFile(options.info),
    new transports.DailyRotateFile(options.warning),
    new transports.DailyRotateFile(options.error),
  ],
  exitOnError: false,
})
