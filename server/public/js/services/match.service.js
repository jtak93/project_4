(function() {
  "use strict";

  angular
    .module("app")
    .factory("MatchService", MatchService);

  MatchService.$inject = ["$http", "AuthTokenService", "$window", "$log"];

  function MatchService($http, AuthTokenService, $window, $log) {

    // var baseUrl = process.env.BASE_URL;
    var allMatches = [];

    var service = {
      all: all,
      getUserMatches: getUserMatches,
      removeMatch: remove
    };
    return service;

    function all() {
      var url = `${baseUrl}/api/matches`
      return $http.get(url)
                  .then((matches) => {
                    // matches have virtual odds property
                    allMatches = matches.data;
                    return matches;
                  });
    }

    function getUserMatches(user) {
      var url = `${baseUrl}/api/matches/user`;
      return $http.post(url, {user})
                  .then((matches) => {
                    userMatches = matches.data;
                    return matches;
                  });
    }

    function remove(idx) {
      allMatches.splice(idx, 1);
    }
  }
})();
