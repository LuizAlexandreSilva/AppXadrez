module.exports = async (req, res, next) => {
  const sessionId = req.session.uid;

  if (!sessionId) {
    return res.redirect('/login')
  }
  return next();
}