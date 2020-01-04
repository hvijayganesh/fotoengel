const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  file_name: String,
  url: String,
  is_email_sent: Boolean  
})

module.exports = mongoose.model('Image', imageSchema);