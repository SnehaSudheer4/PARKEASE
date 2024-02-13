// import React, { useState } from 'react';
// import { createPayment, createReservation } from '../../../service/Userapi';
// import './Payment.css';
// import Navbar1 from '../Navbar1/Navbar1';
// import { useLocation } from 'react-router-dom';

// const Payment = () => {
//   const [amount, setAmount] = useState('');
//   const [companyName, setCompanyName] = useState('');
//   const [Name, setName] = useState('');
//   // const {companyName,}=location.state||{}
//   // const { companyName, name, } = location.state || {};

//   const location = useLocation();
//   const handleReservation = async () => {
//     try {
//       const reservationData = {
//         companyName: companyName,
//         name: Name,
//       };
//       const response = await createReservation(reservationData);
//       console.log('Reservation created successfully after payment:', response);
//     } catch (error) {
//       console.error('Error creating reservation:', error);
//     }
//   };
  

//   const handlePayment = async (e) => {
//     try {
//       if (isNaN(amount) || amount <= 0) {
//         console.error('Invalid amount:', amount);
//         return;
//       }
//       if (!companyName || !Name) {
//         console.error('Company name or user name cannot be empty');
//         return;
//       }
//       const response = await createPayment(amount, companyName, Name);
//       console.log(response, '@@@');
//       const options = {
//         key: 'rzp_test_40vpkpbtCN7tjn',
//         amount: response.data.amount,
//         currency: 'INR',
//         name: 'Parkease',
//         description: 'Reservation',
//         order_id: response.data.id,
//         handler: function (response) {
//           console.log('Payment success:', response);
//           handleReservation();
//           alert('Payment Success for Parkease');
//           alert(response.razorpay_payment_id);
//           alert(response.razorpay_order_id);
//           alert(response.razorpay_signature);
          
        
//           handleReservation();
//         },
//         prefill: {
//           name: 'Parkease', 
//           email: 'parkease@gmail.com',
//           contact: '98000050000',
//         },
//       };
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//       e.preventDefault();
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//     }
//   };
  

//   return (
//     <div>
//       <Navbar1 />
//       <br />
//       <div className="payment-form">
//         <h2>Payment Form</h2>
//         <input
//           type="text"
//           placeholder="Enter company name"
//           value={companyName}
//           onChange={(e) => setCompanyName(e.target.value)}
//         />
//         <br/>
//         <br/>
//         <input
//           type="text"
//           placeholder="Enter user name"
//           value={Name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <br/>
//         <br/>
//         <input
//           type="number"
//           placeholder="Enter amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />
//         <br />
//         <br />
//         <button onClick={handlePayment} className="pay-now">
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Payment;


// Payment.js
// import React, { useState } from 'react';
// import { createPayment, createReservation } from '../../../service/Userapi';
// import './Payment.css';
// import Navbar1 from '../Navbar1/Navbar1';
// import { useLocation, useNavigate } from 'react-router-dom';

// const Payment = () => {
//   const [amount, setAmount] = useState('');
//   const [companyName, setCompanyName] = useState('');
//   const [name, setName] = useState('');
//   const location = useLocation();
//   const navigate = useNavigate();

//   const handleReservation = async () => {
//     try {
//       const reservationData = {
//         companyName: companyName,
//         name: name,
//       };
//       const response = await createReservation(reservationData);
//       console.log('Reservation created successfully after payment:', response);
//     } catch (error) {
//       console.error('Error creating reservation:', error);
//     }
//   };

//   const handlePayment = async (e) => {
//     try {
//       if (isNaN(amount) || amount <= 0) {
//         console.error('Invalid amount:', amount);
//         return;
//       }
//       if (!companyName || !name) {
//         console.error('Company name or user name cannot be empty');
//         return;
//       }
//       const response = await createPayment(amount, companyName, name);
//       console.log(response, '@@@');
//       const options = {
//         key: 'rzp_test_40vpkpbtCN7tjn',
//         amount: response.data.amount,
//         currency: 'INR',
//         name: 'Parkease',
//         description: 'Reservation',
//         order_id: response.data.id,
//         handler: function (response) {
//           console.log('Payment success:', response);
//           handleReservation();
//           alert('Payment Success for Parkease');
//           alert(response.razorpay_payment_id);
//           alert(response.razorpay_order_id);
//           alert(response.razorpay_signature);
//         },
//         prefill: {
//           name: 'Parkease', 
//           email: 'parkease@gmail.com',
//           contact: '98000050000',
//         },
//       };
//       const rzp = new window.Razorpay(options);
//       rzp.open();
//       e.preventDefault();
//     } catch (error) {
//       console.error('Error initiating payment:', error);
//     }
//   };

//   return (
//     <div>
//       <Navbar1 />
//       <br />
//       <div className="payment-form">
//         <h2>Payment Form</h2>
//         <input
//           type="text"
//           placeholder="Enter company name"
//           value={companyName}
//           onChange={(e) => setCompanyName(e.target.value)}
//         />
//         <br/>
//         <br/>
//         <input
//           type="text"
//           placeholder="Enter user name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//         <br/>
//         <br/>
//         <input
//           type="number"
//           placeholder="Enter amount"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//         />
//         <br />
//         <br />
//         <button onClick={handlePayment} className="pay-now">
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Payment;

