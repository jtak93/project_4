(function() {
  "use strict";

  angular
    .module("app")
    .controller("DashboardCtrl", DashboardCtrl);

  DashboardCtrl.$inject = ["$log", "MatchService", "BetService", "UserService"];

  function DashboardCtrl($log, MatchService, BetService, UserService) {
    var vm = this;

console.log('hey')

    vm.getMatches = getMatches;
    vm.tabs = [{
            title: 'Profile',
            url: 'one.tpl.html'
        }, {
            title: 'My Bets',
            url: 'two.tpl.html'
        }, {
            title: 'Past Bets',
            url: 'three.tpl.html'
    }];

    vm.currentTab = 'one.tpl.html';

    vm.onClickTab = function (tab) {
        vm.currentTab = tab.url;
    }

    vm.isActiveTab = function(tabUrl) {
        return tabUrl == vm.currentTab;
    }

    function getMatches() {
      console.log('clicked!')
    }
  }

  console.log(this)

})();
