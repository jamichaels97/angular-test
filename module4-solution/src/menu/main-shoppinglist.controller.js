(function () {
'use strict';

angular.module('MenuApp')
.controller('MainShoppingListController', MainShoppingListController);


MainShoppingListController.$inject = ['categories'];
function MainShoppingListController(categories) {
  var categoryList = this;
  categoryList.categories = categories;
}

})();
