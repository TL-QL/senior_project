const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
    user:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Item'
        }]
}, {
    timestamps: true
});

var Shoppingcarts = mongoose.model('Shoppingcart', cartSchema);

module.exports = Shoppingcarts;