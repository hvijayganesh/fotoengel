"use strict";

const NotificationService = require('../service/notification-service');
const AwsService = require('../service/aws-service');

class RouteHandler {
  constructor(config) {
    this.config = config;
  }
  
  async sendEmail(request, h) {
    const me = this;
    const notificationService = new NotificationService(this.config);
    try {
      let result = await notificationService.sendEmail(request.payload);
      return me.replySuccess(h, result);
    } catch (error) {
      return me.replyError(h, error);
    }
  }

  async getSignedUrl(request, h) {
    const me = this;
    const awsService = new AwsService(this.config);
    try {
      let result = await awsService.getSignedUrl(request.payload);
      return me.replySuccess(h, result);
    } catch (error) {
      return me.replyError(h, error);
    }
  }

  replySuccess (h, message) {
    let statusCode = 200;
    if(message && message.statusCode){
      statusCode = message.statusCode
    }
    return h.response(message).code(statusCode);
  }

  replyError(h, error) {
    return h.response(JSON.stringify(error)).code(error.statusCode || error.status || 500);
  }
}

module.exports = RouteHandler;