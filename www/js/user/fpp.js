var BTNSendID = "BTNSendPhoto";

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady () {
    document.getElementById(BTNSendID).onclick = sendFPP;
}

function sendFPP () {
    alert("Sembra che qualcuno debba ancora implementare questa funzione! :P");
    //invia la foto a FPP
      //callback ok => aggiorna i dati visualizzati
      //callback no => visualizza errore
}

function updateInfo () {
    
}

function errorInfo () {
    
}