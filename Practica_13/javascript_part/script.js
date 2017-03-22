window.onload = function(){
    // 1. Quan l’usuari cliqui sobre un botó “NEW”, 
        // es demanarà per AJAX la ruta d’una imatge.
    document.getElementById("start")
            .addEventListener("click", ajaxRutaImagen, false);
    document.getElementById("respuestas")
            .addEventListener("click", checkRespuesta, false);
    
   
    
    document.getElementById("pista").style.visibility = "hidden";
    document.getElementById("pregunta").style.visibility = "hidden";
    document.getElementById("respuestas").style.visibility = "hidden";
    document.getElementById("pistaLbl").style.visibility = "hidden";
    document.getElementById("preguntaLbl").style.visibility = "hidden";
    document.getElementById("respuestasLbl").style.visibility = "hidden";
}
function checkRespuesta(){
    var radios = document.getElementById('respuestas');
    
    for (var i = 0, length = radios.length; i < length; i++) {
        radios[i].disabled = true;
        if (radios[i].checked) {
            var value = radios[i].value;
            
            var xmlHttp = new XMLHttpRequest();
    
            // url destino + parámetros
            xmlHttp.open("GET", "response.php?respuesta="+value+"", true);
            xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

            // qué hacer con la respuesta, quién recibe
            xmlHttp.onreadystatechange = function(){
            if(xmlHttp.readyState === 4){
                    var respuestaJSON = JSON.parse(xmlHttp.responseText);
                    if(respuestaJSON.respuesta == "acertado"){
                        document.getElementById(value).style.color = "green";
                    }else{
                        document.getElementById(value).style.color = "red";
                    }
                }
            }
            // enviar la petición + los datos que queramos
            xmlHttp.send(null);
        }
    }
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
            var respuestaJSON = JSON.parse(xmlHttp.responseText);
        
            var ruta = respuestaJSON.ruta;
            console.log(ruta);
            var img = "<img id='img' src='"+ruta+"'/>";
            var divImagen = document.getElementById("imagen");
            divImagen.addEventListener("mouseover", ajaxPista, false);
            divImagen.addEventListener("mouseout", ajaxPregunta, false);
            divImagen.innerHTML = img;
        }
    }
    // enviar la petición + los datos que queramos
    xmlHttp.send(null);
}

//pedimos y mostramos la pista
function ajaxPista(){
    // le quitamos el evento de pedir la pista
    document.getElementById("imagen").
            removeEventListener("mouseover", ajaxPista, false);
    
    console.log("Pedimos por ajax la pista");
   
    var xmlHttp = new XMLHttpRequest();
    
    // url destino + parámetros
    xmlHttp.open("GET", "response.php?pista=si", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    // qué hacer con la respuesta, quién recibe
    xmlHttp.onreadystatechange = function(){
        // state 4 = completado
        if(xmlHttp.readyState === 4){
            var respuestaJSON = JSON.parse(xmlHttp.responseText);
            document.getElementById("pistaLbl").style.visibility = "visible";
            document.getElementById("pista").style.visibility = "visible";
            document.getElementById("pista").innerHTML = respuestaJSON.pista;
        }
    }
    // enviar la petición + los datos que queramos
    xmlHttp.send(null);
}

//pedimos y mostramos la pregunta y respuestas
function ajaxPregunta(){
    // le quitamos el evento de pedir la pista
    document.getElementById("imagen").
            removeEventListener("mouseOut", ajaxPregunta, false);
    
    console.log("Pedimos por ajax la pregunta y respuestas");
   
    var xmlHttp = new XMLHttpRequest();
    
    // url destino + parámetros
    xmlHttp.open("GET", "response.php?pregunta=si", true);
    xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    // qué hacer con la respuesta, quién recibe
    xmlHttp.onreadystatechange = function(){
        // state 4 = completado
        if(xmlHttp.readyState === 4){
            var respuestaJSON = JSON.parse(xmlHttp.responseText);
            document.getElementById("imagen").innerHTML = "";
            document.getElementById("preguntaLbl").style.visibility = "visible";
            document.getElementById("pregunta").style.visibility = "visible";
            document.getElementById("respuestas").style.visibility = "visible";
            document.getElementById("respuestasLbl").style.visibility = "visible";

            document.getElementById("pregunta").innerHTML = respuestaJSON.pregunta;
        }
    }
    // enviar la petición + los datos que queramos
    xmlHttp.send(null);
}