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
    console.log("POST: ");
    console.log(req.body);
    product = new ProductModel({
        title: req.body.title,
        description: req.body.description,
        style: req.body.style,
    });
    product.save(function (err) {
        if (!err) {
            return console.log("created");
        } else {
            return console.log(err);
        }
    });
    return res.send(product);
});

router.get('/:id', function (req, res){
    return ProductModel.findById(req.params.id, function (err, product) {
        if (!err) {
            return res.send(product);
        } else {
            return console.log(err);
        }
    });
});

router.put('/:id', function (req, res){
    return ProductModel.findById(req.params.id, function (err, product) {
        product.title = req.body.title;
        product.description = req.body.description;
        product.style = req.body.style;
        return product.save(function (err) {
            if (!err) {
                console.log("updated");
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
                console.log("removed");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
});


module.exports = router;