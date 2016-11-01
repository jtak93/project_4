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
    .factory("BetService", BetService);

  BetService.$inject = ["$http", "MatchService", "$window", "$log"];

  function BetService($http, MatchService, $window, $log) {

    var betSlip = [];
    var matches = MatchService.all()
        .then( matchesRes => matches = matchesRes.data)

    var betService = {
      getBetSlip: getBetSlip,
      betTeam1: betTeam1,
      betTeam2: betTeam2,
      clearBetSlip: clearBetSlip
    };

    function getBetSlip() {
      return betSlip;
    }

    function betTeam1(match) {
      match.teamPick = match.teams[0];
      betSlip.push(match);
      console.log(betSlip)
      // use service to make AJAX to server
    }

    function betTeam2(match) {
      console.log(match.teams[1])
      match.teamPick = match.teams[1];
      betSlip.push(match);
      // use service to make AJAX to server
    }

    function clearBetSlip() {
      console.log('clear BS')
      betSlip = [];
    }

    return betService;

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
    var allMatches = [];

    var service = {
      all: all,
      removeMatch: remove
    };
    return service;

    function all() {
      var url = `${baseUrl}/api/matches`
      return $http.get(url)
                  .then((matches) => {
                    allMatches = matches.data;
                    return matches;
                  });
    }

    function remove(idx) {
      allMatches.splice(idx, 1);
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
                    var token = response.data.token;
                    AuthTokenService.setToken(token);
                    user = decode(token);
                    console.log(user)
                    return user;
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

  HomeController.$inject = ["$log", "MatchService", "BetService"];

  function HomeController($log, MatchService, BetService) {
    var vm = this;
    vm.matches = MatchService.all()
      .then( matches => vm.matches = matches.data)
    vm.betSlip = getBetSlip();
    vm.betSlipIndices = [];
    vm.risks = [];
    vm.totalRisk = riskSum;

    vm.betTeam1 = betTeam1;
    vm.betTeam2 = betTeam2;
    vm.placeBet = placeBet;
    vm.clearBetSlip = clearBetSlip;

    function getBetSlip() {
      return BetService.getBetSlip()
    }

    function betTeam1(match) {
      vm.risks.push(null);
      var idx = vm.matches.indexOf(match)
      MatchService.removeMatch(idx);
      return BetService.betTeam1(match);
      // use service to make AJAX to server
    }

    function betTeam2(match) {
      vm.risks.push(null);
      var idx = vm.matches.indexOf(match)
      MatchService.removeMatch(idx);
      return BetService.betTeam2(match);
      // use service to make AJAX to server
    }
    function riskSum() {
      var sum = 0;
      vm.risks.forEach(risk => {
        if (risk){
          sum += risk;
        }
      })
      return sum;
    }

    function placeBet() {
      BetService.placeBet(vm.betSlip)
    }

    function clearBetSlip() {
      console.log("clicked clear BS")
      MatchService.all()
              .then( matchesRes => vm.matches = matchesRes.data)
      BetService.clearBetSlip();
      vm.risks = [];
      vm.betSlip = getBetSlip();
      return vm.betSlip;
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
        vm.user = user;
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
          checkLoggedIn();
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
            checkLoggedIn();
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
