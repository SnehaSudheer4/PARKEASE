const mongoose = require('mongoose');
const Slot = require('../Company/Slot');

const reservationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  vehicleNumber: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  arrivingTime: {
    type: Date,
    default: Date.now,
  },
  companyName: {
    type: String,
    required: true,
  },
  isCheckedIn: {
    type: Boolean,
    default: false,
  },
  orderId: { type: String, required: true },
  paymentId: { type: String, required: true },
  amount: { type: Number, require: true },
});

// reservationSchema.post('save', async function () {
//   try {
//    // Update slot's free and booked numbers based on the vehicle type
//     const vehicleType = this.vehicleType;
//     if (vehicleType === 'twoWheeler' || vehicleType === 'fourWheeler') {
//       await Slot.updateFreeSpace(vehicleType);
//     }
//   } catch (error) {
//     console.error('Error updating slot data:', error);
//     throw error;
//   }
// });
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
