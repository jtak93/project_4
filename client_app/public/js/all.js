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
        controller: "DashboardCtrl",
        controllerAs: "dash",
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

  BetService.$inject = ["$http", "MatchService", "$window", "$log", "UserService"];

  function BetService($http, MatchService, $window, $log, UserService) {

    var baseUrl = 'http://localhost:3000';
    var betSlip = [];
    var matches = MatchService.all()
        .then( matchesRes => matches = matchesRes.data)

    var betService = {
      getBetSlip: getBetSlip,
      betTeam1: betTeam1,
      betTeam2: betTeam2,
      clearBetSlip: clearBetSlip,
      placeBet: placeBet
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

    function placeBet(betSlip, risks, user) {
      var url = `${baseUrl}/bets/create`
      return $http.post(url, {betSlip, risks, user})
                  .then((res) => {
                    return res.data.token;
                  });
    }

    function decode(token) {
      return JSON.parse($window.atob(token.split('.')[1]));
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
                    // matches have virtual odds property
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
      getUser: getUser,
      setUser: setUser,
      login: login,
      signUp: signUp,
      logout: logout,
      checkLoggedIn: checkLoggedIn
    };
    return service;

    function checkLoggedIn() {
      if (AuthTokenService.getToken()) {
        var token = AuthTokenService.getToken();
        var logUser = decode(token);
        user = logUser;
      }
    }

    function getUser() {
      return user;
    }

    function setUser(token) {
      AuthTokenService.setToken(token);
      user = decode(token);
      return user;
    }

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
      user = null;
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
    .controller("DashboardCtrl", DashboardCtrl);

  DashboardCtrl.$inject = ["$log", "MatchService", "BetService", "UserService"];

  function DashboardCtrl($log, MatchService, BetService, UserService) {
    var vm = this;
    vm.tabs = [{
            title: 'Profile',
            url: 'one.tpl.html'
        }, {
            title: 'My Bets',
            url: 'two.tpl.html'
        }, {
            title: 'Past Bets',
            url: 'three.tpl.html'
    }];

    vm.currentTab = 'one.tpl.html';

    vm.onClickTab = function (tab) {
        vm.currentTab = tab.url;
    }

    vm.isActiveTab = function(tabUrl) {
        return tabUrl == vm.currentTab;
    }
  }

})();

(function() {
  "use strict";

  angular
    .module("app")
    .controller("HomeController", HomeController);

  HomeController.$inject = ["$log", "MatchService", "BetService", "UserService"];

  function HomeController($log, MatchService, BetService, UserService) {
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

    function placeBet(user) {
      BetService.placeBet(vm.betSlip, vm.risks, user)
        .then((token) => {
          UserService.setUser(token);
          clearBetSlip();
        })
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
    vm.userService = UserService;
    vm.getUser = getUser;

    checkLoggedIn();
    // check if logged in
    function getUser() {
      return UserService.getUser();
    }
    function checkLoggedIn() {
      UserService.checkLoggedIn();
      vm.user = getUser();
    }

    function clearViewModel() {
      vm.username = '';
      vm.password = '';
      vm.email = '';
      vm.pwConfirm= '';
    }

    function login() {
      UserService.login(vm.username, vm.password)
        .then( () => {
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
      vm.user = getUser();
      clearViewModel();
      $state.go('home');
    }

    function decode(token) {
      return JSON.parse($window.atob(token.split('.')[1])).user;
    }

  }

})();
