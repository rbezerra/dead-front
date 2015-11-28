(function() {
  'use strict';

  angular
    .module('deadFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('programas', {
        url: '/programas',
        templateUrl: 'app/programas/programas.html',
        controller: 'ProgramasController',
        controllerAs: 'prog'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
