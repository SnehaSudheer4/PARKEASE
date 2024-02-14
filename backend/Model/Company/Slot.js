const mongoose = require('mongoose');
const { Schema } = mongoose;

const slotSchema = new Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  place: { type: String, required: true },
  twoWheeler: {
    booked: { type: Number, default: 0 },
    free: { type: Number, default: 50 },
    total: { type: Number, default: 50 },
  },
  fourWheeler: {
    booked: { type: Number, default: 0 },
    free: { type: Number, default: 50 },
    total: { type: Number, default: 50 },
  },
});



const Slot = mongoose.model('Slot', slotSchema);
module.exports = Slot;
