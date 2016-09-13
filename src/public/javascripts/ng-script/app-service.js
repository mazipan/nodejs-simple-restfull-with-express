/*
 * @author : irfan.maulana
 */
var productServices = angular.module('irfan.basic.service', ['ngResource']);
productServices.factory('productServices', ['$resource', productServicesFunction]);
const URL_ROOT = "http://localhost:3000";

function productServicesFunction($resource) {
    return $resource('http://localhost:3000/api/products/:id', {}, {
        'getAllProducts': {
            method: 'GET'
        },
        'deleteProduct': {
            method: 'DELETE',
            params: {
                id : '@id'
            }
        },
        'updateProduct': {
            method: 'PUT',
            params: {
                id: '@id'
            },
            data: {
                title: 'title',
                description: 'description',
                price: 'price'
            }
        },
        'insertProduct': {
            method: 'POST',
            data: {
                title: 'title',
                description: 'description',
                price: 'price'
            }
        }
    });
}
