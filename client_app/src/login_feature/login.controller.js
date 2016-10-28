(function() {
  "use strict";

  angular
    .module("app")
    .controller("LoginController", LoginController);

  LoginController.$inject = ["$log"];

  function LoginController($log) {
    var vm = this;
  }

})();
