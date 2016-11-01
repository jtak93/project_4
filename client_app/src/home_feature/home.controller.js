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
    vm.betSlipIndices = [];
    vm.risks = [];
    vm.totalRisk = riskSum;

    vm.betTeam1 = betTeam1;
    vm.betTeam2 = betTeam2;
    vm.placeBet = placeBet;

    function all() {
      vm.matches = MatchService.all()
        .then( matches => vm.matches = matches.data)
    }

    function betTeam1(match) {
      var team = match.teams[0];
      var idx = vm.matches.indexOf(match)
      vm.matches.splice(idx, 1);
      match.teamPick = team;
      vm.bets.push(match);
      vm.risks.push(null)
      vm.betSlipIndices.push(idx);
      // use service to make AJAX to server
    }

    function betTeam2(match) {
      var team = match.teams[1];
      var idx = vm.matches.indexOf(match)
      vm.matches.splice(idx, 1);
      match.teamPick = team;
      vm.bets.push(match);
      vm.risks.push(null)
      vm.betSlipIndices.push(idx);
      // use service to make AJAX to server
    }
    function riskSum() {
      var sum = 0;
      vm.risks.forEach(risk => {
        sum += risk;
      })
      return sum;
    }

    function placeBet() {
      console.log(vm.bets);
    }
  }

})();
