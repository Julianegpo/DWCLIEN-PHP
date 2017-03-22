window.onload = function(){
    // 1. Quan l’usuari cliqui sobre un botó “NEW”, 
        // es demanarà per AJAX la ruta d’una imatge.
    var start = document
            .getElementById("start")
            .addEventListener("click", ajaxRutaImagen, false);
}

function ajaxRutaImagen(){
    console.log("Pedimos la ruta de la imagen por ajax");
    
    var xmlHttp = new XMLHttpRequest();
    
    // url destino + parámetros
    xmlHttp.open("GET", "response.php?ruta=si", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    // qué hacer con la respuesta, quién recibe
    xmlHttp.onreadystatechange = function(){
        // state 4 = completado
        if(xmlHttp.readyState === 4){
            rutaImagen(xmlHttp);
        }
    }
    // enviar la petición + los datos que queramos
    xmlHttp.send(null);
}

function rutaImagen(xmlHttp){
    if(xmlHttp.status === 200){
        var respuestaJSON = JSON.parse(xmlHttp.responseText);
        
        var ruta = respuestaJSON.ruta;
        console.log(ruta);
        var img = "<img id='img' src='"+ruta+"'/>";
        var divImagen = document.getElementById("imagen");
        divImagen.addEventListener("mouseover", ajaxPreguntaPista, false);
        divImagen.innerHTML = img;
    }
}

function ajaxPreguntaPista(){
    // le quitamos el evento de pedir la pista
    document.getElementById("imagen").
            removeEventListener("mouseover", ajaxPreguntaPista, false);
    
    console.log("Pedimos por ajax la pregunta y la pista de ésta");
   
    var xmlHttp = new XMLHttpRequest();
    
    // url destino + parámetros
    xmlHttp.open("GET", "response.php?pregunta=si", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    // qué hacer con la respuesta, quién recibe
    xmlHttp.onreadystatechange = function(){
        // state 4 = completado
        if(xmlHttp.readyState === 4){
            preguntaPista(xmlHttp);
        }
    }
    // enviar la petición + los datos que queramos
    xmlHttp.send(null);
}

function preguntaPista(xmlHttp){
    console.log("mouseOver");
    if(xmlHttp.status === 200){
        var respuestaJSON = JSON.parse(xmlHttp.responseText);
        
        var pregunta = "<div class='form-group jumbotron'>"+respuestaJSON.pregunta+"</div>";
        var pista = "<div class='alert alert-info'>\n\
                <span class='glyphicon glyphicon-question-sign'></span>"
                +respuestaJSON.pista+
                "</div>";
        document.getElementById("img")
                .addEventListener("mouseout", mostrarPregunta(pregunta, pista), false);
    }
}

function mostrarPregunta(pregunta, pista){
    console.log("fuera");
    document.getElementById("pregunta").innerHTML = pregunta;
    document.getElementById("pista").innerHTML = pista;
}