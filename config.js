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
  mongoConnectionString: 'mongodb://localhost:27017/fotoengel'
}

module.exports = Config;