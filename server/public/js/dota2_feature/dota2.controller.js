(function() {
  "use strict";

  angular
    .module("app")
    .controller("Dota2Controller", Dota2Controller);

  Dota2Controller.$inject = ["$log", "MatchService", "BetService", "UserService"];

  function Dota2Controller($log, MatchService, BetService, UserService) {
    var vm = this;
    vm.matches = MatchService.allDota2()
      .then( matches => {
        vm.matches = matches.data;
        vm.gameName = matches.data[0].game
      })
    vm.betSlip = getBetSlip();
    vm.betSlipIndices = [];
    vm.risks = [];
    vm.removedMatches = [];
    vm.confirm = false;

    vm.totalRisk = riskSum;
    vm.removeOneBet = removeOneBet;
    vm.betTeam1 = betTeam1;
    vm.betTeam2 = betTeam2;
    vm.placeBet = placeBet;
    vm.clearBetSlip = clearBetSlip;
    vm.setConfirm = setConfirm;

    // clear betslip when initialized
    clearBetSlip();

    function getBetSlip() {
      return BetService.getBetSlip()
    }

    function betTeam1(match) {
      vm.risks.push(null);
      var idx = vm.matches.indexOf(match)
      removeMatch(idx);
      return BetService.betTeam1(match);
      // use service to make AJAX to server
    }

    function betTeam2(match) {
      vm.risks.push(null);
      var idx = vm.matches.indexOf(match)
      removeMatch(idx);
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
        .then((token) => {
          UserService.setUser(token);
          UserService.getUser();
          clearBetSlip();
        })
    }

    function removeOneBet(idx, bet) {
      console.log(idx)
      console.log(bet)
      var rmIdx = vm.removedMatches.indexOf(bet)
      console.log('rmIdx', rmIdx)
      replaceMatch(rmIdx)
      BetService.removeOneBet(idx)
      vm.risks.splice(idx, 1)
      vm.betSlip = getBetSlip();
    }

    function clearBetSlip() {
      console.log("clicked clear BS")
      MatchService.allDota2()
              .then( matchesRes => vm.matches = matchesRes.data)
      BetService.clearBetSlip();
      vm.risks = [];
      vm.confirm = false;
      vm.betSlip = getBetSlip();
      return vm.betSlip;
    }

    function removeMatch(idx) {
      vm.removedMatches.push(vm.matches[idx]);
      vm.matches.splice(idx, 1);
    }

    function replaceMatch(idx) {
      vm.matches.splice(idx, 0, vm.removedMatches[idx])
      vm.removedMatches.splice(idx, 1)
    }

    function setConfirm() {
      vm.confirm = true;
    }
  }

})();
