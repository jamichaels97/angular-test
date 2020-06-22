(function() {
  'use strict';

  function UserInfoController(SignupService){
    var $ctrl = this;

    $ctrl.user = SignupService.user;

    $ctrl.selectedItem = SignupService.selectedItem;

    $ctrl.userIsSet = function(){
      return $ctrl.user.favoriteMenuItem !== "";
    }
  }
  UserInfoController.$inject = ['SignupService'];
  angular.module('public').controller('UserInfoController', UserInfoController);
}());
