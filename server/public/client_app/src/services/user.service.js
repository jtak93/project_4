(function() {
  "use strict";

  angular
    .module("app")
    .factory("UserService", UserService);

  UserService.$inject = ["$http", "AuthTokenService", "$window", "$log"];

  function UserService($http, AuthTokenService, $window, $log) {

    var baseUrl = process.env.BASE_URL;

    var user = null;

    var service = {
      getUser: getUser,
      setUser: setUser,
      login: login,
      signUp: signUp,
      logout: logout,
      checkLoggedIn: checkLoggedIn
    };
    return service;

    function checkLoggedIn() {
      if (AuthTokenService.getToken()) {
        var token = AuthTokenService.getToken();
        var logUser = decode(token);
        user = logUser;
      }
    }

    function getUser() {
      return user;
    }

    function setUser(token) {
      AuthTokenService.setToken(token);
      user = decode(token);
      return user;
    }

    function login(username, password) {
      var url = `${baseUrl}/login`
      return $http.post(url, {username, password})
                  .then((response) => {
                    var token = response.data.token;
                    AuthTokenService.setToken(token);
                    user = decode(token);
                    console.log(user)
                    return user;
                  });
    }

    function signUp(user) {
      console.log("user service signup:", user)
      var url = `${baseUrl}/signup`;
      return $http.post(url, user)
                  .then((response) => {
                    console.log(response)
                    var token = response.data.token;
                    AuthTokenService.setToken(token);
                    user = decode(token);
                    console.log(user)
                    return user;
                  });
    }

    function logout() {
      user = null;
      return AuthTokenService.removeToken();
    }

    function decode(token) {
      return JSON.parse($window.atob(token.split('.')[1])).user;
    }
  }

})();
