const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    username:  {
        type: String,
        required: true
    },
    items: {
        type: [String]
    }
}, {
    timestamps: true
});

var Shoppingcarts = mongoose.model('Shoppingcart', cartSchema);

module.exports = Shoppingcarts;