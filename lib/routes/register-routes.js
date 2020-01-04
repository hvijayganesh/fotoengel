'use strict';
const RouteHandler = require('./route-handler');
const Path = require('path');

class RegisterRoutes {
  constructor(config) {
    this.config = config;
    this.routeHandler = new RouteHandler(this.config);
  }

  register(server) {
    const me = this;
    server.log('Registering routes for fotoengel service');

    // healthcheck route
    server.route([{
      method: ['GET', 'POST'],
      path: '/ping',
      handler: (req, reply) => {
        reply('Hello world!');
      }
    }]);

    server.route({
      method: 'GET',
      path: '/{path*}',
      handler: {
        directory: {
          path: Path.join(__dirname, process.env.CLIENT_BUILD_PATH || '../../client/build'),
          listing: false,
          index: true
        }
      }
    })

    server.route({
      method: 'GET',
      path: '/foto/aboutus',
      handler: (request, h) => me.routeHandler.sendEmail(request, h),
    })

    server.route({
      method: 'POST',
      path: '/foto/sign_s3/',
      config: {
        description: 'Make a request to the S3 API to get a signed URL which we can use to upload our file',
        handler: (request, h) => me.routeHandler.getSignedUrl(request, h)
      }
    })
  }
}

module.exports = RegisterRoutes;