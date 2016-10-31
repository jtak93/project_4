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
        controller: "HomeController",
        controllerAs: "vm",
        templateUrl: "src/home_feature/home.html"
      })

    $urlRouterProvider.otherwise("/");
  }

})();
