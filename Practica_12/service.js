app.service('MyServ', ['$resource', function ($resource) {
        this.consultaAjax = function () {
            return $resource('script.php/pokem/:id', null, {
                'update': {method: 'PUT'}
            });
        };
    }]);