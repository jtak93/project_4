(function() {
  "use strict";

  angular
    .module("app")
    .factory("BetService", BetService);

  BetService.$inject = ["$http", "MatchService", "$window", "$log"];

  function BetService($http, MatchService, $window, $log) {

    var betSlip = [];
    var matches = MatchService.all()
        .then( matchesRes => matches = matchesRes.data)

    var betService = {
      getBetSlip: getBetSlip,
      betTeam1: betTeam1,
      betTeam2: betTeam2,
      clearBetSlip: clearBetSlip
    };

    function getBetSlip() {
      return betSlip
    }

    function betTeam1(match) {
      var team = match.teams[0];
      var idx = matches.indexOf(match)
      MatchService.removeMatch(idx);
      match.teamPick = team;
      betSlip.push(match);
      // use service to make AJAX to server
    }

    function betTeam2(match) {
      var team = match.teams[1];
      var idx = matches.indexOf(match)
      MatchService.removeMatch(idx);
      match.teamPick = team;
      betSlip.push(match);
      // use service to make AJAX to server
    }

    function clearBetSlip() {
      console.log('clear BS')
      betSlip = [];
    }

    return betService;

  }
})();
