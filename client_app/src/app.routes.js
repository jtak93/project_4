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
