const accountRouter = require('./accounts')

function route(app) {
    app.use('/account', accountRouter)
}

module.exports = route
