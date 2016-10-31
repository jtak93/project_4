(function() {
  "use strict";

  angular
    .module("app")
    .controller("UserController", UserController);

  UserController.$inject = ["$log", "UserService"];

  function UserController($log, UserService) {
    var vm = this;
    vm.login = login;
    vm.signUp = signUp;

    function login() {
      return UserService.login(vm.username, vm.password)
    }

    function signUp() {
      var newUser = {
        username: vm.username,
        email: vm.email,
        password: vm.password,
        pwConfirm: vm.pwConfirm
      }
      return UserService.signUp(newUser)
    }
  }

})();
