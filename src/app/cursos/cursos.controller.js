(function(){
  'use strict';

  angular
    .module('deadFront')
    .controller('CursosController', CursosController);

    /** @ngInject */
    function CursosController(CursosService, $mdDialog, $mdMedia, $log, $scope, $document){
      var vm = this;
      vm.cursos = [];
      vm.curso = {
        nome: '',
        descricao: ''
      };

      vm.persist = new CursosService();

      vm.edit = false;
      vm.customFullscreen = $mdMedia('sm');

      reloadCursos();

      vm.editarCurso = function(ev, curso){
        vm.curso = curso;

        $mdDialog.show({
          controller: function(){
            var vm_ = this;
            vm_.curso = curso;

            if(!curso){
              vm_.edit = false;
            }else{
              vm_.edit = true;
            }
            //vm_.edit = vm.edit;

            vm_.salvar = function(curso){
              vm.save(curso);
              $mdDialog.cancel();
            };

            vm_.confirmRemove = function(ev, curso){
              vm.confirmRemove(ev, curso);
            }

            vm_.cancel = function(){
              $mdDialog.cancel();
            }



          },
          controllerAs: 'cr',
          templateUrl: 'app/cursos/curso.form.tmpl.html',
          parent: angular.element($document.body),
          targetEvent: ev,
          clickOutsideToClose:true,
          escapeToClose:true,
          fullscreen: $mdMedia('sm') && vm.customFullscreen
        })
        .then(function(curso) {
          vm.save(curso);
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

      vm.save = function(curso){
        if(!curso.id){
          vm.persist.data = curso;
          vm.persist.$save(curso, function(){
            $log.debug("curso salvo ", curso);
            resetForm();
          });
        }else{
          vm.persist.data = curso;
          vm.persist.$update(function(){
            $log.debug("Dados salvos", vm.persist.data);
          });
        }
      }

      vm.confirmRemove = function(ev, curso){
        var confirm = $mdDialog.confirm()
          .title('Deseja excluir este curso?')
          .ariaLabel('Remover curso')
          .targetEvent(ev)
          .ok('Sim, Tenho Certeza!')
          .cancel('Cancelar');
        $mdDialog.show(confirm).then(function() {
          vm.persist.data = curso;
          vm.persist.$delete(function(){
            $log.debug("curso Excluído", curso);
          });
          resetForm();
        }, function() {
          resetForm();
        });
      }

      function reloadCursos(){
        vm.cursos = CursosService.query();
      }

      function cleanForm(){
        vm.edit = false;
        vm.curso = {
          nome: '',
          sigla: '',
          descricao: ''
        }
      }

      function resetForm(){
        reloadCursos();
        cleanForm();
      }


    }
})();
