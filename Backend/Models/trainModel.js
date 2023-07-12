
const mongoose =require('mongoose');

const seatSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  row: { type: Number, required: true },
  isBooked: { type: Boolean, default: false },
});

const coachSchema = new mongoose.Schema({
  seats: { type: [seatSchema], required: true },
});


const trainSchema = new mongoose.Schema({
  coach: { type: coachSchema,},

});

const Train = mongoose.model('Train', trainSchema);

module.exports={
  Train
}
 