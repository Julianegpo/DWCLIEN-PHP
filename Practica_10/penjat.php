<?php
session_start();

if (isset($_GET["inicio"])) {
    $a = array("piedra", "ordenador", "libreta", "patata");
    shuffle($a);
    ?>{"palabra":"<?php echo $a[0] ?>"}
    <?php
    $_SESSION["palabra"] = $a[0];
} else {
    $letra = $_GET["letra"];
    $palabra = $_SESSION["palabra"];
    $posiciones = "["; 
    
    $pos = strpos($palabra, $letra, 0); //busquem si la lletra apareix una primera vegada
    while($pos!==false){
        $posiciones.=$pos;
        $pos = strpos($palabra, $letra, ++$pos); //buscem si la lletra apareix de nou dins la paraula
        if($pos){$posiciones.=",";} //si apareix de nou la lletra, afegim una , per concatenar el nou numero
    }

    $posiciones.="]"; //[2,4]

    echo '{"posicion":' . $posiciones . ',"letra":"'.$letra.'"}';  //{posicion: [1, 7,]}
}
?>