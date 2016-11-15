(function() {
  "use strict";

  angular
    .module("app")
    .factory("BetService", BetService);

  BetService.$inject = ["$http", "MatchService", "$window", "$log", "UserService", "AuthTokenService"];

  function BetService($http, MatchService, $window, $log, UserService, AuthTokenService) {

    // var baseUrl = process.env.BASE_URL;
    var betSlip = [];
    var matches = MatchService.allActive()
        .then( matchesRes => matches = matchesRes.data)

    var betService = {
      getBetSlip: getBetSlip,
      betTeam1: betTeam1,
      betTeam2: betTeam2,
      clearBetSlip: clearBetSlip,
      placeBet: placeBet,
      removeOneBet: removeOneBet
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

    function removeOneBet(idx) {
      betSlip.splice(idx, 1);
    }

    function placeBet(betSlip, risks, user) {
      if (validateBet(risks, user)) {
        var url = `${baseUrl}/bets/create`
        return $http.post(url, {betSlip, risks, user})
                    .then((res) => {
                      return res.data.token;
                    });
      } else {
        return AuthTokenService.getToken()
      }
    }

    function decode(token) {
      return JSON.parse($window.atob(token.split('.')[1]));
    }

    function validateBet(risks, user) {
      console.log(riskSum(risks), user.balance)
      return riskSum(risks) < user.balance ? true : false
    }

    function riskSum(risks) {
      var sum = 0
      risks.forEach(risk => {
        sum += risk
      })
      return sum
    }

    return betService;

  }
})();
