(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);

// 'item' is injected through state's resolve
ItemsController.$inject = ['category', 'itemsForCategory']
function ItemsController(category, itemsForCategory) {
  var itemCtrl = this;

  itemCtrl.selectedCategory = category;
  itemCtrl.items = itemsForCategory;
}

})();
