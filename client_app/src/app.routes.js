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
