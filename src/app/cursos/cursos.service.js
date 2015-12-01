(function(){
  'use strict';

  angular
    .module('deadFront')
    .service('CursosService', CursosService);

    /** @ngInject */
    function CursosService($resource){
      return $resource('http://deadws-psinalberth.rhcloud.com/api/cursos/:id', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      });
    }

})();
