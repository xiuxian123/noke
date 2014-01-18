exports.authorize = function(req, res, next) {
  if(req.query.user == 'wang') {
    res.redirect('/login');
  } else {
    next();
  }
}
