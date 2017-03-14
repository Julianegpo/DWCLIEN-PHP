<?php

session_start();
$pokemons = array("Bulbasaur" => array("nombre" => "Bulbasur", "tipo" => ["planta", "veneno"], "nick" => "planti", "evolucion" => "Ivysaur")
    , "Ivysaur " => array("nombre" => "Ivysaur", "tipo" => ["planta", "veneno"], "nick" => "planti2", "evolucion" => "Venusaur"));
$_SESSION = $pokemons;
//según la diapo anterior, recibiremos una URI del estilo: resp.php/pokem/Bulbasur
//obtenemos si se ha realizado un GET, POST, PUT o DELETE
switch ($_SERVER['REQUEST_METHOD']) {
    case "GET":
        //creamos un array de 2 elementos. 1º con la URI hasta pokem/ , 2º con el resto (el id Bulbasur)
        //$id = explode("pokem/", $_SERVER['REQUEST_URI'])[1]; // extraemos el id (Bulbasur)
        //echo json_encode($pokemons[$id]); //retornamos la info del poke correspondiente en formato jSON
        echo json_encode($pokemons);
        break;
    case "PUT": //actualizar un pokemon
        //obtenemos la id del pokemon que queremos actualizar
        $id = explode("pokem/", $_SERVER['REQUEST_URI'])[1];
        // Para capturar los datos entrada JSON que viene en el request HTTP:
        $jsonPoke = json_decode(file_get_contents("php://input"), false);
        $pokemons[$jsonPoke->nombre] = $jsonPoke;
        echo json_encode($pokemons);
        break;
    case "POST":
        //crear pokemon
        
        // Para capturar los datos entrada JSON que viene en el request HTTP:
        $jsonPoke = json_decode(file_get_contents("php://input"), false);
        $pokemons[$jsonPoke->nombre] = $jsonPoke;
        //echo "Pokemon creado:".json_encode($pokemons[$jsonPoke->nombre])."<br>";
        echo "Todos los pokemon:".json_encode($pokemons)."<br>";
        break;
    case "DELETE":
        //borrar pokemon
        
        ////para obtener el indice donde se encuentra el pokemon 
        //a eliminar en el array de pokemons
        $id = explode("pokem/", $_SERVER['REQUEST_URI'])[1];
        $jsonPoke = json_decode(file_get_contents("php://input"), false);
        array_splice($pokemons, $id, 1);
        echo "Todos los pokemon:".json_encode($pokemons)."<br>";
        break;
}
?>