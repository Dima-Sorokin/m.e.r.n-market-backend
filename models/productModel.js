const mongoose = require(`mongoose`);
const Schema = mongoose.Schema;
const productSchema = new Schema({
    id: {
        type: String,
        required: true,
        minLength: 9,
        maxLength: 9
    },
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 15
    },
    price: {
        type: Number,
        required: true,
        min: 0.1,
        max: 100000
    },
    quantity: {
        type: Number,
        required: true,
        min: 0,
        max:1000000
    },
    description: {
        type: String,
        required: false,
        maxLength: 100
    }
}, { timestamps: true });
module.exports = mongoose.model(`Product`, productSchema);