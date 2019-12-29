"use strict";

const Mailer = require('../mailer/mailer');
const ImageAccessor = require('../data-access/image-accessor');

class NotificationService {
  constructor(config) {
    this.config = config;
    this.mailer = new Mailer(config);
    this.imageAccessor = new ImageAccessor();
  }
  
  async sendEmail(payload) {
    const me = this;
    try {
      let imagesTobeSent = await this.imageAccessor.getImagesToBeSent()
      console.log(imagesTobeSent);
      //let user = {email: me.config.sendgrid.to_email}
      //await me.mailer.send('photo-notification', user, 'New Photo Alert')
      return true;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = NotificationService;