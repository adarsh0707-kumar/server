const mongoose = require("mongoose");



const userSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userName: String,
    password: String,
    phone: Number,
    email: String
});

const Form = mongoose.model('Form', userSchema);


module.exports = Form;