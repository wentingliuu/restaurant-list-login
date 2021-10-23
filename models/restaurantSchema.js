// Require Mongoose
const mongoose = require('mongoose')

// Define schema
const Schema = mongoose.Schema
const restaurantSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    index: true,
    required: true
  },
  name: { type: String, required: true },
  nameEn: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  location: { type: String, required: true },
  phone: { type: String, required: true },
  googleMap: { type: String, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true }
})

// Compile model from schema
module.exports = mongoose.model('Restaurant', restaurantSchema)
