(function() {
  "use strict";

  angular
    .module("app")
    .factory("BetService", BetService);

  BetService.$inject = ["$http", "MatchService", "$window", "$log"];

  function BetService($http, MatchService, $window, $log) {

    var baseUrl = 'http://localhost:3000';
    var betSlip = [];
    var matches = MatchService.all()
        .then( matchesRes => matches = matchesRes.data)

    var betService = {
      getBetSlip: getBetSlip,
      betTeam1: betTeam1,
      betTeam2: betTeam2,
      clearBetSlip: clearBetSlip,
      placeBet: placeBet
    };

    function getBetSlip() {
      return betSlip;
    }

    function betTeam1(match) {
      match.teamPick = match.teams[0];
      betSlip.push(match);
      console.log(betSlip)
      // use service to make AJAX to server
    }

    function betTeam2(match) {
      console.log(match.teams[1])
      match.teamPick = match.teams[1];
      betSlip.push(match);
      // use service to make AJAX to server
    }

    function clearBetSlip() {
      console.log('clear BS')
      betSlip = [];
    }

    function placeBet(betSlip, risks, user) {
      var url = `${baseUrl}/bets/create`
      return $http.post(url, {betSlip, risks, user})
                  .then((res) => {
                    var token = res.data.token;
                    var user = decode(token).user
                    return user
                  });
    }

    function decode(token) {
      return JSON.parse($window.atob(token.split('.')[1]));
    }

    return betService;

  }
})();
