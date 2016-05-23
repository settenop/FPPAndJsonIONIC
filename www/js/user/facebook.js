var BTNFaceShareID = "shareButton";
var IMGZoneID = "imgZone";
var qualityScale = 0.7;

document.addEventListener("deviceready", function (){
   document.getElementById(BTNFaceShareID).onclick = shareOnFb;
   document.getElementById(BTNFaceShareID).disabled = true;
}, false);

function shareOnFb(){
    setTimeout( function () {
    if (!FPPData)
        return;
    //prepara l'immagine
    //VVVVVV
    //salva in var temp selectedPhoto.img
    /* funziona ma... lento come me con l'elettronica
    var temp = new Image();
    temp.src = document.getElementById(IMGZoneID).src;
    console.log("temp: " + temp.width + " " + temp.height);
    console.log("temp: " + document.getElementById(IMGZoneID).width + " " + document.getElementById(IMGZoneID).height)
    */
    var temp = document.getElementById(IMGZoneID);
    //utilizza i canvas per scrivere i risultati dell'analisi su temp
    var canWidth = temp.naturalWidth;
    var canHeight = temp.naturalHeight;
    var canvas = document.createElement('canvas');
    canvas.width = canWidth;
    canvas.height = canHeight;
    var ctx = canvas.getContext('2d');
    // disegno l'immagine
    ctx.drawImage(temp, 0, 0);
    // disegno il piano per l'esposizione dei dati
    ctx.fillStyle = "rgba(0,0,0,.75)";
    ctx.fillRect(0, 0, canvas.width / 2, canvas.height);
    // scrivo sul piano i dati
    ctx.fillStyle = "white";
    // FPPData contiene null o i dati della faccia elaborata
    // containerCreate('Gender', el);
    // containerCreate('Race', el);
    // containerCreate('Age', el);
    // containerCreate('Glass', el);
    // containerCreate('Smile', el);
    //(canvas.width / 2) / 32 = 9.85
    var hPadding = Math.round((canvas.width/2) / 22);
    var fontSize = Math.round((canvas.width/2) / 9.85);
    var tempString = "bold " + fontSize + "px Arial";
    var vSpacing = Math.round((canvas.height/2) / 7.5);
    ctx.font = tempString;
    var last = vSpacing;
    ctx.fillText("ArchiFaceReader", hPadding*2, last);
    last = last + vSpacing*2;
    ctx.fillText(FPPData.gender.value, hPadding, last);
    last = last + vSpacing;
    ctx.fillText(FPPData.race.value, hPadding, last);
    last = last + vSpacing;
    ctx.fillText("Age: " + FPPData.age.value + " ± " + FPPData.age.range, hPadding, last);
    last = last + vSpacing;
    ctx.fillText("Glass: " + FPPData.glass.value, hPadding, last);
    last = last + vSpacing;
    ctx.fillText("Smiling: " + FPPData.smiling.value +"%", hPadding, last);
    
    //condividi l'immagine
    //VVV
    //utilizza il socialshare per condividere su facebook il canvas
    window.plugins.socialsharing.share(null, 'ArchiFaceReader', canvas.toDataURL("image/jpeg", 0.7), null);
    } , 0);
}