const mongoose = require("mongoose");



const productSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    code: Number,
    price: Number,
    description: String,
    sp: Number,
    disconnectPercent: Number,
    imagePath: String 
});

const Product = mongoose.model('Product', productSchema);


module.exports = Product;