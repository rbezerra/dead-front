(function(){
  'use strict';

  angular
    .module('deadFront')
    .controller('ProgramasController', ProgramasController);

    /** @ngInject */
    function ProgramasController(ProgramasService, $mdDialog, $log){
      var vm = this;
      vm.programas = [];
      vm.programa = {
        nome: '',
        sigla: '',
        descricao: ''
      };

      vm.edit = false;

      reloadProgramas();

      vm.editarPrograma = function(programa){
        $log.debug(programa);
        vm.edit = true;
        vm.programa = programa;
      };

      vm.resetForm = resetForm();

      vm.save = function(programa){
        ProgramasService.save(programa);
        resetForm();
      }

      vm.confirmRemove = function(ev, programa){
        var confirm = $mdDialog.confirm()
          .title('Deseja excluir este programa?')
          //.textContent('All of the banks have agreed to forgive you your debts.')
          .ariaLabel('Remover Programa')
          .targetEvent(ev)
          .ok('Sim, Tenho Certeza!')
          .cancel('Cancelar');
        $mdDialog.show(confirm).then(function() {
          ProgramasService.remove(programa);
          resetForm();
        }, function() {
          resetForm();
        });
      }

      function reloadProgramas(){
        vm.programas = ProgramasService.getAll();
      }

      function cleanForm(){
        vm.edit = false;
        vm.programa = {
          nome: '',
          sigla: '',
          descricao: ''
        }
      }

      function resetForm(){
        reloadProgramas();
        cleanForm();
      }


    }
})();
