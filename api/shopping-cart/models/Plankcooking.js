const mongoose = require("mongoose");

const PlankCookingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    userId: String,
    address: {
        billing:{
            firstName: String,
            lastName: String,
            address: String,
            address2: {type: String, default:null},
            city: String,
            state: String,
            zip: String,
            country: String
        },
        shipping:{
            firstName: String,
            lastName: String,
            address: String,
            address2: {type: String, default:null},
            city: String,
            state: String,
            zip: String,
            country: String
        }
    },
    products:[{
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        price:Number,
        quantity: Number
    }],
    comments: String,
    shipping: {
        method: {type: String, default:null},
        cost: { type: Number, default: 0 }
    },
    payment: {
        method: { type: String, default: null },
        confirmationCode: { type: String, default: null },
        total: { type: Number, default: 0 }
    }
});

module.exports = mongoose.model("Plankcooking", PlankCookingSchema, "Plankcooking");