(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider ) {

  // Redirect to home page if no other URL matches
  $urlRouterProvider.otherwise('/');

  // *** Set up UI states ***
  $stateProvider

  // Home page
  .state('home', {
    url: '/',
    templateUrl: 'src/menu/templates/home.template.html'
  })

  // Premade list page
  .state('mainList', {
    url: '/categories',
    templateUrl: 'src/menu/templates/main-categoryList.template.html',
    controller: 'CategoryListController as categoryList',
    resolve: {
      categories: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories().
        then(function(results){
          return results;
        });
      }]
    }
  })

  .state('items', {
    url: '/menu-items/{categoryShortName}',
    templateUrl: 'src/menu/templates/items.template.html',
    controller: 'ItemsController as itemsCtrl',
    resolve: {
      category: ['$stateParams', function($stateParams){ return $stateParams.categoryShortName; }],
      itemsForCategory: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.categoryShortName)
                .then(function (items) {
                  return items;
                });
            }]
    }
  })
  ;
}

})();
