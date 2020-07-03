const express = require("express")
const errorsRouter = express.Router()

errorsRouter.use((req, res, next) => {
    let error = new Error("Not Found")
    error.status = 404
    next(error)
})

errorsRouter.use((error, req, res, next) => {
    res.status(error.status || 500)
        .json({
            error: {
                message: error.message,
                method: req.method,
                url: req.url
            }
        })
})

module.exports = errorsRouter