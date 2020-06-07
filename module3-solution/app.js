(function fn(){
  'use strict';

  var app = angular.module('NarrowItDownApp', []);

  // https://github.com/jhu-ep-coursera/restaurant-menu-server
  app.service('MenuSearchService', ['$http', '$q', function($http, $q) {
    var search = this;

    var menuItems = [];

    var getMenuItemsCache = function(){
      var deferred = $q.defer();

      var result = menuItems;
      deferred.resolve(result);

      return deferred.promise;
    }

    var getMenuItemsFromApi = function(){
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      })
      .then(function(response){
        menuItems = response.data.menu_items;
        return menuItems;
      })
      .catch (function(error){
        var errorMessage = "Error fetching menu items in service";
        console.log(errorMessage);
      });
    }

    var getMenuItems = function(){
      if(menuItems.length > 0){
        return getMenuItemsCache(); // the point of this is to cache the results so there is only one API call.
      }
      else {
        return getMenuItemsFromApi();
      }
    }

    search.getMatchedMenuItems = function(searchTerm){
      return getMatchedItems(searchTerm);
    }

    var getMatchedItems = function(searchTerm){
      var containsText = function(item){ return item.name.includes(searchTerm); }
      return getMenuItems().then(function(result){
        return result.filter(containsText);
      });
    }

  }]);

  app.controller('NarrowItDownController', ['MenuSearchService', '$q', function(MenuSearchService, $q){
    var narrower = this;

    narrower.found = [];
    narrower.errorMessage = "";
    narrower.searchTerm = "";

    narrower.getMatchedMenuItems = function(){
      MenuSearchService.getMatchedMenuItems(narrower.searchTerm)
      .then(function(result){
        narrower.found = result;
      });
    }

    narrower.remove = function(index){
      narrower.found.splice(index, 1);
    }
  }]);

  app.directive('foundItems', function(){
    var ddo = {
      templateUrl: 'template/foundItems.html',
      scope: {
        items: '<',
        onRemove: '&'
      }
    };

    return ddo;
  })

})();
