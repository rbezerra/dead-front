(function(){
  'use strict';

  angular
    .module('deadFront')
    .service('PerfisService', PerfisService);

    /** @ngInject */
    function PerfisService($resource){
      return $resource('http://deadws-psinalberth.rhcloud.com/api/perfis/:id', {id: '@id'}, {
        update: {
          method: 'PUT'
        }
      });
    }

})();
