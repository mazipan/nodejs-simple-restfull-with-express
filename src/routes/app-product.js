var express = require('express');
var router = express.Router();
var ProductModel = require('../model/product');

router.get('/', function(req, res, next) {
    return ProductModel.find(function (err, products) {
        if (!err) {
            res.render('app', {products: products});
        } else {
            console.log(err);
            res.render('error', err);
        }
    });
});

router.get('/form', function(req, res, next) {
    var product = {
        title: '',
        description: '',
        price: '',
        modified:''
    };
    res.render('app-form', {product: product, isNew: true});
});

router.get('/form/:id', function(req, res, next) {
    if(!req.params.id){
        var product = {
            title: '',
            description: '',
            price: '',
            modified:''
        };
        res.render('app-form', {product: product, isNew: true});
    }else{
        return ProductModel.findById(req.params.id, function (err, product) {
            if (!err) {
                res.render('app-form', {product: product, isNew: false});
            } else {
                console.log(err);
                res.render('error', err);
            }
        });
    }
});

module.exports = router;
