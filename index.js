const express = require('express')
const app = express()
app.use(cors())
app.use(express.json())

app.use(require("./app/routes/urlsRouter"))
app.use(require("./app/routes/errorsRouter"))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`The app is 🏃🏃🏃 on 🚪:${PORT}`))
