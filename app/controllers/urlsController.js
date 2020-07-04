const nanoid = require("nanoid")
const { connect, close, insertUrl, selectUrl, selectLil } =  require("../db/db")

const fetchURL = async (req, res, next) => {
  const { lil } = req.params
  const db = connect('lil_db')
  const urls = (await selectUrl(db, lil))
  close(db)

  if (urls.length > 0) {
    const { url } = urls[0]
    res.json({ code: 200, url })
  } else {
    res.json({ code: 404,  message: "lil URL does not exist." })
  }
}

const saveURL = async (req, res, next) => {
  let { lil, url } = req.body
  const db = connect('lil_db')
  let result = {}

  if ( lil && lil.length === 5 ) {
    if (await isValidLil(db, lil)) {
      const inserted = await insertUrl(db, url, lil)
      if ( inserted ) {
        result = { code: 200, lil, message: "your lil URL created successfully" }
      } else {
        result = { code: 500, message: "database error" }
      }
    } else {
      result = { code: 405, message: "Lil already've been used" }
    }
  } else {
    while (!(await isValidLil(db, lil))) {
      lil = nanoid.nanoid(5)
    }
    const inserted = await insertUrl(db, url, lil)
    if ( inserted ) {
      result = { code: 200, lil, message: "lil URL created successfully" }
    } else {
      result = { code: 500, message: "database error" }
    }
  }

  close(db)
  res.json({...result})
}

const isValidLil = async (db, lil) => {
  const lils = await selectLil(db, lil)
  if (!lil || lils.length > 0) return false
  else return true
}

module.exports = { fetchURL, saveURL }