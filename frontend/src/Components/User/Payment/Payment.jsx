import React, { useState } from 'react';
import { createPayment } from '../../../service/Userapi';
import './Payment.css';
import Navbar1 from '../Navbar1/Navbar1';

const Payment = () => {
  const [amount, setAmount] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [Name, setName] = useState('');

  const handlePayment = async (e) => {
    try {
      if (isNaN(amount) || amount <= 0) {
        console.error('Invalid amount:', amount);
        return;
      }
      if (!companyName || !Name) {
        console.error('company name or user name cannot be empty');
        return;
      }
      const response = await createPayment(amount, companyName, Name);
      console.log(response, '@@@');
      const options = {
        key: 'rzp_test_40vpkpbtCN7tjn',
        amount: response.data.amount,
        currency: 'INR',
        name: 'Parkease',
        description: 'Reservation',
        order_id: response.data.id,
        handler: function (response) {
          console.log('Payment success:', response);
          alert('Payment Success for parkease');
          alert(response.razorpay_payment_id);
          alert(response.razorpay_order_id);
          alert(response.razorpay_signature);
        },
        prefill: {
          name: 'parkease',
          email: 'parkease@gmail.com',
          contact: '98000050000',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      e.preventDefault();
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };

  return (
    <div>
      <Navbar1 />
      <br />
      <div className="payment-form">
        <h2>Payment Form</h2>
        <input
          type="text"
          placeholder="Enter company name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
        />
        <br/>
        <br/>
        <input
          type="text"
          placeholder="Enter user name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
        <br/>
        <br/>
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <br />
        <br />
        <button onClick={handlePayment} className="pay-now">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
