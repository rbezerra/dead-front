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
      })
      .state('cursos', {
        url: '/cursos',
        templateUrl: 'app/cursos/cursos.html',
        controller: 'CursosController',
        controllerAs: 'cr'
      })
      .state('perfis',{
        url: 'perfis',
        templateUrl: 'app/perfis/perfis.html',
        controller: 'PerfisController',
        controllerAs: 'perf'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
