(function() {
  "use strict";

  angular
    .module("app")
    .factory("UserService", UserService);

  UserService.$inject = [];

  function UserService() {
    var service = {
      name:        ''
    };

    return service;
  }

})();
