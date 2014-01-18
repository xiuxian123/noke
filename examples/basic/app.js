
/**
 * Module dependencies.
 */

var noke = require('../../lib/noke');

var path = require('path');
var routes = require(path.join(__dirname, 'app', 'routes'));
var http = require('http');

var app = noke();

// all environments
app.set('port', process.env.PORT || 5210);
app.set('views', path.join(__dirname, 'app', 'views'));
app.set('view engine', 'ejs');
app.use(noke.favicon());
app.use(noke.logger('dev'));
app.use(noke.json());
app.use(noke.urlencoded());
app.use(noke.methodOverride());
app.use(app.router);
app.use(noke.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(noke.errorHandler());
}

routes.process(app);

// console.log(app.routes);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Noke app listening on port ' + app.get('port') + ' env: ' + app.get('env'));
});
