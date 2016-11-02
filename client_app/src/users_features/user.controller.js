(function() {
  "use strict";

  angular
    .module("app")
    .controller("UserController", UserController);

  UserController.$inject = ["$log", "UserService", "$state", "AuthTokenService", "$window"];

  function UserController($log, UserService, $state, AuthTokenService, $window) {
    var vm = this;
    vm.login = login;
    vm.signUp = signUp;
    vm.logout = logout;
    vm.noMatch = null;
    vm.isLoggedIn = null;
    vm.userService = UserService;

    checkLoggedIn();
    // check if logged in
    function checkLoggedIn() {
      if (AuthTokenService.getToken()) {
        var token = AuthTokenService.getToken();
        vm.isLoggedIn = true;
        var user = decode(token);
        vm.user = user;
      } else {
        vm.isLoggedIn = false;
      }
    }

    function login() {
      UserService.login(vm.username, vm.password)
        .then( () => {
          vm.isLoggedIn = true;
          $('#myModal').modal('hide');
          $state.go('home')
          checkLoggedIn();
        });
    }

    function signUp() {
      if (vm.password === vm.pwConfirm) {
        var newUser = {
          username: vm.username,
          email: vm.email,
          password: vm.password,
          pwConfirm: vm.pwConfirm
        }
        return UserService.signUp(newUser)
          .then( () => {
            vm.isLoggedIn = true;
            $('#myModal').modal('hide');
            $state.go('home')
            checkLoggedIn();
          })
      }
      // TODO show user passwords dont match
      else {
        vm.noMatch = true;
        return console.log("passwords dont match")
      }
    }

    function logout() {
      UserService.logout();
      vm.isLoggedIn = false;
    }

    function decode(token) {
      return JSON.parse($window.atob(token.split('.')[1])).user;
    }

  }

})();
