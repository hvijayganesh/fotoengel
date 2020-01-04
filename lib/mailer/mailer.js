'use strict'

const Fs = require('fs')  
const Path = require('path')  
const Boom = require('boom')  
const Util = require('util')  
const Nodemailer = require('nodemailer')  
const Handlebars = require('handlebars')
const HtmlToText = require('html-to-text')
const ReadFile = Util.promisify(Fs.readFile)  
const SendgridTransport = require('nodemailer-sendgrid-transport')
const Templates = Path.resolve(__dirname, 'templates')
const _ = require('lodash')

class Mailer {

  constructor(config) {
    this.transporter = Nodemailer.createTransport(SendgridTransport({  
      auth: {
        api_key: process.env.SENDGRID_API_KEY || config.sendgrid.api_key
      }
    }))
  }

  /**
   * filename: email template name, without ".html" file ending. Email templates are located within "server/email-templates"
   * options: data which will be used to replace the placeholders within the template
   **/
  async prepareTemplate (filename, options = {}) {  
    try {
      const templatePath = Path.resolve(Templates, `${filename}.html`)
      const content = await ReadFile(templatePath, 'utf8')

      // use handlebars to render the email template
      // handlebars allows more complex templates with conditionals and nested objects, etc.
      // this way we have much more options to customize the templates based on given data
      const template = Handlebars.compile(content)
      const html = template(options)

      // generate a plain-text version of the same email
      const text = HtmlToText.fromString(html)

      return {
        html,
        text
      }
    } catch (error) {
      throw new Boom('Cannot read the email template content.')
    }
  }

  async send ({to, from, template, subject, data = {}}) {  
    const { html, text } = await this.prepareTemplate(template, data)
    const mailOptions = {
      from: from,
      to: process.env.RECIPIENT_EMAIL || to,
      subject: subject,
      html,
      text,
      attachments: [
        {
          filename: `${_.get(data, 'attachments.file_name')}.pdf`,
          path: _.get(data, 'attachments.path')
        }
      ]
    }
  
    try {
      await this.transporter.sendMail(mailOptions)
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

}

module.exports = Mailer;