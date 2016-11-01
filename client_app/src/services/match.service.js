(function() {
  "use strict";

  angular
    .module("app")
    .factory("MatchService", MatchService);

  MatchService.$inject = ["$http", "AuthTokenService", "$window", "$log"];

  function MatchService($http, AuthTokenService, $window, $log) {

    var baseUrl = 'http://localhost:3000';
    var allMatches = [];

    var service = {
      all: all,
      removeMatch: remove
    };
    return service;

    function all() {
      var url = `${baseUrl}/api/matches`
      return $http.get(url)
                  .then((matches) => {
                    allMatches = matches.data;
                    return matches;
                  });
    }

    function remove(idx) {
      allMatches.splice(idx, 1);
    }
  }
})();
