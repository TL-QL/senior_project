const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency = mongoose.Types.Currency;

const commentSchema = new Schema({
    rating:{
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } 
}, { 
        timestamps: true
});

const itemSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: [String],
        required: true
    },
    favoriteCount: {
        type: Number,
        min: 0
    },
    shoppingCartCount: {
        type: Number,
        min: 0
    },
    quantity: {
        type: Number,
        min: 0
    },
    condition: {
        type: String,
        required: true
    },
    delivery: {
        type: String,
        required: true
    },
    sizeInfo: {
        type: String,
        default: ''
    },
    detachable: {
        type: String,
        default: ''
    },
    careIns: {
        type: String,
        default: ''
    },
    productInsurance: {
        type: String,
        default: ''
    },
    damage: {
        type: String,
        default: ''
    },
    sellerInfo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    // whether the item is approved by admin
    post: {
        type: Boolean,
        default: false
    },
    soldout: {
        type: Boolean,
        default: false
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [commentSchema],
    images: {
        type: [String],
        required: true
    }
}, {
    timestamps: true
});

var Items = mongoose.model('Item', itemSchema);

module.exports = Items;