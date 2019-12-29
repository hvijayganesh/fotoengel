'use strict';

const Config = {
  server: {
    host: 'localhost',
    port: '3006'
  },
  sendgrid: {
    api_key: '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',
    to: 'coding-challenge@mieterengel.de',
    from: 'FotoEngel <fotoengel@mieterengel.de>'
  },
  aws: {
    access_key_id: 'AKIAIKOWZSB6XFQA5NIQ',
    secret_key: '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',
    bucket: 'fotoengel',
    region: 'us-west-2'
  },
  mongoConnectionString: 'mongodb://127.0.0.1:27017/fotoengel'
}

module.exports = Config;