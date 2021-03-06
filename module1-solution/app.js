(function fn(){
  'use strict';

  angular.module('LunchChecker', [])
  .controller('LunchCheckerController', LunchCheckerController);

  LunchCheckerController.$inject = ['$scope'];
  function LunchCheckerController($scope){
    $scope.input = "";
    $scope.results = "";

    $scope.checkIfTooMuch = function() {
      if($scope.input.trim() === ""){
        $scope.results = "Please enter data first";
        $scope.resultsStyle = {"color" : "red"}
        $scope.inputStyle = {"border-color": "red"}
      }
      else{
        CountToResults(CountItems($scope.input));
        $scope.resultsStyle = {"color" : "green"}
        $scope.inputStyle = {"border-color": "green"}
      }
    }

    function CountToResults(count){
      $scope.results = count <= 3 ? "Enjoy!" : "Too much!";
    }

    function CountItems(commaDelimitedString){
      var items = commaDelimitedString.split(",");
      var itemCount = 0;
      for(var i = 0; i < items.length; i++){
        if(items[i].trim() !== ""){
          itemCount++;
        }
      }

      return itemCount;
    }
  }
})();
