/*
 * GET home page.
 */

exports.index = function(req, res){
// console.log(req.params);
// console.log(req.query);
// console.log(req.url);
// console.log(req);
  res.render('home/index', { title: 'Noke' });
};
