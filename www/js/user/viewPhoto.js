var BTNShotID = "BTNSelectPhoto";
var BTNSelectID = "BTNLibraryPhoto";
var IMGZoneID = "imgZone";
var captureShot = null;
var selectedPhoto = {
        listeners: [],
        addListener: function(fn){this.listeners.push(fn);},
        img: null,
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
}, false);

function onBTNClick(){
    document.getElementById(BTNFaceShareID).disabled = true;
    captureShot(gotPhoto, errPhoto, 
                {  quality: 90,
                   destinationType: Camera.DestinationType.FILE_URI,
                   saveToPhotoAlbum: true } );
}
function onBTNSelectClick(){
    document.getElementById(BTNFaceShareID).disabled = true;
    //seleziona la foto dalla libreria
    captureShot(gotPhoto, errPhoto,
               {  quality: 90,
                  destinationType: Camera.DestinationType.FILE_URI,
                  sourceType: Camera.PictureSourceType.PHOTOLIBRARY} );
}

function gotPhoto(mediaFile){
    selectedPhoto.set(mediaFile);
}
function errPhoto(err){
    alert("Errore nella cattura della foto.");
}