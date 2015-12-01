(function(){
  'use strict';

  angular
    .module('deadFront')
    .controller('PerfisController', PerfisController);

    /** @ngInject */
    function PerfisController(PerfisService, $mdDialog, $mdMedia, $log, $scope, $document){
      var vm = this;
      vm.perfis = [];
      vm.perfil = {
        nome: '',
        sigla: '',
        descricao: ''
      };

      vm.persist = new PerfisService();

      vm.edit = false;
      vm.customFullscreen = $mdMedia('sm');

      reloadPerfis();

      vm.editarperfil = function(ev, perfil){
        vm.perfil = perfil;

        $mdDialog.show({
          controller: function(){
            var vm_ = this;
            vm_.perfil = perfil;

            if(!perfil){
              vm_.edit = false;
            }else{
              vm_.edit = true;
            }
            //vm_.edit = vm.edit;

            vm_.salvar = function(perfil){
              vm.save(perfil);
              $mdDialog.cancel();
            };

            vm_.confirmRemove = function(ev, perfil){
              vm.confirmRemove(ev, perfil);
            }

            vm_.cancel = function(){
              $mdDialog.cancel();
            }



          },
          controllerAs: 'perf',
          templateUrl: 'app/perfis/perfil.form.tmpl.html',
          parent: angular.element($document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          escapeToClose:true,
          fullscreen: $mdMedia('sm') && vm.customFullscreen
        })
        .then(function(perfil) {
          vm.save(perfil);
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

      vm.save = function(perfil){
        if(!perfil.id){
          vm.persist.data = perfil;
          vm.persist.$save(perfil, function(){
            $log.debug("perfil salvo ", perfil);
            resetForm();
          });
        }else{
          vm.persist.data = perfil;
          vm.persist.$update(function(){
            $log.debug("Dados salvos", vm.persist.data);
          });
        }
      }

      vm.confirmRemove = function(ev, perfil){
        var confirm = $mdDialog.confirm()
          .title('Deseja excluir este perfil?')
          .ariaLabel('Remover perfil')
          .targetEvent(ev)
          .ok('Sim, Tenho Certeza!')
          .cancel('Cancelar');
        $mdDialog.show(confirm).then(function() {
          vm.persist.data = perfil;
          vm.persist.$delete(function(){
            $log.debug("Perfil Excluído", perfil);
          });
          resetForm();
        }, function() {
          resetForm();
        });
      }

      function reloadPerfis(){
        vm.perfis = PerfisService.query();
      }

      function cleanForm(){
        vm.edit = false;
        vm.perfil = {
          nome: '',
          sigla: '',
          descricao: ''
        }
      }

      function resetForm(){
        reloadPerfis();
        cleanForm();
      }


    }
})();
