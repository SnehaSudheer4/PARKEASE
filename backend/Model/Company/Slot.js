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

// slotSchema.statics.updateFreeSpace = async function (vehicleType) {
//   try {
//     const slot = await this.findOne();
//     console.log('Vehicle Type:', vehicleType);
//     console.log('Slot before update:', slot);

//     if (!slot) {
//       throw new Error('Slot not found');
//     }
//     if (vehicleType === 'twoWheeler') {
//       slot.twoWheeler.free -= 1;
//       slot.twoWheeler.booked += 1;
//       slot.twoWheeler.total = 50 - slot.twoWheeler.booked;
//     } else if (vehicleType === 'fourWheeler') {
//       slot.fourWheeler.free -= 1;
//       slot.fourWheeler.booked += 1;
//       slot.fourWheeler.total = 50 - slot.fourWheeler.booked;
//     }
//     await slot.save();
//     console.log('Slot after update:', slot);
//   } catch (error) {
//     console.error('Error updating slot data:', error);
//   }
// };

const Slot = mongoose.model('Slot', slotSchema);
module.exports = Slot;
