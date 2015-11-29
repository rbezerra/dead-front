(function(){
  'use strict';

  angular
    .module('deadFront')
    .service('ProgramasService', ProgramasService);

    /** @ngInject */
    function ProgramasService($resource){
      return $resource('http://deadws-psinalberth.rhcloud.com/api/programas/:id', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      });
    }

})();
