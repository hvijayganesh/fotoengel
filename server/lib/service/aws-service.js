"use strict";

const aws = require('aws-sdk');
const ImageAccessor = require('../data-access/image-accessor');
const _ = require('lodash');

class AwsService {
  constructor(config) {
    this.config = config;
   
    aws.config.update({
      region: this.config.aws.region,
      accessKeyId: this.config.aws.access_key_id,
      secretAccessKey: this.config.aws.secret_key
    });

    this.imageAccessor = new ImageAccessor();
  }

  async _getSignedRequest(s3, s3Params) {
    const me = this;
    try {
      let data = await s3.getSignedUrl('putObject', s3Params);
      // Data payload of what we are sending back, the url of the signedRequest and a URL where we can access the content after its saved. 
      const returnData = {
        signedRequest: data,
        url: `https://${me.config.aws.bucket}.s3.amazonaws.com/${s3Params.Key}`
      };
      // Send it all back
      return {
        success:true, 
        data: { returnData }
      };
    } catch (error) {
      return {success: false, error};
    }
  }

  async getSignedUrl(payload) {
    const me = this;
    try {
      const s3 = new aws.S3();
      const fileName = payload.fileName;
      const fileType = payload.fileType;

      // Set up the payload of what we are sending to the S3 api
      const s3Params = {
        Bucket: me.config.aws.bucket,
        Key: fileName,
        Expires: 500,
        ContentType: fileType,
        ACL: 'public-read'
      };

      let signedRequest = await me._getSignedRequest(s3, s3Params);

      // store the image url in our db so that we can sent it as email using the cron
      let imagePayload = {
        file_name: fileName,
        url: _.get(signedRequest, 'data.returnData.url'),
        is_email_sent: false
      }
      await this.imageAccessor.saveImage(imagePayload);

      return signedRequest;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AwsService;