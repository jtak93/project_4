(function() {
  angular.module('app', [
    "ui.router"
  ]);

})();

(function(){
  'use strict';

  angular.module('app')
    .factory('AuthTokenService', AuthTokenService);

  AuthTokenService.$inject = ['$window'];

  function AuthTokenService($window) {
    var key = 'auth-token';
    var store = $window.localStorage;

    return {
      getToken: getToken,
      setToken: setToken,
      removeToken: removeToken
    }

    function setToken(token) {
      return store.setItem(key, token);
    }

    function getToken() {
      return store.getItem(key);
    }

    function removeToken() {
      store.removeItem(key)
    }
  }

})();

(function() {
  "use strict";

  angular
    .module("app")
    .factory("ServiceName", ServiceName);

  ServiceName.$inject = [];

  function ServiceName() {
    var service = {
      name:        ''
    };

    return service;
  }

})();

(function(){
  'use strict';

  angular.module('app')
    .config(config);

  config.$inject = ['$httpProvider'];

  function config($httpProvider) {
    $httpProvider.interceptors.push('AuthIntercepter');
  }

})();

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

(function() {
  "use strict";

  angular
    .module("app")
    .factory("UserService", UserService);

  UserService.$inject = ["$http", "AuthTokenService", "$window", "$log"];

  function UserService($http, AuthTokenService, $window, $log) {

    var baseUrl = 'http://localhost:3000';

    var user = null;

    var service = {
      login: login
    };
    return service;

    function login(username, password) {
      var url = `${baseUrl}/login`
      return $http.post(url, {username, password})
                  .then((response) => {
                    var token = response.data.token;
                    AuthTokenService.setToken(token);
                    user = decode(token);
                    console.log(user)
                    return user;
                  });
    }

    function decode(token) {
      return JSON.parse($window.atob(token.split('.')[1])).user;
    }
  }

})();

(function() {
  "use strict";

  angular
    .module("app")
    .config(AppRoutes);

  AppRoutes.$inject = ["$stateProvider", "$urlRouterProvider"];

  function AppRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("home", {
        url: "/",
        // TODO: URL not loading
        templateUrl: "/home.html",
        controller: "MainController",
        controllerAs: "vm"
      })

    $urlRouterProvider.otherwise("/");
  }

})();

(function() {
  "use strict";

  angular
    .module("app")
    .controller("MainController", MainController);

  MainController.$inject = ["$log"];

  function MainController($log) {
    var vm = this;
  }

})();

(function() {
  "use strict";

  angular
    .module("app")
    .controller("UserController", UserController);

  UserController.$inject = ["$log", "UserService"];

  function UserController($log, UserService) {
    var vm = this;
    vm.login = login;

    function login() {
      return UserService.login(vm.username, vm.password)
    }
  }

})();
