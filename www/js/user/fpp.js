var BTNSendID = "BTNSendPhoto";
var IMGZoneID = "imgZone";
var PInfoID = "FPPStats";
var img = new FormData();
var bars = [];
function defBarObj (text) { 
  return {
      strokeWidth: 12,
      from: { color: '#ff0000'},
      to: {color: '#00ff00'},
      text: {value: text + ': 0', style: {color: '#fff',
                                 position: 'absolute',
                                 left: '10%',
                                 top: '30%',
                                 padding: '0 5px 0 5px',
                                 margin: '0',
                                 background: 'rgba(0,0,0,0.6)'
                                } 
      },
      step: function (state, bar) {
        bar.path.setAttribute('stroke', state.color);
        bar.setText( text + ': ' + (bar.value() * 100).toFixed(0) );
      }
  }
}



document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady () {
    document.getElementById(BTNSendID).disabled = true;
    document.getElementById(BTNSendID).onclick = sendFPP;
    selectedPhoto.addListener(function(){
       // Quando l'immagine selezionata viene cambiata
       // aggiorna il FormData
       updateImgFD();
       document.getElementById(BTNSendID).disabled = false;
    });
    var el = document.getElementById(PInfoID);
    containerCreate('Age', el);
    containerCreate('Gender', el);
    containerCreate('Race', el);
    containerCreate('Smile', el);
}

function sendFPP () {
    send();
}

function containerCreate (id, parent) {
    var container = document.createElement("DIV");
    container.setAttribute("id", id);
    parent.appendChild(container);
}



function updateInfo (FPPResponse) {
    console.log(FPPResponse);
    if (FPPResponse.face.length) {
        var faccia = FPPResponse.face[0].attribute;
        // creo le progressbar
        if(bars.length)
            bars.forEach(
                function (el) {
                    el.destroy();
                }
            );
        bars[0] = new ProgressBar.Line('#Age', defBarObj('Age ( &plusmn;' + faccia.age.range + ' )'));
        bars[0].animate(faccia.age.value / 100);
        bars[1] = new ProgressBar.Line('#Gender', defBarObj(faccia.gender.value));
        bars[1].animate(faccia.gender.confidence / 100);
        bars[2] = new ProgressBar.Line('#Race', defBarObj(faccia.race.value));
        bars[2].animate(faccia.race.confidence / 100);
        bars[3] = new ProgressBar.Line('#Smile', defBarObj('Smiling'));
        bars[3].animate(faccia.smiling.value / 100);
    } else {
        alert("Non è stato rilevato alcun volto =(\nScatta una foto migliore!");
    }
}



function errorInfo (jqHXR,e) {
    if (jqHXR.status === 0) {
        alert("Impossibile connettersi.\nControlla rete, firewall o impostazioni.\n");
    } else if (e == "Timout") {
        alert("La richiesta è scaduta =(.\n");
    } else {
        alert("Un errore sconosciuto si è verificato.\n");
        console.log(jqHXR.responseText);
    }
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
        },
        error: function(jqHXR, e) {
            errorInfo(jqHXR,e);
        }
    });
}}


function updateImgFD () {
    delete img;
    img = new FormData();
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