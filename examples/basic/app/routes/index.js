var filters = _load('filters');
var home    = _load('home');

function process(app) { 
  app.get('/', {name: 'root'}, filters.authorize, home.index);
  app.get('/u/:userName', {name: 'user'}, filters.authorize, home.index);
};

function _load(pathName) {
  return require('../controllers/' + pathName);
}

exports.process = process;
