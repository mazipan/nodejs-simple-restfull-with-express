/**
 * Created by irfan.maulana on 11/24/2015.
 */
var express = require('express');
var ProductModel = require('../model/product');

var router = express.Router();

router.route('/')

    // GET ALL DATA
    .get(function (req, res){
            return ProductModel.find(function (err, products) {
                if (!err) {
                    return res.send({result : true, products : products});
                } else {
                    console.log(err);
                    return res.send({result : false, errorDesc : "Failed get data from DB."});
                }
            });
    })

    // INSERT DATA
    .post(function (req, res){
        var product;
        var errorMessage = "";
        if(typeof req !== 'undefined'){
            if(req.body.title === null || req.body.title === ""){
                errorMessage = "Title product is null or empty.";
                return res.send({result : false, errorDesc : errorMessage});
            }else{
                product = new ProductModel({
                    title: req.body.title,
                    description: req.body.description,
                    price: req.body.price
                });

                product.save(function (err) {
                    if (!err) {
                        console.log("product : "+product.title + " has been created ");
                        return res.send({result : true, product : product});
                    } else {
                        console.log(err);
                        return res.send({result : false, errorDesc : err});
                    }
                });

            }
        }else{
            errorMessage = "Request is null or empty.";
            return res.send({result : false, errorDesc : errorMessage});
        }
    });

router.route('/:id')

    // GET BY ID
    .get(function (req, res){
        return ProductModel.findById(req.params.id, function (err, product) {
            if (!err) {
                console.log('get product '+ req.params.id);
                return res.send({result : true, product : product});
            } else {
                console.log(err);
                return res.send({result : false, errorDesc : 'error when get product '+ req.params.id});
            }
        });
    })

    // UPDATE DATA
    .put(function (req, res){
        return ProductModel.findById(req.params.id, function (err, product) {
            if(req.body.title !== null && req.body.title !== ""){
                product.title = req.body.title;
            }
            product.description = req.body.description;
            product.price = req.body.price;
            return product.save(function (err) {
                if (!err) {
                    console.log("product has been updated "+ req.params.id);
                    return res.send({result : true, product : product});
                } else {
                    console.log(err);
                    return res.send({result : false, errorDesc : 'error when update product '+ req.params.id});
                }
            });
        });
    })

    // DELETE DATA
    .delete(function (req, res){
        return ProductModel.findById(req.params.id, function (err, product) {
            return product.remove(function (err) {
                if (!err) {
                    console.log("product "+ req.params.id +" removed !");
                    return res.send({result : true, message : 'product '+ req.params.id +' has been removed'});
                } else {
                    console.log(err);
                    return res.send({result : false, errorDesc : 'error when remove product '+ req.params.id});
                }
            });
        });
    });


module.exports = router;