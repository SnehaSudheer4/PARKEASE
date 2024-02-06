const User = require('../Model/User/UserSchema');
const bcrypt = require('bcrypt');
const Company = require('../Model/Company/Company');
const jwt = require('jsonwebtoken');
const maxAge = 3 * 24 * 60 * 60;
const Reservation=require('../Model/User/Reservation')
const Razorpay = require('razorpay');
const Payment=require('../Model/User/Payment')
const Slot =require('../Model/Company/Slot')





//jwt
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_KEY, {
    expiresIn: maxAge,
  });
};

const userSignUp = async (req, res) => {
  try {
    const { username, email, password, phone } = req.body;
    console.log('Received request for user signup:', req.body);
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email is already registered' });
    }
    const existingPhone = await User.findOne({ phoneNumber: phone });
    if (existingPhone) {
      return res
        .status(400)
        .json({ message: 'Phone number is already registered' });
    }
    const newUser = new User({
      username,
      email,
      password,
      phoneNumber: phone,
    });
    await newUser.save();
    const token = createToken(newUser._id);
    console.log('User registered successfully:', newUser);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};




const  userLogin=async(req,res)=>{
  try {
    const {email,password}=req.body;
    console.log(req.body, '@@@@@@');
    const user = await User.findOne({ email :email});
    console.log(user, '#####');
    if(user){
      const auth = await bcrypt.compare(password,user.password);
      console.log(auth);
      if (auth) {
        const token = createToken(user._id);
        console.log('user logged in successfully. Token:', token);
        res
          .status(200)
          .json({ message: 'Login successful', user, token, status: true });
        return;
      } else {
        res.json({ message: 'password incorrect', status: false });
        return;
      }
    } else {
      res.json({ message: 'user not found', status: false });
    }
    }catch (error) {
      console.error('Error logging in:', error.message);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  


const handleSearch = async (req, res) => {
  try {
    const { query } = req.query;
    const regex = new RegExp(query, 'i');
    const companies = await Slot.find({ companyName: regex });
    const companyData = companies.map(company => ({
      place:company.place,
      companyName: company.companyName,
      twoWheeler: {
        booked: company.twoWheeler.booked,
        free: company.twoWheeler.free
      },
      fourWheeler: {
        booked: company.fourWheeler.booked,
        free: company.fourWheeler.free
      }
    }));
    res.status(200).json(companyData);
  } catch (error) {
    console.error('Error searching companies:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



// const createReservation = async (req, res) => {
//   try {
//     const { name, email, phone, date,vehicleNumber,vehicleType,arrivingTime,companyName} = req.body;
//     const reservation = new Reservation({
//       name,
//       email,
//       phone,
//       date,
//       vehicleNumber,
//       vehicleType,
//       arrivingTime,
//       companyName,
//       isCheckedIn: false, 
//     });
//     await reservation.save();
//     res.status(201).json({ message: 'Reservation created successfully', reservation });
//   } catch (error) {
//     console.error('Error creating reservation:', error.message);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };

// const createReservation = async (req, res) => {
//   try {
//     console.log('Creating reservation...');
//     const { name, email, phone, date, vehicleNumber, vehicleType, arrivingTime, companyName } = req.body;
//     console.log('Received reservation data:', req.body);
//     const reservation = new Reservation({
//       name,
//       email,
//       phone,
//       date,
//       vehicleNumber,
//       vehicleType,
//       arrivingTime,
//       companyName,
//       isCheckedIn: false,
//     });
//     await reservation.save();
//     console.log('Reservation saved:', reservation);
//     await Slot.updateFreeSpace(vehicleType);
//     console.log('Slot updated');
//     res.status(201).json({ message: 'Reservation created successfully', reservation });
//   } catch (error) {
//     console.error('Error creating reservation:', error.message);
//     res.status(500).json({ message: 'Internal Server Error' });
//   }
// };


const createReservation = async (req, res) => {
  try {
    const { name, email, phone, date, vehicleNumber, vehicleType, arrivingTime, companyName } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !phone || !date || !vehicleNumber || !vehicleType || !arrivingTime || !companyName) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create the reservation
    const reservation = new Reservation({
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

    // Save the reservation to the database
    await reservation.save();

    // Update slot counts based on the vehicle type
    await Slot.findOneAndUpdate(
      {}, // Update all slots, assuming there's only one document for slots
      {
        $inc: {
          [`$${vehicleType}.free`]: -1, // Decrease free count by 1
          [`$${vehicleType}.booked`]: 1, // Increase booked count by 1
        },
      }
    );

    // Respond with success message and the created reservation
    res.status(201).json({ message: 'Reservation created successfully', reservation });
  } catch (error) {
    console.error('Error creating reservation:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};





const userHeader=async(req,res)=>{
  try {
    const user=req.user;
    res.json({user:user,status:true})
  } catch (error) {
    res.json({message:'internal server error',status:false}) 
  }
}

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});


const createPayment = async (req, res) => {
  try {
    const { amount, companyName, Name } = req.body;
    if (isNaN(amount) || amount <= 0 || !companyName || !Name) {
      console.error('Invalid amount, companyName, or Name');
      return res.status(400).json({ error: 'Invalid amount,  companyName, or Name'});
    }
    const payment_capture = 1;
    const currency = 'INR';
    const order_id = Date.now().toString();

    const orderOptions = {
      amount: amount * 100, 
      currency,
      payment_capture,
      receipt: 'order_' + order_id,
    };
    console.log('Order Options:', orderOptions);
    const response = await razorpay.orders.create(orderOptions);
    console.log('Razorpay Response:', response);
    if (response.error) {
      console.error('Razorpay Error:', response.error);
      return res.status(500).json({ error: 'Razorpay Error' });
    }
    const newPayment = new Payment({
      orderId: response.id,
      paymentId: response.id,
      amount: amount,
      companyName: companyName,
      Name: Name,
    });
    await newPayment.save();
    res.json(response);
  } catch (error) {
    console.error('Error in createPayment:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


const getUserReservations = async (req, res) => {
  try {
    const { email } = req.params;
    const reservations = await Reservation.find({ email });
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { userSignUp, userLogin, handleSearch ,userHeader,createReservation,getUserReservations,createPayment};
