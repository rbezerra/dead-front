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
      this.save = save;
      this.remove = remove;

      function getAll(){
        return data;
      }

      function insert(programa){
        var id = data.length+1;
        programa.id = id;
        data.push(programa);
      }

      function update(programa){
        data[programa.id] = programa;
      }

      function save(programa){
        !programa.id ? insert(programa) : update(programa);
      }

      function remove(programa){
        data.map(function(item){
          if(item.id===programa.id){
            data.splice(data.indexOf(item), 1);
          }
        });
      }
    }

})();
