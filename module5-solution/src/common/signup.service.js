(function() {
  'use strict';

  function SignupService($q, $http, ApiPath){
    console.log("initializing signup service.");

    var $signup = this;

    $signup.user = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      favoriteMenuItem: ""
    }

    $signup.selectedItem;

    $signup.insertUserInfo = function(first, last, emailAddr, phoneNumber, favoriteItem){
      return checkMenuItem(favoriteItem).then(function (exists) {
        if(exists){
          $signup.user.firstName = first;
          $signup.user.lastName = last;
          $signup.user.email = emailAddr;
          $signup.user.phone = phoneNumber;
          $signup.user.favoriteMenuItem = favoriteItem;
        }
        console.log("item exists: " + exists);
        return exists;
      });
    }

    var checkMenuItem = function(itemShortName){
       return $http.get(ApiPath + '/menu_items/' + itemShortName + ".json")
              .then(function (response) {
                $signup.selectedItem = response.data;
                return true;
              })
              .catch(function(error){
                $signup.selectedItem = null;
                return false;
              });
    }
     console.log("initializED signup service.");
   };

  SignupService.$inject = ['$q', '$http', 'ApiPath'];


  angular.module('public').service('SignupService', SignupService);



}());
