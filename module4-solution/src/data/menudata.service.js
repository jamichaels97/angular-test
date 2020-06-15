(function() {
  'use strict';

  angular.module('Data')
  .constant('ApiUrlBase', "https://davids-restaurant.herokuapp.com")
  .service('MenuDataService', ['$http', '$q', 'ApiUrlBase', function($http, $q, ApiUrlBase) {
    var search = this;

    search.getItemsForCategory = function(categoryShortName){
      return $http({
        method: "GET",
        url: (ApiUrlBase + "/menu_items.json"),
        params: {
          category: categoryShortName
        }
      })
      .then(function(response){
        return response.data.menu_items;
      })
      .catch (function(error){
        var errorMessage = "Error fetching menu items in service";
        console.log(errorMessage);
      });
    }

    var categories = [];

    var getCategoriesCache = function(){
      var deferred = $q.defer();
      deferred.resolve(categories);
      return deferred.promise;
    }

    var getCategoriesFromApi = function(){
      return $http({
        method: "GET",
        url: (ApiUrlBase + "/categories.json")
      })
      .then(function(response){
        console.log(response.data);
        categories = response.data;
        console.log(categories);
        return categories;
      })
      .catch (function(error){
        var errorMessage = "Error fetching menu items in service";
        console.log(errorMessage);
      });
    }

    search.getAllCategories = function(){
      console.log("in getAllCategories.");
      if(categories.length > 0){
        return getCategoriesCache(); // the point of this is to cache the results so there is only one API call.
        console.log(categories);
      }
      else {
        return getCategoriesFromApi();
        console.log(categories);
      }
    }

  }]);

}());
