/**
 * Created by irfan.maulana on 11/24/2015.
 */
var express = require('express');
var ProductModel = require('../model/product');

var router = express.Router();

router.get('/', function (req, res){
    return ProductModel.find(function (err, products) {
        if (!err) {
            return res.send(products);
        } else {
            return console.log(err);
        }
    });
});

router.post('/', function (req, res){
    var product;
    product = new ProductModel({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price
    });
    product.save(function (err) {
        if (!err) {
            return console.log("product has been created");
        } else {
            console.log(err);
            return res.send('error when create product');
        }
    });
    return res.send(product);
});

router.get('/:id', function (req, res){
    return ProductModel.findById(req.params.id, function (err, product) {
        if (!err) {
            console.log('get product '+ req.params.id);
            return res.send(product);
        } else {
            console.log(err);
            return res.send('error when get product '+ req.params.id);
        }
    });
});

router.put('/:id', function (req, res){
    return ProductModel.findById(req.params.id, function (err, product) {
        product.title = req.body.title;
        product.description = req.body.description;
        product.price = req.body.price;
        return product.save(function (err) {
            if (!err) {
                console.log("product has been updated "+ req.params.id);
            } else {
                console.log(err);
            }
            return res.send(product);
        });
    });
});

router.delete('/:id', function (req, res){
    return ProductModel.findById(req.params.id, function (err, product) {
        return product.remove(function (err) {
            if (!err) {
                console.log("product removed");
                return res.send('product '+ req.params.id +'has been removed');
            } else {
                console.log(err);
                return res.send('error when remove product '+ req.params.id);
            }
        });
    });
});


module.exports = router;