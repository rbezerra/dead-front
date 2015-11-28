(function(){
  'use strict';

  angular
    .module('deadFront')
    .service('ProgramasService', ProgramasService);

    /** @ngInject */
    function ProgramasService(){
      var data = [
        {
          'id' : 1,
          'nome': 'Programa 001',
          'sigla': 'PRG001',
          'descricao': 'IPSUM LOREM 01'
        },
        {
          'id' : 2,
          'nome': 'Programa 002',
          'sigla': 'PRG002',
          'descricao': 'IPSUM LOREM 01'
        },
        {
          'id' : 3,
          'nome': 'Programa 003',
          'sigla': 'PRG003',
          'descricao': 'IPSUM LOREM 01'
        },
        {
          'id' : 4,
          'nome': 'Programa 004',
          'sigla': 'PRG004',
          'descricao': 'IPSUM LOREM 01'
        }
      ];

      this.getAll = getAll;

      function getAll(){
        return data;
      }
    }

})();
