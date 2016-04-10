var BTNSendID = "BTNSendPhoto";
var IMGZoneID = "imgZone";
var PInfoID = "FPPStats";
var img = new FormData();

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady () {
    document.getElementById(BTNSendID).onclick = sendFPP;
    selectedPhoto.addListener(function(){
       // Quando l'immagine selezionata viene cambiata
       // aggiorna il FormData
       updateImgFD();
    });
}

function sendFPP () {
    send();
}

function updateInfo (FPPResponse) {
    console.log(FPPResponse);
    console.log(FPPResponse.img_height);
}

function errorInfo () {
    
}

function send () {{
    $.ajax({
        url: 'https://apius.faceplusplus.com/v2/detection/detect?api_key=cdeda83f5f336aaa9b7839c091a01d1c&api_secret=IqmPFMPjplP-kl9T7jHobtK5jq6JDz6_',
        type: 'POST',
        data: img,
        contentType: false,
        processData: false,
        success: function(response) {
            updateInfo(response);
        }
    });
}}


function updateImgFD () {
    img.append( 'img', new Blob([ new
                Uint8Array(convertDataURIToBinary(document.getElementById(IMGZoneID).src)) ], 
                {type: 'image/jpeg'} ));
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