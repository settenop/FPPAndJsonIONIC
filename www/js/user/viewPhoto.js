var BTNShotID = "BTNSelectPhoto";
var BTNSelectID = "BTNLibraryPhoto";
var IMGZoneID = "imgZone";
var captureShot = null;
var selectedPhoto = {
        listeners: [],
        shouldSave: false,
        addListener: function(fn){this.listeners.push(fn);},
        img: {},
        set: 
        function(img){
            // aggiorno l'immagine
            this.img = img;
            this.listeners.forEach(
                // per ogni listener
                // lo invoco sull'immagine al cambiamento della stessa
                function(fn){
                    fn(img);
                });
        }
    };

document.addEventListener("deviceready", function(){
    // seleziono il plugin da utilizzare ed inizializzo il bottone per la foto
    captureShot = navigator.camera.getPicture;
    document.getElementById(BTNShotID).onclick = onBTNClick;
    document.getElementById(BTNSelectID).onclick = onBTNSelectClick;
    // aggiungo un listener per aggiornare l'immagine visualizzata  
    selectedPhoto.addListener( function(img){
        document.getElementById("imgZone").src = img;
    } );
    // salvo l'immagine se viene inviata!
    // in ajaxStart per essere parallelo all'upload della foto
    $(document).ajaxStart( function() {
        if(selectedPhoto.shouldSave)
            setTimeout(window.imageSaver.saveBase64Image,0,{data: selectedPhoto.img});
    } );
}, false);

function onBTNClick(){
    document.getElementById(BTNFaceShareID).disabled = true;
    selectedPhoto.shouldSave = true;
    captureShot(gotPhoto, errPhoto, 
                {  quality: 70,
                   destinationType: Camera.DestinationType.DATA_URL} );
}
function onBTNSelectClick(){
    document.getElementById(BTNFaceShareID).disabled = true;
    selectedPhoto.shouldSave = false;
    //seleziona la foto dalla libreria
    captureShot(gotPhoto, errPhoto,
               {  quality: 70,
                  destinationType: Camera.DestinationType.DATA_URL,
                  sourceType: Camera.PictureSourceType.PHOTOLIBRARY} );
}
function gotPhoto(mediaFile){
    selectedPhoto.set("data:image/jpeg;base64," + mediaFile);
}
function errPhoto(err){
    alert("Errore nella cattura della foto.");
}