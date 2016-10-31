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

    function all() {
      MatchService.all()
        .then( matches => vm.matches = matches.data)
    }

    function betTeam1(match) {
      $log.info(match)
      vm.bets.push(match)
    }

    function betTeam2(match) {
      $log.info(match)
      vm.bets.push(match)
    }
  }

})();
