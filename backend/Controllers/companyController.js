const bcrypt = require('bcrypt');
const Security = require('../Model/Security/Security');
const Company = require('../Model/Company/Company');
const Slot = require('../Model/Company/Slot');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const mongoose = require('mongoose');
const maxAge = 3 * 24 * 60 * 60;

const createCompanyToken = (id) => {
  return jwt.sign({ id }, process.env.COMPANY_SECRET_KEY, {
    expiresIn: maxAge,
  });
};

const securitySignUp = async (req, res) => {
  try {
    const newSecurity = new Security({
      email: req.body.email,
      password: req.body.password,
      confirmpassword: req.body.confirmPassword,
      phone: req.body.phone,
      companyName: req.body.companyName,
    });
    await newSecurity.save();
    res.status(201).json({ message: 'Security registered successfully' });
  } catch (error) {
    console.error('Error registering security:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const companyLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const company = await Company.findOne({ email: email });
    if (company) {
      const auth = await bcrypt.compare(password, company.password);
      if (auth) {
        const token = createCompanyToken(company._id);
        console.log('Company logged in successfully. Token:', token);
        res
          .status(200)
          .json({ message: 'Login successful', company, token, status: true });
        return;
      } else {
        res.json({ message: 'Password incorrect', status: false });
        return;
      }
    } else {
      res.json({ message: 'Company not found', status: false });
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getSecurityList = async (req, res) => {
  try {
    const { companyName } = req.params;
    const securities = await Security.find({ companyName });
    res.status(200).json({ securities }); 
  } catch (error) {
    console.error('Error fetching security list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const companyHeader = async (req, res) => {
  try {
    const company = req.company;
    res.json({ company: company, status: true });
  } catch (error) {
    res.json({ message: 'Internal server error', status: false });
  }
};



const createSlot = async (req, res) => {
  try {
    const { companyName, email, place, twoWheelerFree, fourWheelerFree } =
      req.body;
    const slot = new Slot({
      companyName,
      email,
      place,
      twoWheeler: {
        booked: 0,
        free: twoWheelerFree,
      },
      fourWheeler: {
        booked: 0,
        free: fourWheelerFree,
      },
    });
    await slot.save();
    res.status(201).json({ message: 'Slot created successfully', slot });
  } catch (error) {
    console.error('Error creating slot:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


const updateSlot = async (req, res) => {
  try {
    const slotId = req.params.slotId;
    const { twoWheeler, fourWheeler } = req.body;
    await Slot.findByIdAndUpdate(slotId, {
      $set: { twoWheeler, fourWheeler },
    });
    res.status(200).json({ message: 'Slot updated successfully' });
  } catch (error) {
    console.error('Error updating slot:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// const updateSlot = async (req, res) => {
//   try {
//     const slotId = req.params.slotId;
//     const { updatedTwoWheelerCount, updatedFourWheelerCount } = req.body;
//     await Slot.findByIdAndUpdate(slotId, {
//       $set: { 
//         'twoWheeler.free': updatedTwoWheelerCount,
//         'fourWheeler.free': updatedFourWheelerCount,
//       },
//     });
//     res.status(200).json({ message: 'Slot updated successfully' });
//   } catch (error) {
//     console.error('Error updating slot:', error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };


const deleteSlot = async (req, res) => {
  try {
    const slotId = req.params.slotId;
    await Slot.findByIdAndDelete(slotId);
    res.status(200).json({ message: 'Slot deleted successfully' });
  } catch (error) {
    console.error('Error deleting slot:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCompanySlot=async (req,res)=>{
  try {
    const {email}=req.params;
    const slots=await Slot.find({email})
    res.json(slots)
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Server error' });
    
  }
}



module.exports = {
  securitySignUp,
  companyLogin,
  getSecurityList,
  companyHeader,
  createSlot,
  // getSlots,
  updateSlot,
  deleteSlot,
  getCompanySlot
  
  // addSlots,
  // updateSlots,
  // deleteSlots,
  // getCompanySlots,
};
