(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://limitless-plateau-49072.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
