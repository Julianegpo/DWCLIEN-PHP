$(document).ready(function(){
   $("#inicioXML").click(numeroAleatorio);
   $("#checkAjaxXML").click(comprobarNumUsuario);
   $("#inicioJSON").click(numeroAleatorioJSON);
   $("#checkAjaxJSON").click(comprobarNumUsuarioJSON);
    
});
var marcador = 10;

function numeroAleatorio(){
    var xmlHttp = new XMLHttpRequest();
    
    // url destino + parámetros
    xmlHttp.open("GET", "aciertaNumeroXML.php?inicio=si", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    // qué hacer con la respuesta, quién recibe
    xmlHttp.onreadystatechange = function(){
        // state 4 = completado
        if(xmlHttp.readyState === 4){
            recibirNumero(xmlHttp);
        }
    }
    // enviar la petición + los datos que queramos
    xmlHttp.send(null);
}

function recibirNumero(xmlHttp){
    if(xmlHttp.status === 200){
        var respuesta = xmlHttp.responseXML;

        var numAleatorio = respuesta.getElementsByTagName("inicio")[0].textContent;
        console.log(numAleatorio);
        document.getElementById("mensaje").innerHTML = "Se ha generado un nuevo número!!";
    }
}

function comprobarNumUsuario(){
    var numUsuario = document.getElementById("numero").value;
    
    // PETICIÓN AJAX
    
    var xmlHttp = new XMLHttpRequest();
    var ruta = "aciertaNumeroXML.php?numero="+numUsuario;
    xmlHttp.open("GET", ruta, true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState === 4) verificarNumero(xmlHttp);
    }
    xmlHttp.send(null);
}

function verificarNumero(xmlHttp){
    if(xmlHttp.status === 200){
        var respuesta = xmlHttp.responseXML;
        var encontrado = respuesta.getElementsByTagName("encontrado")[0].textContent;
        var mensaje = respuesta.getElementsByTagName("mensaje")[0].textContent;
        document.getElementById("mensaje").innerHTML = mensaje;
        if(encontrado === "si"){
            document.getElementById("encontrado").innerHTML = encontrado;
        }else{
            marcador = marcador-1;
            document.getElementById("marcador").innerHTML = marcador;
            consultarMarcador();
        }
    }
}

function numeroAleatorioJSON(){
    var xmlHttp = new XMLHttpRequest();
    
    // url destino + parámetros
    xmlHttp.open("GET", "aciertaNumeroJSON.php?inicio=si", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    // qué hacer con la respuesta, quién recibe
    xmlHttp.onreadystatechange = function(){
        // state 4 = completado
        if(xmlHttp.readyState === 4){
            recibirNumeroJSON(xmlHttp);
        }
    }
    // enviar la petición + los datos que queramos
    xmlHttp.send(null);
}

function recibirNumeroJSON(xmlHttp){
    if(xmlHttp.status === 200){
        var respuesta = xmlHttp.responseText;
        
        var respuestaJSON = JSON.parse(respuesta);
        
        var numero = respuestaJSON.inicio;
        console.log(numero);
        document.getElementById("mensaje").innerHTML = "Se ha generado un nuevo número!!";
    }
}

function comprobarNumUsuarioJSON(){
    var numUsuario = document.getElementById("numero").value;
    
    // PETICIÓN AJAX
    var xmlHttp = new XMLHttpRequest();
    var ruta = "aciertaNumeroJSON.php?numero="+numUsuario;
    xmlHttp.open("GET", ruta, true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlHttp.onreadystatechange = function(){
        if(xmlHttp.readyState === 4) verificarNumeroJSON(xmlHttp);
    }
    xmlHttp.send(null);
}

function verificarNumeroJSON(xmlHttp){
    if(xmlHttp.status === 200){
        var respuesta = xmlHttp.responseText;
        var respuestaJSON = JSON.parse(respuesta);
        
        var encontrado = respuestaJSON.encontrado;
        var mensaje = respuestaJSON.mensaje;
      
        document.getElementById("mensaje").innerHTML = mensaje;
        if(encontrado === "si"){
            document.getElementById("encontrado").innerHTML = encontrado;
        }else{
            marcador = marcador -1;
            document.getElementById("marcador").innerHTML = marcador;
            consultarMarcador();
        }
    }
}
function consultarMarcador(){
    if(marcador < 0){
        document.getElementById("resultado").innerHTML = "Has perdido";
        $("#inicioXML").attr("disabled", "disabled").off('click');
        $("#checkAjaxXML").attr("disabled", "disabled").off('click');
        $("#inicioJSON").attr("disabled", "disabled").off('click');
        $("#checkAjaxJSON").attr("disabled", "disabled").off('click');
        
        document.getElementById("marcador").innerHTML = "0";
    }
}
