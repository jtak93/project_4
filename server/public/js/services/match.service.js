(function() {
  "use strict";

  angular
    .module("app")
    .factory("MatchService", MatchService);

  MatchService.$inject = ["$http", "AuthTokenService", "$window", "$log"];

  function MatchService($http, AuthTokenService, $window, $log) {

    // var baseUrl = process.env.BASE_URL;
    var allMatches = [];
    var allCSGOMatches = [];
    var removedMatches = [];

    var service = {
      allActive: allActive,
      allCSGO: allCSGO,
      allLOL: allLOL,
      allDota2: allDota2,
      getUserMatches: getUserMatches,
      removeMatch: remove,
      getRemovedMatches: getRemovedMatches,
      replaceMatch: replaceMatch

    };
    return service;

    // Use to get all past matches
    function all() {
      var url = `${baseUrl}/api/matches`
      return $http.get(url)
                  .then((matches) => {
                    // matches have virtual odds property
                    allMatches = matches.data;
                    return matches;
                  });
    }

    // only gets matches where 'active' : true
    function allActive() {
      var url = `${baseUrl}/api/matches/active`
      return $http.get(url)
                  .then((matches) => {
                    // matches have virtual odds property
                    allMatches = matches.data;
                    return matches;
                  });
    }

    function allCSGO() {
      var url = `${baseUrl}/api/matches/active/csgo`
      return $http.get(url)
                  .then((matches) => {
                    // matches have virtual odds property
                    allCSGOMatches = matches;
                    return matches;
                  });
    }

    function allLOL() {
      var url = `${baseUrl}/api/matches/active/lol`
      return $http.get(url)
                  .then((matches) => {
                    // matches have virtual odds property
                    allCSGOMatches = matches;
                    return matches;
                  });
    }


    function allDota2() {
      var url = `${baseUrl}/api/matches/active/dota2`
      return $http.get(url)
                  .then((matches) => {
                    // matches have virtual odds property
                    allCSGOMatches = matches;
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

    function replaceMatch(idx) {
      allMatches.splice(idx, 0, removedMatches[idx])
      removedMatches.splice(idx, 1)
    }

    function getRemovedMatches() {
      return removedMatches
    }
    function remove(idx) {
      removedMatches.push(allMatches[idx]);
      allMatches.splice(idx, 1);
    }
  }
})();
