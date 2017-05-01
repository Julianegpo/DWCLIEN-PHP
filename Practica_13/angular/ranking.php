<?php
    session_start();
        //$_SESSION["usuarios"] = array("cristina" => array("nick" => "cristina", "edad" => "3", "puntuacion" => "-1", "intentos" => "7"));

    if(!isset($_SESSION["usuarios"])) 
        $_SESSION["usuarios"] = array("cristina" => array("nick" => "cristina", "edad" => "3", "puntuacion" => "-1", "intentos" => "7"));
    
    else $_SESSION["usuarios"];
    
    switch ($_SERVER['REQUEST_METHOD']) {
        case "GET":
            // todos los usuarios
            if(empty(explode("usuaris/", $_SERVER['REQUEST_URI'])[1])){
                echo json_encode($_SESSION["usuarios"]);               
            }else{
                // en algún caso determinado
                $datos = split("/", explode("usuaris/", $_SERVER['REQUEST_URI'])[1]);
                
                if($datos[0] == "login"){
                    // datos para el login, si no está se añade
                    $nick = $datos[1]; $edad = $datos[2]; 
                    if(!isset($_SESSION["usuarios"][$nick])){
                        $nuevoUsuario = array("nick" => $nick, "edad" => $edad, "puntuacion" => 0, "intentos" => 0);
                        $_SESSION["usuarios"][$nick] = $nuevoUsuario;
                    }else{
                        
                        $_SESSION["usuarios"][$nick]["edad"] = $edad;
                    }
                    echo json_encode($_SESSION["usuarios"]);
                    
                }else if($datos[0] == "byuser"){
                    // los datos para el ranking y la info del usuario
                    $nick = $datos[1];
                    echo json_encode($_SESSION["usuarios"][$nick]);
                }
            }
            break;
            
        case "PUT":
            
            $datos = json_decode(file_get_contents("php://input"), false);
            $datos->intentos = $datos->intentos + 1;
            
            if(split("/", explode("usuaris/", $_SERVER['REQUEST_URI'])[1])[0] == "acertado"){
                $datos->puntuacion = $datos->puntuacion + 1;
            }
            
            $_SESSION["usuarios"][$datos->nick] = $datos;
            echo json_encode($_SESSION["usuarios"]);
            
            break;
            
        case "DELETE":
            $nick = explode("usuaris/", $_SERVER['REQUEST_URI'])[1];
            unset($_SESSION["usuarios"][$nick]);
            break;
    }
// Y MODIFICAR LA EDAD    
?>


