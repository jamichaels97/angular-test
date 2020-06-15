(function () {
'use strict';

angular.module('Data', ['ui.router'])
.config(function(){
  console.log("data app configured");
})
.run(function(){
  console.log("data app run");
});
})();
