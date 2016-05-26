var BTNSendID = "BTNSendPhoto";
var img = new FormData();
var FPPData = {};


document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady () {
    document.getElementById(BTNSendID).disabled = true;
    document.getElementById(BTNSendID).onclick = send;
    selectedPhoto.addListener(function(imgData){
       // Quando l'immagine selezionata viene cambiata
       // aggiorna il FormData
       updateImgFD(imgData);
       document.getElementById(BTNSendID).disabled = false;
    });
}

function send () {{
    $.ajax({
        url: 'https://apius.faceplusplus.com/v2/detection/detect?api_key=cdeda83f5f336aaa9b7839c091a01d1c&api_secret=IqmPFMPjplP-kl9T7jHobtK5jq6JDz6_&attribute=glass,gender,age,race,smiling',
        type: 'POST',
        data: img,
        contentType: false,
        processData: false,
        success: function(response) {
            updateInfo(response);
        },
        error: function(jqHXR, e) {
            errorInfo(jqHXR,e);
        }
    });
}}
function errorInfo (jqHXR,e) {
    if (jqHXR.status === 0) {
        alert("Impossibile connettersi.\nControlla rete, firewall o impostazioni.\n");
    } else if (e == "Timout") {
        alert("La richiesta è scaduta =(.\n");
    } else {
        alert("Un errore sconosciuto si è verificato.\nSpesso risolvibile abbassando la qualità della foto.\n");
    }
}


function updateImgFD (imgData) {
    img = new FormData();
    window.resolveLocalFileSystemURL(imgData,
    function (fileEntry) {
        fileEntry.file(
            function (file) {
                var reader = new FileReader();
                reader.onload = function () {
                    var temp = this.result;
                    img.append( 'img', 
                                new Blob( [ new Uint8Array(convertDataURIToBinary(temp)) ], 
                                          { type: 'image/jpeg' } 
                                )
                    );
                };
                reader.readAsDataURL(file);
            },
            function () {
                alert("Non è possibile trovare il file.");
            }
        );
    } );
}


var BASE64_MARKER = ';base64,';
function convertDataURIToBinary(dataURI) {
  var base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
  var base64 = dataURI.substring(base64Index);
  var raw = window.atob(base64);
  var rawLength = raw.length;
  var array = new Uint8Array(new ArrayBuffer(rawLength));

  for(i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array;
}
