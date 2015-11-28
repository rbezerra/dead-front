(function(){
  'use strict';

  angular
    .module('deadFront')
    .controller('ProgramasController', ProgramasController);

    /** @ngInject */
    function ProgramasController(ProgramasService, $log){
      var vm = this;
      vm.programas = [];
      vm.nome = '';
      vm.sigla = '';
      vm.descricao = '';

      vm.programas = ProgramasService.getAll();

    }
})();
