(function() {
  angular.module('app', [
    "ui.router"
  ]);

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
        controller: "HomeController",
        controllerAs: "home",
        templateUrl: "src/home_feature/home.html"
      })
      .state("dashboard", {
        url: "/dashboard",
        // controller: "DashController",
        // controllerAs: "dash",
        templateUrl: "src/dashboard_feature/dashboard.html"
      })

    $urlRouterProvider.otherwise("/");
  }

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
    .factory("MatchService", MatchService);

  MatchService.$inject = ["$http", "AuthTokenService", "$window", "$log"];

  function MatchService($http, AuthTokenService, $window, $log) {

    var baseUrl = 'http://localhost:3000';

    var service = {
      all: all
    };
    return service;

    function all() {
      var url = `${baseUrl}/api/matches`
      return $http.get(url)
                  .then((matches) => {
                    console.log(matches)
                    return matches;
                  });
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
      login: login,
      signUp: signUp,
      logout: logout
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

    function signUp(user) {
      console.log("user service signup:", user)
      var url = `${baseUrl}/signup`;
      return $http.post(url, user)
                  .then((response) => {
                    console.log(response)
                    // var token = response.data.token;
                    // AuthTokenService.setToken(token);
                    // user = decode(token);
                    // console.log(user)
                    // return user;
                  });
    }

    function logout() {
      return AuthTokenService.removeToken();
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
    .controller("HomeController", HomeController);

  HomeController.$inject = ["$log", "MatchService"];

  function HomeController($log, MatchService) {
    var vm = this;
    vm.all = all();
    vm.bets = [];
    vm.betTeam1 = betTeam1;
    vm.betTeam2 = betTeam2;
    vm.betSlipIndices = []

    function all() {
      vm.matches = MatchService.all()
        .then( matches => vm.matches = matches.data)
    }

    function betTeam1(match) {
      // TODO: store team 1
      var idx = vm.matches.indexOf(match)
      vm.matches.splice(idx, 1);
      vm.bets.push(match);
      vm.betSlipIndices.push(idx);
    }

    function betTeam2(match) {
      // TODO: store team 2
      var idx = vm.matches.indexOf(match)
      vm.matches.splice(idx, 1);
      vm.bets.push(match);
      vm.betSlipIndices.push(idx);
    }
  }

})();

(function() {
  "use strict";

  angular
    .module("app")
    .controller("UserController", UserController);

  UserController.$inject = ["$log", "UserService", "$state", "AuthTokenService", "$window"];

  function UserController($log, UserService, $state, AuthTokenService, $window) {
    var vm = this;
    vm.login = login;
    vm.signUp = signUp;
    vm.logout = logout;
    vm.noMatch = null;
    vm.isLoggedIn = null;

    checkLoggedIn();
    // check if logged in
    function checkLoggedIn() {
      if (AuthTokenService.getToken()) {
        var token = AuthTokenService.getToken();
        vm.isLoggedIn = true;
        var user = decode(token);
        vm.username = user.username;
      } else {
        vm.isLoggedIn = false;
      }
    }

    function login() {
      UserService.login(vm.username, vm.password)
        .then( () => {
          vm.isLoggedIn = true;
          $('#myModal').modal('hide');
          $state.go('home')
        });
    }

    function signUp() {
      if (vm.password === vm.pwConfirm) {
        var newUser = {
          username: vm.username,
          email: vm.email,
          password: vm.password,
          pwConfirm: vm.pwConfirm
        }
        return UserService.signUp(newUser)
          .then( () => {
            vm.isLoggedIn = true;
            $('#myModal').modal('hide');
            $state.go('home')
          })
      }
      // TODO show user passwords dont match
      else {
        vm.noMatch = true;
        return console.log("passwords dont match")
      }
    }

    function logout() {
      UserService.logout();
      vm.isLoggedIn = false;
    }

    function decode(token) {
      return JSON.parse($window.atob(token.split('.')[1])).user;
    }

  }

})();
