
/**
 * Module dependencies.
 */

var noke = require('../../lib/noke');
var routes = require('./config/routes');
var http = require('http');
var path = require('path');

var server = noke();

// all environments
server.set('port', process.env.PORT || 5210);
server.set('views', path.join(__dirname, 'app/views'));
server.set('view engine', 'ejs');
server.use(noke.favicon());
server.use(noke.logger('dev'));
server.use(noke.json());
server.use(noke.urlencoded());
server.use(noke.methodOverride());
server.use(server.router);
server.use(noke.static(path.join(__dirname, 'public')));

// development only
if ('development' == server.get('env')) {
  server.use(noke.errorHandler());
}

// app.
// app.locals.use(function(req, res) {
//   var language = req.session.language || "en";
//   res.locals.language = language;
//   res.locals.translate = function(clause) {
//     return translate(clause, language);
//   };
// });

routes.process(server);

http.createServer(server).listen(server.get('port'), function(){
  console.log('Noke server listening on port ' + server.get('port'));
});
