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
        controller: "MainController",
        controllerAs: "vm",
        templateUrl: "src/templates/home.html"
      })

    $urlRouterProvider.otherwise("/");
  }

})();
