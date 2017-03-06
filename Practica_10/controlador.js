var app = angular.module('myApp', []);
app.controller('nomControlador', ['$scope', 'miFactory',
    function ($scope, miFactory) {
        $scope.intent=0; 
        /*Al clicar sobre!START! envía una petición 
         * AJAX al servidor para que el servidor 
         * retorne una estructura  JSON con la longitud
         *  de la palabra elegida aleatoriamente*/
        $scope.start = function () {
            $scope.intent=0; //iniciem els intents a 0
            miFactory.startService().then(
                    function (response) {
                        //{"palabra":"patata"}
                        var text = response.data.palabra;
                        
                        console.log(text.length);
                        //$scope.textArr = text.split("");
                        //creem un array buida amb un número d'elements igual a la longitud de la paraula
                        $scope.textArr = new Array(text.length);
                        
                    },
                    function (response) {
                    }
            );

        };
        /**ha de generar una petición AJAX que pregunte si existe la letra 
         * introducida y en qué posiciones.*/
        $scope.checkLetra = function () {
            miFactory.checkLetra($scope.letra).then(
                    function (response) {
                        var posiciones= response.data.posicion;
                        var letra = response.data.letra;
                        console.log(posiciones);
                        
                        //omplim el array de lletres amb les lletres trobades
                        posiciones.forEach(function(item,index){
                             $scope.textArr[item]=letra;
                        });
                        //si no s'ha retornat ninguna posició, augmentem el comptador d'intents
                        if(posiciones.length===0){
                             $scope.intent++; //al modificar el intent, es modifica la imatge que es mostra
                        }
                        $scope.letra='';//buidem el input
                    }, function (response) {
            }
            );
        }
    }]);


