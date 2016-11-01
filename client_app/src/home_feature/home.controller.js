(function() {
  "use strict";

  angular
    .module("app")
    .controller("HomeController", HomeController);

  HomeController.$inject = ["$log", "MatchService", "$scope"];

  function HomeController($log, MatchService, $scope) {
    var vm = this;
    vm.all = all();
    vm.betSlip = [];
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

    function betTeam1(match) {
      var team = match.teams[0];
      var idx = vm.matches.indexOf(match)
      vm.matches.splice(idx, 1);
      match.teamPick = team;
      vm.betSlip.push(match);
      vm.betSlipIndices.push(idx);
      // use service to make AJAX to server
    }

    function betTeam2(match) {
      var team = match.teams[1];
      var idx = vm.matches.indexOf(match)
      vm.matches.splice(idx, 1);
      match.teamPick = team;
      vm.betSlip.push(match);
      vm.betSlipIndices.push(idx);
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
