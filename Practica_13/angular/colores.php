<?php
$colores = ["red", "blue", "yellow"];

$random = rand(0, count($colores)-1);

$color = $colores[$random];

$response='{"color":"'.$color.'"}';

echo $response;
?>