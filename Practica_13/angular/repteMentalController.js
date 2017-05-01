// controller
app = angular.module('retoMental', ['ngResource']);
app.controller('controlador', ['$scope', 'service', '$http', 
    function ($scope, service, $http) {
        $("#pistaLbl").hide();
        $("#preguntaLbl").hide();
        $("#respuestasLbl").hide();
        $(".respuestas").hide();
        $("#hide").hide();
        $("#ranking").hide();
        $("#infoUser").hide();
       
        $scope.getUserInfo = function(nickRanking, posicion){
           service.consultaAjax().get({aux: "byuser", nick: nickRanking}).$promise.then(
                    function(response){
                        if(posicion == "form"){
                            $scope.nick = response.nick;
                            $scope.edad = response.edad;
                        }else if(posicion = "info"){
                            $scope.nickInfo = response.nick;
                            $scope.edadInfo = response.edad;
                            $scope.puntuacionInfo = response.puntuacion;
                            $scope.intentosInfo = response.intentos;
                        }
                        
                    }, function(response){
                        alert("Ha habido un error al recibir los usuarios");
                    }
            );
        }
        $scope.getRanking = function(){
            $("#ranking").show();
            $("#hide").show();
            $("#showRanking").hide();
            $scope.show = true;
            $scope.noshow = false;
            loadRanking();
        }
        $scope.hideRanking = function(){
            $("#ranking").hide();
            $("#showRanking").show();
            $("#hide").hide();
        }
        $scope.getImagen = function(){
            if(($scope.nick == undefined && $scope.edad == undefined) || isNaN($scope.edad)){
                alert("No puedes empezar a jugar si no te registras");
            }else{
                $("#infoUser").show();
                service.consultaAjax().get({aux: "login", nick: $scope.nick, edad:$scope.edad}).$promise.then(
                    function(response){
                        $("#login").hide();
                        console.log(response);
                    }, function (response){
                        alert("Ha habido un error con el login, intenta volver a acceder!!");
                    }
                ); 
                $scope.getUserInfo($scope.nick, "info");
                $http.get("ajax.php?ruta=si").then(
                    function(response){
                        $scope.ruta = "../img/"+response.data.ruta; 
                        $("#imagen").mouseover($scope.getPista);
                        $("#imagen").mouseout($scope.getPregunta);
                    },
                    function(response){
                        $scope.message = "Error:" + response.status +
                         " " + response.statusText;
                    });
            }
        }
        $scope.getPista = function(){
            $("#imagen").unbind("mouseover");
            console.log("GET PISTA");
            $http.get("ajax.php?pista=si").then(
            function(response){
                $("#pistaLbl").show();
                $scope.pista = response.data.pista;
            },
            function(response){
                $scope.message = "Error:" + response.status +
                 " " + response.statusText;
            });
        }
        $scope.getPregunta = function(){
            $("#imagen").unbind("mouseout");
            console.log("GET PREGUNTA");
            $http.get("ajax.php?pregunta=si").then(
            function(response){
                $("#preguntaLbl").show();
                $(".respuestas").show();
                $("#respuestasLbl").show();
                $("#imagen").hide();
                $scope.pregunta = response.data.pregunta;
            },
            function(response){
                $scope.message = "Error:" + response.status +
                 " " + response.statusText;
            });
        }
        $scope.checkRespuesta = function(value){
            $scope.disabled = false;
            $http.get("ajax.php?respuesta="+value+"").then(
                function(response){
                    var user = {nick: $scope.nickInfo, edad: $scope.edadInfo, puntuacion: $scope.puntuacionInfo, intentos: $scope.intentosInfo};
                    var pos = response.data.posicion;
                    var respuesta = response.data.respuesta;
                    if(respuesta === "acertado"){
                        $("#"+value).css("color", "#7CFC00");
                        $scope.textoFinal = "Enhorabuena, has acertado";
                        service.consultaAjax().update({aux: "acertado"}, user).$promise.then(
                            function(response){}, function(response){
                                alert("Error registrando la puntuación");
                            }
                        );
                    }else if(respuesta == "fallado"){
                        $("#"+value).css("color", "red");
                        $scope.textoFinal = "Vaya, has fallado... Vuelve a intentarlo!";
                        service.consultaAjax().update({aux: "fallado"}, user).$promise.then(
                            function(response){}, function(response){
                                alert("Error registrando la puntuación");
                            });
                    }
                    $scope.disabled = true;
                },
                function(response){
                    $scope.message = "Error:" + response.status +
                     " " + response.statusText;
                });
        }
        $scope.deleteUser = function(nick){
            if(nick == $scope.nickInfo){
                alert("No te puedes eliminar a ti mismo si estás conectado");
            }else{
                service.consultaAjax().delete({nick: nick}).$promise.then(
                        function(response){
                            console.log(nick);
                            console.log(response);
                            // vuelve a cargar el ranking, se actualiza con lo que se ha borrado
                            loadRanking();
                        }, function(response){
                            alert("Error al eliminar el usuario");
                        });
            }
        }
        function loadRanking(){
            service.consultaAjax().get().$promise.then(
                    function(response){
                        console.log(response);
                        $scope.ranking = response;
                    }, function(response){
                        alert("Ha habido un error al recibir los usuarios");
                    }
            );
        }
    }
]);
