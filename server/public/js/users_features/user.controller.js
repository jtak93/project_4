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
    vm.userService = UserService;
    vm.getUser = getUser;
    vm.getUserMatches = getUserMatches

    checkLoggedIn();
    // check if logged in
    function getUser() {
      return UserService.getUser();
    }

    function getUserMatches() {
      console.log('clicked!')
    }
    function checkLoggedIn() {
      UserService.checkLoggedIn();
      vm.user = getUser();
    }

    function clearViewModel() {
      vm.username = '';
      vm.password = '';
      vm.email = '';
      vm.pwConfirm= '';
    }

    function login() {
      UserService.login(vm.username, vm.password)
        .then( () => {
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
      vm.user = getUser();
      clearViewModel();
      $state.go('home');
    }

    function decode(token) {
      return JSON.parse($window.atob(token.split('.')[1])).user;
    }

  }

})();
