<?php
session_start();

$respuesta = '{';

if (isset($_GET['inicio'])) {     //se ha indicado iniciar un nuevo juego
    $numeroAleatorio = rand(0, 10); //seleccionamos un numero aleatorio entre 0 y 10
    $_SESSION['numeroOculto'] = $numeroAleatorio;

    $respuesta .= '"inicio":'.$_SESSION['numeroOculto'];
} else {
    $numeroUsuario = $_GET['numero'];
    $numeroOculto = $_SESSION['numeroOculto'];

    if ($numeroUsuario > $numeroOculto) {
        
        $respuesta .= '"encontrado":"no",';
        $respuesta .= '"mensaje": "Has introducido un valor demasiado alto"';
    } else {
        if ($numeroUsuario < $numeroOculto) {
            $respuesta .= '"encontrado":"si",';
            $respuesta .= '"mensaje": "Has introducido un valor demasiado bajo"';
        
        } else {
            $respuesta .= '"encontrado":"si",';
            $respuesta .= '"mensaje": "Exacto!"';
        
        }
    }
}
//finalizamos la estructura XML
$respuesta .= '}';

//insertamos la respuesta XML
echo($respuesta);

?>