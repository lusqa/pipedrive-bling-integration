const startServer = require('./server')
startServer().then((server) => (module.exports = server))
