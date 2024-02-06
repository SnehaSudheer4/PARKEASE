const bcrypt = require('bcrypt');
const Security = require('../Model/Security/Security');
const jwt = require('jsonwebtoken');
const User = require('../Model/User/UserSchema');
const Reserve = require('../Model/User/Reservation');
const Slot = require('../Model/Company/Slot');
require('dotenv').config();
const maxAge = 3 * 24 * 60 * 60;

const createSecurityToken = (id) => {
  return jwt.sign({ id }, process.env.SECURITY_SECRET_KEY, {
    expiresIn: maxAge,
  });
};

const securityLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body, '@@@@@@');
    const security = await Security.findOne({ email: email });
    console.log(security, '#####');

    if (security) {
      const auth = await bcrypt.compare(password, security.password);
      console.log(auth);

      if (auth) {
        const token = createSecurityToken(security._id);
        console.log('security logged in successfully. Token:', token);
        res
          .status(200)
          .json({ message: 'Login successful', security, token, status: true });
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


// const getSecurityUserList = async (req, res) => {
//   try {
    
//     const security = await Reserve.find();
//     if (security) {
//       console.log(security, '%%%%%%');
//       return res.json({ msg: 'success', data: security, status: true });
//     } else {
//       return res.status(404).json({ msg: 'failed to list user', status: false });
//     }
//   } catch (error) {
//     console.error('Error fetching user list:', error.message);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

const getSecurityUserList = async (req, res) => {
  try {
    const { companyName } = req.params;
    const users = await Reserve.find({ companyName }); 
    res.status(200).json({ data: users }); 
  } catch (error) {
    console.error('Error fetching user list:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




// Check-in a user
const checkInUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await Reserve.findByIdAndUpdate(userId, { isCheckedIn: true });
    res.status(200).json({ message: 'User checked in successfully' });
  } catch (error) {
    console.error('Error checking in user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const checkOutUser = async (req, res) => {
  const { userId } = req.params;
  try {
    await Reserve.deleteOne({ _id: userId });
    res.status(200).json({ message: 'User checked out successfully' });
  } catch (error) {
    console.error('Error checking out user:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




const addReservation = async (req, res) => {
  try {
    const { name, email, phone, date, vehicleNumber, vehicleType, arrivingTime ,companyName} = req.body;
    const securityreserve = new Reserve({
      name,
      email,
      phone,
      date,
      vehicleNumber,
      vehicleType,
      arrivingTime,
      companyName,
      isCheckedIn: false,
    });
    await securityreserve.save();
    res.status(201).json({ message: 'Reservation created successfully', securityreserve });
  } catch (error) {
    console.error('Error creating reservation:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


const searchUser = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await Reserve.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({
      email: user.email,
      vehicleType: user.vehicleType,
    });
  } catch (error) {
    console.error('Error searching user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const securityHeader=async(req,res)=>{
  try {
    const security=req.security;
    res.json({security:security,status:true})
  } catch (error) {
    res.json({message:'internal server error',status:false}) 
  }
}

const getSlotsForSecurity=async(req,res)=>{
  try {
    const { companyName } = req.params;
    // Assuming the logged-in user's company name is available in req.user
    const slots = await Slot.find({ companyName });
    res.json(slots);
} catch (error) {
    res.status(500).json({ error: error.message });
}
}


module.exports = {
  securityLogin,securityHeader,
  getSecurityUserList,addReservation,searchUser,checkInUser,checkOutUser,getSlotsForSecurity
};
