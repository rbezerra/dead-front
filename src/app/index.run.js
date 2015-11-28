(function() {
  'use strict';

  angular
    .module('deadFront')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
