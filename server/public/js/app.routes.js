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
        templateUrl: "js/home_feature/home.html"
      })
      .state("about", {
        url: "/about",
        templateUrl: "js/about_feature/about.html"
      })
      .state("csgo", {
        url: "/csgo",
        controller: "CsgoController",
        controllerAs: "game",
        templateUrl: "js/csgo_feature/game.html"
      })
      .state("lol", {
        url: "/lol",
        controller: "LolController",
        controllerAs: "game",
        templateUrl: "js/csgo_feature/game.html"
      })
      .state("dota2", {
        url: "/dota2",
        controller: "Dota2Controller",
        controllerAs: "game",
        templateUrl: "js/csgo_feature/game.html"
      })
      .state("dashboard", {
        url: "/dashboard",
        controller: "DashboardCtrl",
        controllerAs: "dash",
        templateUrl: "js/dashboard_feature/dashboard.html"
      })
      .state("dashboard2", {
        url: "/dashboard",
        controller: "DashboardCtrl",
        controllerAs: "dash",
        templateUrl: "js/dashboard_feature/dashboard.html"
      })
    $urlRouterProvider.otherwise("/");
  }

})();
