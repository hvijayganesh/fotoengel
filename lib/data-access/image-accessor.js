// Get Data Models
const Image = require('../models/image');

class ImageAccessor {
  async saveImage(payload) {
    try {
      const image = new Image(payload)
      return image.save();
    } catch(err) {
      throw err;
    }
  }

  async getImagesToBeSend() {
    try {
      let images = await Image.find({is_email_sent: false});
      return images;
    } catch (err) {
      throw err;
    }
  }
  
  async update(id, updateData) {
    try {
      await Image.findByIdAndUpdate(id, updateData, { new: true })
      return true;
    } catch (err) {
      return false;
    }
  }
  
}

module.exports = ImageAccessor;