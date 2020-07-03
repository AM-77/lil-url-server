const fetchUrl = (req, res, next) => {
  const { urlId } = req.params
  res.redirect('link')
}

module.exports = { fetchUrl }