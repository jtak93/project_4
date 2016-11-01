(function() {
  "use strict";

  angular
    .module("app")
    .controller("HomeController", HomeController);

  HomeController.$inject = ["$log", "MatchService", "BetService"];

  function HomeController($log, MatchService, BetService) {
    var vm = this;
    vm.all = all();
    vm.betSlip = getBetSlip();
    vm.betSlipIndices = [];
    vm.risk = 0;
    vm.totalRisk = riskSum;

    vm.betTeam1 = betTeam1;
    vm.betTeam2 = betTeam2;
    vm.placeBet = placeBet;
    vm.test = function() {
      console.log(vm.risk)
    }


    function all() {
      vm.matches = MatchService.all()
        .then( matches => vm.matches = matches.data)
    }

    function getBetSlip() {
      return BetService.getBetSlip()
    }

    function betTeam1(match) {
      return BetService.betTeam1(match);
      // use service to make AJAX to server
    }

    function betTeam2(match) {
      return BetService.betTeam1(match);
      // use service to make AJAX to server
    }
    function riskSum() {
      // var sum = 0;
      // vm.risks.forEach(risk => {
      //   sum += risk;
      // })
      return vm.risk;
    }

    function placeBet() {
      console.log(vm.bets);
    }
  }

})();
