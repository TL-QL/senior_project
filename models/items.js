const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    rating:{
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    serviceRating:{
        type: Number,
        min: 0,
        max: 10,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    author: {
        type: String,
    } 
}, { 
        timestamps: true
});

const itemSchema = new Schema({
    item_id:{
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
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
        default: 0
    },
    shoppingCartCount: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        default: 1
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
        default: "N/A"
    },
    detachable: {
        type: String,
        default: "N/A"
    },
    careIns: {
        type: String,
        default: "N/A"
    },
    productInsurance: {
        type: String,
        default: "N/A"
    },
    damage: {
        type: String,
        default: "N/A"
    },
    // whether the item is approved by admin
    approve: {
        type: Boolean,
        default: false
    },
    reject: {
        type: Boolean,
        default: false
    },
    soldout: {
        type: Boolean,
        default: false
    },
    buyer: {
        type: String
    },
    seller: {
        type: String
    },
    comments: [commentSchema],
    images: {
        type: Object,
        required: true
    },
    imageScore:{
        type: Number,
        min: -1,
        default: -1
    }
}, {
    timestamps: true
});

var Items = mongoose.model('Item', itemSchema);

module.exports = Items;