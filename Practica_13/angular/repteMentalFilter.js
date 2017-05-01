app.filter('orderObjectBy', function() {
  return function(items, field, reverse) {
    var filtered = [];
    angular.forEach(items, function(item) {
        // El filter recibe dos parámetros que son $$state:Object
        // y 'true', lo que nos rellena dos espacios en la tabla vacíos
        // Para evitarlos miramos si el nick existe ya que es necesario.
        if(item.nick != null)
            filtered.push(item);
        
    });
    filtered.sort(function (a, b) {
      return (a[field] > b[field] ? 1 : -1);
    });
    if(reverse) filtered.reverse();
    return filtered;
  };
});
