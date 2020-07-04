const express = require("express")
const urlsRouter = express.Router()
const urlsController = require("../controllers/urlsController")

urlsRouter.get('/:lil', urlsController.fetchURL)

urlsRouter.post('/', urlsController.saveURL)

module.exports = urlsRouter