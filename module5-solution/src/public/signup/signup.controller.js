(function() {
  'use strict';

  console.log("creating signup controller.");
  function SignupController(SignupService){
    console.log("initializing signup ctrl.");
    var $ctrl = this;

    $ctrl.user = {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      favoriteMenuItem: ""
    };

    $ctrl.message ="";

    $ctrl.submit = function(){
      $ctrl.complete = true;
      SignupService.insertUserInfo($ctrl.user.firstName, $ctrl.user.lastName, $ctrl.user.email, $ctrl.user.phone, $ctrl.user.favoriteMenuItem)
      .then(function (valid) {
        console.log("input is valid: " + valid);
        if(valid)
        {
          $ctrl.message = "Your information has been saved.";
        }
        else{
          $ctrl.message = "No such menu number exists.";
        }
      });
    };
    console.log("done initializing signup ctrl.");
  }

  SignupController.$inject = ['SignupService'];
  angular.module('public').controller('SignupController', SignupController);
  console.log("done creating signup controller.");
}());
