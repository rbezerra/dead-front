(function(){
  'use strict';

  angular
    .module('deadFront')
    .controller('ProgramasController', ProgramasController);

    /** @ngInject */
    function ProgramasController(ProgramasService, $mdDialog, $mdMedia, $log, $scope, $document){
      var vm = this;
      vm.programas = [];
      vm.programa = {
        nome: '',
        sigla: '',
        descricao: ''
      };

      vm.edit = false;
      vm.customFullscreen = $mdMedia('sm');

      reloadProgramas();

      vm.editarPrograma = function(ev, programa){
        vm.programa = programa;

        $mdDialog.show({
          controller: function(){
            var vm_ = this;
            vm_.programa = programa;

            if(!programa){
              vm_.edit = false;
            }else{
              vm_.edit = true;
            }
            //vm_.edit = vm.edit;

            vm_.salvar = function(programa){
              vm.save(programa);
              $mdDialog.cancel();
            };

            vm_.confirmRemove = function(ev, programa){
              vm.confirmRemove(ev, programa);
            }

            vm_.cancel = function(){
              $mdDialog.cancel();
            }
          },
          controllerAs: 'prog',
          templateUrl: 'app/programas/programa.form.tmpl.html',
          parent: angular.element($document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          escapeToClose:true,
          fullscreen: $mdMedia('sm') && vm.customFullscreen
        })
        .then(function(programa) {
          vm.save(programa);
        }, function() {
          $mdDialog.cancel();
        });
        $scope.$watch(function() {
          return $mdMedia('sm');
        }, function(sm) {
          vm.customFullscreen = (sm === true);
        });
        vm.edit = true;
      };

      vm.resetForm = resetForm();

      vm.save = function(programa){
        ProgramasService.save(programa);
        resetForm();
      }

      vm.confirmRemove = function(ev, programa){
        var confirm = $mdDialog.confirm()
          .title('Deseja excluir este programa?')
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
