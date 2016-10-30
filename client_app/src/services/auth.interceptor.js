(function(){
  'use strict';

  angular.module('app')
    .factory('AuthIntercepter', AuthIntercepter);

  AuthIntercepter.$inject = ['AuthTokenService'];

  function AuthIntercepter(AuthTokenService) {

    return {
      request: addToken
    }

    function addToken(config) {
      var token = AuthTokenService.getToken();
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }
  }
})();
