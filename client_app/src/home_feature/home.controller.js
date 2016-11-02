(function() {
  "use strict";

  angular
    .module("app")
    .controller("HomeController", HomeController);

  HomeController.$inject = ["$log", "MatchService", "BetService"];

  function HomeController($log, MatchService, BetService) {
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
        .then(() => {

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
