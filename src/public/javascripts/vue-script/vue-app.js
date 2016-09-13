/*global Vue, todoStorage */


(function (exports) {

	'use strict';

	exports.app = new Vue({

		// the root element that will be compiled
		el: '#site',

		config: {
			devtools: true
		},

		// app initial state
		data: {
			view: {
				mode: 'table',
				state: 'insert',
				error: ''
			},
			products: [],
			product: null
		},
		ready: function(){
			var self = this;
			vueStorage.getAll()
					.then(function(response){
						self.products = response.body.products;
					});
		},


		// computed properties
		// http://vuejs.org/guide/computed.html
		computed: {
		},

		// methods that implement data logic.
		// note there's no DOM manipulation here at all.
		methods: {
			switchMode: function(mode, state, err){
				this.view = {
								mode: mode,
								state: state,
								error: err
							};				
			},

			startInsert: function(){
				this.product = null;
				this.switchMode('form', 'insert', '');
			},
			doneInsert: function () {
				var self = this;
				var p = self.product;
				vueStorage.insert(p)
					.then(function(response){
						if(response.body.result){
							self.products.$set(self.products.length, p);
							self.switchMode('table', 'insert', '');
						}else{
							self.view.error = response.body.errorDesc;
						}						
					});
			},

			startEdit: function (product) {
				this.product = product;
				this.switchMode('form', 'update', '');
			},
			doneEdit: function () {
				var self = this;
				var p = self.product;
				vueStorage.insert(p)
					.then(function(response){
						if(response.body.result){							
							self.products.$set(self.products.length, p);
							self.switchMode('table', 'insert', '');
						}else{
							self.view.error = response.body.errorDesc;
						}	
					});
				
			},

			remove: function (product) {
				var self = this;
				vueStorage.remove(product._id)
					.then(function(response){
						if(response.body.result){
							self.products.$remove(product);
						}else{
							self.view.error = response.body.errorDesc;
						}							
					});
			},

			cancelEditMode: function () {
				this.product = null;
				this.switchMode('table', 'insert', '');
			}

		},


	});
	
})(window);