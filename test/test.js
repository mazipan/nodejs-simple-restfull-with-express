var supertest = require("supertest");
var should = require("should");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");
var random = Math.random();
var idProduct = "";

// UNIT test begin
describe("REST API unit test.",function(){
    it("should return all products",function(done){
        // Test Get All Products
        server
            .get("/api/products")
            .expect("Content-type",/json/)
            .expect(200) // This is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                res.body.result.should.equal(true);
                done();
            });

    });

    it("should return insert product",function(done){
        // Test Insert Product
        server
            .post("/api/products")
            .send({title : "This is title"+random, description : "This is description", price : 3000})
            .expect("Content-type",/json/)
            .expect(200) // This is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                res.body.result.should.equal(true);
                // Product should be in json
                should.exist(res.body.product);
                res.body.product.should.be.ok;
                // Product should instance of Object
                res.body.product.should.be.an.instanceOf(Object);
                // Product should have property described
                res.body.product.should.have.properties('title', 'description', 'price');
                idProduct = res.body.product._id;
                done();
            });

    });

    it("should return error insert product with duplicate data",function(done){
        // Test Insert Product With Duplicate Data
        server
            .post("/api/products")
            .send({title : "This is title"+random, description : "This is description", price : 3000})
            .expect("Content-type",/json/)
            .expect(200) // This is HTTP response
            .end(function(err,res){
                // HTTP status should be 200
                res.status.should.equal(200);
                // Error key should be false.
                res.body.result.should.equal(false);
                done();
            });

    });

    it("should return single product",function(done){
        // Test get product by id
        if(idProduct !== ""){
            server
                .get("/api/products/"+idProduct)
                .expect("Content-type",/json/)
                .expect(200) // This is HTTP response
                .end(function(err,res){
                    // HTTP status should be 200
                    res.status.should.equal(200);
                    // Error key should be false.
                    res.body.result.should.equal(true);
                    // Product should be in json
                    should.exist(res.body.product);
                    res.body.product.should.be.ok;
                    // Product should instance of Object
                    res.body.product.should.be.an.instanceOf(Object);
                    // Product should have property described
                    res.body.product.should.have.properties('title', 'description', 'price');
                    idProduct = res.body.product._id;
                    done();
                });
        }else done();
    });

    it("should update product",function(done){
        // Test update product by id
        if(idProduct !== ""){
            server
                .put("/api/products/"+idProduct)
                .send({title : "This is title updated", description : "This is description updated", price : 3000})
                .expect("Content-type",/json/)
                .expect(200) // This is HTTP response
                .end(function(err,res){
                    // HTTP status should be 200
                    res.status.should.equal(200);
                    // Error key should be false.
                    res.body.result.should.equal(true);
                    // Product should be in json
                    should.exist(res.body.product);
                    res.body.product.should.be.ok;
                    // Product should instance of Object
                    res.body.product.should.be.an.instanceOf(Object);
                    // Product should have property described
                    res.body.product.should.have.properties('title', 'description', 'price');
                    idProduct = res.body.product._id;
                    done();
                });
        }else done();
    });

    it("should delete product",function(done){
        // Test get product by id
        if(idProduct !== ""){
            server
                .delete("/api/products/"+idProduct)
                .expect("Content-type",/json/)
                .expect(200) // This is HTTP response
                .end(function(err,res){
                    // HTTP status should be 200
                    res.status.should.equal(200);
                    // Error key should be false.
                    res.body.result.should.equal(true);
                    done();
                });
        }else done();
    });

});