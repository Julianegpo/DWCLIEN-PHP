app.service('service',['$resource', function ($resource) {
    this.consultaAjax = function () {
        return $resource("ranking.php/usuaris/:aux/:nick/:edad/:puntuacion/:intentos", null,{
            'update': {method: 'PUT'}
        });
    };
}]);
