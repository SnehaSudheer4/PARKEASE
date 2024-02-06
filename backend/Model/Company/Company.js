const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
require('dotenv').config();

const companySchema = new Schema(
  {
    companyName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    place: { type: String, required: true },
    phone: { type: String, required: true },
    
  },
  { timestamps: true }
);

companySchema.pre('save', async function (next) {
  const company = this;
  if (company.isModified('password')) {
    company.password = await bcrypt.hash(company.password, 10);
  }
  next();
});

const Company = mongoose.model('Company', companySchema);
module.exports = Company;
