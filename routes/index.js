var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var apis = [{
    products : [
      { name : 'Get All Product', url : "localhost:3000/api/products", method : "GET"},
      { name : 'Get Product By Id', url : "localhost:3000/api/products/{id}", method : "GET"},
      { name : 'Insert Product', url : "localhost:3000/api/products", method : "POST"},
      { name : 'Update Product By Id', url : "localhost:3000/api/products/{id}", method : "PUT"},
      { name : 'Delete Product By Id', url : "localhost:3000/api/products/{id}", method : "DELETE"}
    ]
  }];

  res.render('index', {
    title: 'Node JS Simple Restful by Irfan Maulana',
    apis: apis
  });
});

module.exports = router;
