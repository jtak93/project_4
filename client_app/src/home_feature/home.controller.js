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
