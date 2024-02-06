const bcrypt = require('bcrypt');
const Admin = require('../Model/Admin/AdminSchema');
const User = require("../Model/User/UserSchema");
const Company = require('../Model/Company/Company');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const maxAge = 3 * 24 * 60 * 60;
// const mongoose = require('mongoose')

const createAdminToken = (id) => {
  return jwt.sign({ id }, process.env.ADMIN_SECRET_KEY, {
    expiresIn: maxAge,
  });
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body, '@@@@@@');
    const admin = await Admin.findOne({ email: email });
    console.log(admin, '#####');

    if (admin) {
      const auth = await bcrypt.compare(password, admin.password);
      console.log(auth);

      if (auth) {
        const token = createAdminToken(admin._id);
        console.log('Admin logged in successfully. Token:', token);
        res
          .status(200)
          .json({ message: 'Login successful', admin, token, status: true });
        return;
      } else {
        res.json({ message: 'password incorrect', status: false });
        return;
      }
    } else {
      res.json({ message: 'admin not found', status: false });
    }
  } catch (error) {
    console.error('Error logging in:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAdminUserList = async (req, res) => {
  try {
    const users = await User.find();
    if(users){
    console.log(users,"*******");
    return res.json({msg:"Success",data: users,status:false});

  }else{
    return res.json({msg:"Faild to list user",status:false})
  }
  } catch (error) {
    console.error('Error fetching user list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const blockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User blocked successfully', user });
  } catch (error) {
    console.error('Error blocking user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const unblockUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findByIdAndUpdate(
      userId,
      { isBlocked: false },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User unblocked successfully', user });
  } catch (error) {
    console.error('Error unblocking user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const companySignUp = async (req, res) => {
  try {
    const newCompany = new Company({
      companyName: req.body.companyName,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      place: req.body.place,
    });
    await newCompany.save();
    res.status(201).json({ message: 'Company registered successfully' });
  } catch (error) {
    console.error('Error registering company:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAdminCompanyList = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json({ companies });
  } catch (error) {
    console.error('Error fetching company list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const blockCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findByIdAndUpdate(
      companyId,
      { isBlocked: true },
      { new: true }
    );
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200).json({ message: 'Company blocked successfully', company });
  } catch (error) {
    console.error('Error blocking company:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const unblockCompany = async (req, res) => {
  try {
    const { companyId } = req.params;
    const company = await Company.findByIdAndUpdate(
      companyId,
      { isBlocked: false },
      { new: true }
    );
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res
      .status(200)
      .json({ message: 'Company unblocked successfully', company });
  } catch (error) {
    console.error('Error unblocking company:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const adminHeader=async(req,res)=>{
  try {
    const admin= req.admin;
    res.json({admin:admin,status:true})
  } catch (error) {
    res.json({message:'internal server error',status:false}) 
  }
}

module.exports = {
  adminLogin,
  getAdminUserList,
  blockUser,
  unblockUser,
  companySignUp,
  getAdminCompanyList,
  blockCompany,
  unblockCompany,
  adminHeader,
};
