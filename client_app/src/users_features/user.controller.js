(function() {
  "use strict";

  angular
    .module("app")
    .controller("UserController", UserController);

  UserController.$inject = ["$log", "UserService"];

  function UserController($log, UserService) {
    var vm = this;
    vm.login = login;

    function login() {
      return UserService.login(vm.username, vm.password)
    }
  }

})();
