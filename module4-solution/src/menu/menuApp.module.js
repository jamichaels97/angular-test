(function () {
'use strict';

angular.module('MenuApp', ['ui.router', 'Data'])
.config(function(){
  console.log("menu app configured");
})
.run(function(){
  console.log("menu app run");
});

})();
