const path = require('path')
const { createLogger, format, transports } = require('winston')
const { LOGGER_LEVEL } = require('./env')

const { combine, timestamp, label, printf, splat } = format

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    database: 3,
    debug: 4
  }
}

const createLoggerInstance = (filename) => {
  const logPath = `logs/${new Date().toISOString().slice(0, 10)}.log`
  const logger = createLogger({
    level: LOGGER_LEVEL,
    levels: customLevels.levels,
    format: combine(
      timestamp(),
      label({ label: path.basename(filename) }),
      splat(),
      printf((info) => {
        const { timestamp, level, label, message } = info
        const processId = process.pid
        return `[${timestamp}] [ProcessId=${processId}][${level}] ${label.toUpperCase()} - ${message}`
      })
    ),
    transports: [
      new (transports.Console)(),
      new (transports.File)({
        filename: logPath,
        format: format.json()
      })
    ]
  })

  return logger
}

module.exports = createLoggerInstance
