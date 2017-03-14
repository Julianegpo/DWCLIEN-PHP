var app = angular.module('myApp', ['ngResource']);
app.controller('myController', ['$scope', 'MyServ',
    function ($scope, MyServ) {
        $scope.pokemons = MyServ.consultaAjax().get({});
        
        //consultaAjax() crea la consulta, i .get() genera la consulta canviant :id per Bulbasur
        MyServ.consultaAjax().get({id: "Bulbasaur"}); //consulta a: resp.php/pokem/Bulbasur
        //les dades les enviem en jSON com segon parametre de la accio
        var newPoke = {nombre: 'Pikachu', tipo: ["electrico"], nick:"Pitochu", evolucion: 'Raichu'};
        MyServ.consultaAjax().update({id: 2}, newPoke).$promise.then(
                function (response) { //$promis.then() permet executar un codi al rebre la resposta
                    console.log(response);
                    $scope.pokemons = response;
                },
                function (response) {
                    $scope.messError = "Error: " + response.status + " " + response.statusText;
                });
        $scope.pkmSubFunc = function () {
            console.log("crear pokemon");
            var pokemon = {
                nombre: $scope.pkmName, 
                tipo: [$scope.pkmType1,$scope.pkmType2],
                nick: $scope.pkmNick, 
                evolucion: $scope.pkmEvol
            };
            MyServ.consultaAjax().save({}, pokemon).$promise.then(
                    function(response){
                        console.log(response);
                        $scope.pokemons.response;
                    });
        }
        $scope.deletePkmFunc = function(index){
            console.log("eliminar pokemon");
            MyServ.consultaAjax().delete({}, index);
        }
        
    }]);