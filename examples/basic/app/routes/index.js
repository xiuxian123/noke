var filters = _load('filters');
var home    = _load('home');

function process(app) { 
  app.get('/', {name: 'root', constrains: {host: 'localhost'}}, filters.authorize, home.index);
  app.get('/u/:userName/:version/:page', {name: 'user', defaults: {version: 'gggg'}}, filters.authorize, home.index);
  // app.get('/u/:userName/:userAage/:userLocation-:aaa-:bbb', {name: 'user'}, filters.authorize, home.index);
};

function _load(pathName) {
  return require('../controllers/' + pathName);
}

exports.process = process;
