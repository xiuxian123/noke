function process(server) { 
  var home = require('../app/routes/home');
  
  server.get('/', home.index);
};

exports.process = process;