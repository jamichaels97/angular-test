(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

// 'item' is injected through state's resolve
ItemsController.$inject = ['category', 'itemsForCategory']
function ItemsController(category, itemsForCategory) {
  var itemCtrl = this;
  console.log(category);
  console.log(itemsForCategory);

  itemCtrl.selectedCategory = category;
  itemCtrl.items = itemsForCategory;
}

})();
