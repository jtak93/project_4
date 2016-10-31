(function() {
  "use strict";

  angular
    .module("app")
    .controller("UserController", UserController);

  UserController.$inject = ["$log", "UserService", "$state"];

  function UserController($log, UserService, $state) {
    var vm = this;
    vm.login = login;
    vm.signUp = signUp;
    vm.noMatch = null;

    function login() {
      UserService.login(vm.username, vm.password);
      $state.go('home')
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
      }
      // TODO show user passwords dont match
      else {
        vm.noMatch = true;
        return console.log("passwords dont match")
      }
    }
  }

})();
