const fs = require('fs');

module.exports = {
    devServer(configFunction) {
        return function (proxy, allowedHost) {
          const config = configFunction(proxy, allowedHost);
          config.disableHostCheck = true
          config.https = {
            key: fs.readFileSync('codi.jrds.key'),
            cert: fs.readFileSync('codi.jrds.crt'),
            ca: fs.readFileSync('codiCA.pem'),
          }          
          //config.headers = config.headers || {}
          //config.headers['Access-Control-Allow-Origin'] = '*'
          return config
        }
    }
} 
