(function() {
  "use strict";

  angular
    .module("app")
    .controller("DashboardCtrl", DashboardCtrl);

  DashboardCtrl.$inject = ["$log", "MatchService", "BetService", "UserService"];

  function DashboardCtrl($log, MatchService, BetService, UserService) {
    var vm = this;
    vm.tabs = [{
            title: 'Profile',
            url: 'one.tpl.html'
        }, {
            title: 'My Bets',
            url: 'two.tpl.html',
            click: getUserMatches
        }, {
            title: 'Past Bets',
            url: 'three.tpl.html'
    }];
    vm.getUserMatches = getUserMatches;

    vm.currentTab = 'one.tpl.html';

    vm.onClickTab = function (tab) {
        vm.currentTab = tab.url;
        tab.click()
    }

    vm.isActiveTab = function(tabUrl) {
        return tabUrl == vm.currentTab;
    }

    function getUserId() {
      var id = UserService.getUser()._id;
      return id
    }

    function getUserMatches() {
      console.log('clicked!')
      var userId = getUserId();
      MatchService.getUserMatches(userId)
        .then( res => {
          vm.userMatches = res.data
          console.log(vm.userMatches)
        })
    }
  }

})();
