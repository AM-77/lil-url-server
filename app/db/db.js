const sqlite3 = require("sqlite3")

const connect = (db_name) => {
  return new sqlite3.Database(db_name, (err) => {
    if (err) throw new Error("DB ERROR: connect ", err.message)
  })
}

const createTable = (db) => {
  db.run("CREATE TABLE lilUrls (url TEXT, lil TEXT)", (err) => {
    if (err) throw new Error("DB ERROR: createTable ", err.message)
  })

  return true
}

const emptyTable = (db) => {
  db.run("DELETE FROM lilUrls", (err) => {
    if (err) throw new Error("DB ERROR: emptyTable ", err.message)
  })

  return true
}

const close = (db) => {
  return db.close((err) => { if (err) throw new Error("DB ERROR: close ", err.message) })
}

const insertUrl = (db, url, lil) => {
  return new Promise((resolve, reject) => {
    db.run("INSERT INTO lilUrls VALUES (?, ?)", url, lil, function(err, rows) {
      if (err) reject(new Error("DB ERROR: select ", err.message))
      resolve(true)
    })
  })
}

const selectLil = (db, lil) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT * FROM lilUrls WHERE lil='${lil}'`, function(err, rows) {
      if (err) reject(new Error("DB ERROR: select ", err.message))
      resolve(rows)
    })
  })
}

const selectUrl = (db, lil) => {
  return new Promise((resolve, reject) => {
    db.all(`SELECT url FROM lilUrls WHERE lil='${lil}'`, function(err, rows) {
      if (err) reject(new Error("DB ERROR: select ", err.message))
      resolve(rows)
    })
  })
}

module.exports = { connect, close, createTable, emptyTable, insertUrl, selectUrl, selectLil }