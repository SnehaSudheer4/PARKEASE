const mongoose = require('mongoose');
const Slot =require('../Company/Slot')

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
  
});

reservationSchema.post('save', async function () {
  try {
    // Update slot's free and booked numbers based on the vehicle type
    if (this.vehicleType === 'twoWheeler') {
      await Slot.findOneAndUpdate({}, { $inc: { 'twoWheeler.free': -1, 'twoWheeler.booked': 1 } });
    } else if (this.vehicleType === 'fourWheeler') {
      await Slot.findOneAndUpdate({}, { $inc: { 'fourWheeler.free': -1, 'fourWheeler.booked': 1 } });
    }
  } catch (error) {
    console.error('Error updating slot data:', error);
    throw error; // Throw the error to be caught and handled elsewhere
  }
});
const Reservation = mongoose.model('Reservation', reservationSchema);

module.exports = Reservation;
