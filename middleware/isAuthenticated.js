// User cannot access resources unless logged in
module.exports = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  }
  return res.redirect('/login')
}
