(function() {
  "use strict";

  angular
    .module("app")
    .controller("HomeController", HomeController);

  HomeController.$inject = ["$log", "MatchService"];

  function HomeController($log, MatchService) {
    var vm = this;
    vm.all = all();
    console.log(vm.all);

    function all() {
      MatchService.all()
        .then( matches => vm.matches = matches.data)
    }
  }

})();
