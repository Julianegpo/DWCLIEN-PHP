<?php
    session_start();
    $_SESSION["posicion"] = 0;
    $_SESSION["aciertos"] = 0;
    $_SESSION["fallos"] = 0;

    $imgRetos = array("retoMental.png", "retoMental2.jpg");
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
            $respuesta .= '"respuesta" : "acertado",';
            $_SESSION["aciertos"]++;
            $respuesta .= '"aciertos" : "'.$_SESSION["aciertos"].'"';
        }else{
            $_SESSION["fallos"]++;
            $respuesta .= '"fallos" : "'.$_SESSION["fallos"].'"';
        }
    }
    
    $respuesta .= '}';
    
    echo $respuesta;
?>

