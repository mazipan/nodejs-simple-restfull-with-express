/**
 * Created by irfan.maulana on 11/24/2015.
 */

var mongoose = require('../connection/connection');

var Schema = mongoose.Schema;
var Product = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Double , required: true },
    modified: { type: Date, default: Date.now }
});
var ProductModel = mongoose.model('Product', Product);

module.exports = ProductModel;