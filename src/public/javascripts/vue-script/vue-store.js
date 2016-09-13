/*jshint unused:false */

(function (exports) {

	'use strict';

	const URL = "http://localhost:3000/api/products/";
	exports.vueStorage = {
		getAll: function () {
			return Vue.http.get(URL);
		},
		insert: function (product) {
			return Vue.http.post(URL, product);
		},
		update: function (product) {
			return Vue.http.put(URL + id, product);
		},
		remove: function (id) {
			return Vue.http.delete(URL + id);
		}
	};

})(window);