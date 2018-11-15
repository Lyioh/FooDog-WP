function getXMLHttpRequest() {
	var xhr = null;
	
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest(); 
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
	
	return xhr;
}
 //llamar la funcion
var xhr = getXMLHttpRequest(); // Voyez la fonction getXMLHttpRequest() définie dans la partie précédente

xhr.open("GET", "handlingData.php", true);
xhr.send(null);

//Cette dernière ligne doit être placée après la ligne contenant la méthode open  !
//Si vous utilisez la méthode POST, vous devez absolument changer le type MIME de la requête avec la méthode setRequestHeader , sinon le serveur ignorera la requête :
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

//Callback
function request(callback) {
	var xhr = getXMLHttpRequest();
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			callback(xhr.responseText);
		}
	};
	
	xhr.open("GET", "handlingData.php", true);
	xhr.send(null);
}

function readData(sData) {
	// On peut maintenant traiter les données sans encombrer l'objet XHR.
	if (sData == "OK") {
		alert("C'est bon");
	} else {
		alert("Y'a eu un problème");
	}
}

request(readData);