const urlsController = require("../controllers/urlsController")

app.get('/:urlId', urlsController.fetchUrl)