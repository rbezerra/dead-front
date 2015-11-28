(function(){
  'use strict';

  angular
    .module('deadFront')
    .controller('UIController', UIController);

    /** @ngInject */
    function UIController($mdDialog, $log){

      var vm = this;
      var originatorEv;



      vm.openMenu = function($mdOpenMenu, ev){
        originatorEv = ev;
        $mdOpenMenu(ev);
      }
    }
})();
