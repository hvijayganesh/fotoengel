'use strict';

const Config = {
  server: {
    host: 'localhost',
    port: '5000'
  },
  sendgrid: {
    api_key: '#####',
    to: 'hvijayganesh@gmail.com',
    from: 'FotoEngel <fotoengel@mieterengel.de>'
  },
  aws: {
    access_key_id: '###',
    secret_key: '####',
    bucket: 'fotoengel',
    region: 'us-west-2'
  },
  mongoConnectionString: 'mongodb://localhost:27017/fotoengel',
  mlab: "mongodb://heroku_msp29q92:jq2fe2r481ti5t0foufdisp40e@ds059471.mlab.com:59471/heroku_msp29q92",
}

module.exports = Config;