var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  var apis = [{
    products : [
      { name : 'Get All Product', url : "localhost:3000/api/products" },
      { name : 'Get All Product', url : "localhost:3000/api/products" },
      { name : 'Get All Product', url : "localhost:3000/api/products" }
    ],
    products2 : [
      { name : 'Get All Product', url : "localhost:3000/api/products" },
      { name : 'Get All Product', url : "localhost:3000/api/products" },
      { name : 'Get All Product', url : "localhost:3000/api/products" }
    ]
  }];

  res.render('index', {
    title: 'Node JS Simple Restful by Irfan Maulana',
    apis: apis
  });
});

module.exports = router;
