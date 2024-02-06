const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
require('dotenv').config();

const securitySchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

securitySchema.pre('save', async function (next) {
  const security = this;
  if (security.isModified('password')) {
    security.password = await bcrypt.hash(security.password, 10);
  }
  next();
});

const Security = mongoose.model('Security', securitySchema);
module.exports = Security;
