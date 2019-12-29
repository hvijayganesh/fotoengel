const cron = require('node-cron');
const Mongoose = require("mongoose");
const config = require('../../config');
const ImageAccessor = require('../data-access/image-accessor');
const Constants = require('../common/constants');
const Mailer = require('../mailer/mailer');
const _ = require('lodash');

// cron scheduled for every 30 seconds to send all the uploaded images in email 
// Images uploaded to S3 are stored as metadata in the db and are processed
var task = cron.schedule('*/30 * * * * *', async () => {
  console.log('cron job started...')
  Mongoose.connect(config.mongoConnectionString, {useNewUrlParser: true});

  let imageAccessor = new ImageAccessor();
  let emailClient = new Mailer(config);
  let {to, from} = config.sendgrid;

  let imagesToBeSend = await imageAccessor.getImagesToBeSend();
  let totalImagesSent = 0;
  for (let [index, image] of imagesToBeSend.entries()) {
    try {
      await emailClient.send({
        to,
        from,
        template: Constants.TEMPLATE_NAME,
        subject: Constants.SUBJECT,
        data: {
          attachments: {
            file_name: image.file_name,
            path: image.url
          }
        }
      });
    } catch(err) {
      // skip processing if send email throws error
      imagesToBeSend.splice(index, 1);
      continue;
    }
      
      
    // Flag the image once email is sent
    image.is_email_sent = true;
    let result = await imageAccessor.update(image._id, image);
    if (result) {
      imagesToBeSend.splice(index, 1);
      totalImagesSent++;
    }
      
  }
  console.log(`A total of ${totalImagesSent} images has been delivered during this period.`);
}, {
	scheduled: false
});

// starts the cron job
task.start();