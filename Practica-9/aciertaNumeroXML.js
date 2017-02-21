$(document).ready(init);

function init() {
    $("#inicioXML").click(xmlInit);
}

function xmlInit() {
    var xml = new XMLHttpRequest();

    xml.open("POST", "aciertaNumeroXML.php", true);

    xml.setRequestHeader("Content-type",
            "application/x-www-form-urlencoded");

    xml.onreadystatechange = function () {
        if (xml.readyState == 4) {
            xmlResponse(xml);
        }
    }
    xml.send("inicio=yes");
}

function xmlResponse(xml) {
    if (xml.status == 200) {
        var resp = xml.responseXML;

        var listResp = resp.getElementByTagName("inicio");
        for (var k = 0; k < listResp.length; k++) {
            var result = listResp[k].childNodes[0].nodeValue;
            alert(result);
        }
    }
}