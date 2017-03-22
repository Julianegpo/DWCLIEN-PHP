
<?php
    session_start();
    $_SESSION["posicion"] = 0;
    $imgRetos = array("../img/busca_el_repetido.jpg", "../img/encuentra_el_diferente.jpg");
    $respRetos = array("si", "no");
    
    $respuesta = '{';
  
    if(isset($_GET["ruta"])){
        $posicion = rand(0, sizeof($imgRetos)-1);
        $_SESSION["posicion"] = $posicion;
        $respuesta .= '"ruta":"'.$imgRetos[$posicion].'"';
    }else if(isset($_GET["pregunta"])){
        $respuesta .= '"pregunta": "¿Hay alguna imagen pareja a otra?"';
    }else if(isset($_GET["pista"])){
         $respuesta .= '"pista" : "Fíjate bien si son iguales..."';
    }else if(isset($_GET["respuesta"])){
        if($respRetos[$_SESSION["posicion"]] == $_GET["respuesta"]){
            $respuesta .= '"respuesta" : "acertado"';
        }
    }
    
    $respuesta .= '}';
    
    echo $respuesta;
?>