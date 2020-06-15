(function () {
'use strict';

angular.module('MenuApp')
.component('categoryList', {
  templateUrl: 'src/menu/templates/categoryList.template.html',
  bindings: {
    categories: '<'
  }
})
.component('itemList', {
  templateUrl: 'src/menu/templates/itemList.template.html',
  bindings:{
    items: '<'
  }
})
;

})();
