const mongoose =require('mongoose')

const ReservationPayment= new mongoose.Schema(
    {
        orderId:{type:String,required:true},
        paymentId:{type:String,required:true},
        amount:{type:Number,require:true},
        companyName:{type:String,require:true},
        Name:{type:String,require:true}
    }
)
const Payment=mongoose.model('payment',ReservationPayment)
module.exports=Payment;