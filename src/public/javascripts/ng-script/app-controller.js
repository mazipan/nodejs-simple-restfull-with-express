/**
 * Created by irfan.maulana on 2/10/2016.
 */
var productController = angular.module('irfan.basic.controller',[]);

productCtrlFunc.$inject =
    ['$scope', 'productServices'];
productController.controller('basic.ctrl',
    ['$scope', 'productServices', productCtrlFunc]);

function productCtrlFunc($scope, productServices){
    $scope.viewPage = "ngtable";
    $scope.products = [];
    $scope.selectedProduct = {};
    $scope.isNewData = true;
    $scope.errormessage = "";

    $scope.getAllProducts = function(){
        productServices
            .getAllProducts()
            .$promise
            .then(function (response) {
                if(response.result){
                    $scope.products = response.products;
                }
            });
    }

    $scope.submitDelete = function(idProduct){
        productServices
            .deleteProduct({
                id : idProduct
            })
            .$promise
            .then(function (response) {
                if(response.result){
                    $scope.getAllProducts();
                }
            });
    }

    $scope.angularSubmitSaveForm = function(){
        if($scope.selectedProduct.title){
            productServices
                .insertProduct({
                    title: $scope.selectedProduct.title,
                    description: $scope.selectedProduct.description,
                    price: $scope.selectedProduct.price
                })
                .$promise
                .then(function (response) {
                    if(response.result){
                        $scope.goesToTable();
                        $scope.getAllProducts();
                        $scope.errormessage = "";
                    }else{
                        $scope.handleError(response);
                    }
                });
        }
    }

    $scope.angularSubmitUpdateForm = function(){
        if($scope.selectedProduct._id && $scope.selectedProduct.title){
            productServices
                .updateProduct({
                    id: $scope.selectedProduct._id,
                    title: $scope.selectedProduct.title,
                    description: $scope.selectedProduct.description,
                    price: $scope.selectedProduct.price
                })
                .$promise
                .then(function (response) {
                    if(response.result){
                        $scope.goesToTable();
                        $scope.getAllProducts();
                        $scope.errormessage = "";
                    }else{
                        $scope.handleError(response);
                    }
                });
        }
    }

    $scope.handleError = function(response){
        if(response.errorDesc.err){
            $scope.errormessage = response.errorDesc.err;
        }else if(response.errorDesc.message){
            $scope.errormessage = response.errorDesc.message;
        }else{
            $scope.errormessage = "Something was wrong, please refresh browser and try again!";
        }
    }

    $scope.goesToForm = function(product){
        $scope.viewPage = "ngform";
        $scope.errormessage = "";
        if(product){
            $scope.selectedProduct = product;
            $scope.isNewData = false;
        }else{
            $scope.selectedProduct = {};
            $scope.isNewData = true;
        }
    }

    $scope.goesToTable = function(){
        $scope.selectedProduct = {};
        $scope.viewPage = "ngtable";
        $scope.isNewData = true;
        $scope.errormessage = "";
    }



    $scope.getAllProducts();

}

