const mongoose = require('mongoose');
const { Schema } = mongoose;

const slotSchema = new Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true },
  place: { type: String, required: true },
  twoWheeler: {
    booked: { type: Number, default:0  },
    free: { type: Number, default: 50 },
  },
  fourWheeler: {
    booked: { type: Number, default:0 },
    free: { type: Number, default: 30 },
  },
});

slotSchema.statics.updateFreeSpace = async function (vehicleType) {
  try {
    const slot = await this.findOne();
    if (!slot) {
      throw new Error('Slot not found');
    }
    if (vehicleType === 'twoWheeler') {
      slot.twoWheeler.free -= 1;
      slot.twoWheeler.booked += 1;
    } else if (vehicleType === 'fourWheeler') {
      slot.fourWheeler.free -= 1;
      slot.fourWheeler.booked += 1;
    }
    await slot.save();
  } catch (error) {
    console.error('Error updating slot data:', error);
  }
};

const Slot = mongoose.model('Slot', slotSchema);
module.exports = Slot;
