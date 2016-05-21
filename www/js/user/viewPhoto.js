var BTNShotID = "BTNSelectPhoto";
var IMGZoneID = "imgZone";
var captureShot = null;
var selectedPhoto = {
        listeners: [],
        test: function(){console.log("Salve mondo!");},
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
    document.getElementById("BTNSelectPhoto").onclick = onBTNClick;
    // aggiungo un listener per aggiornare l'immagine visualizzata  
    selectedPhoto.addListener( function(img){
        document.getElementById("imgZone").src = "data:image/jpeg;base64," + img;
    } );
    //aggiungo un listener per salvare l'immagine nella galleria
    selectedPhoto.addListener( function(img){
        cordova.base64ToGallery(img);
    } );
    // saluto il mondo per assicurarmi che funzioni tutto
    selectedPhoto.test();
}, false);

function onBTNClick(){
    captureShot(gotPhoto, errPhoto, 
                {  quality: document.getElementById("qualitySlider").firstElementChild.value
                 , destinationType: Camera.DestinationType.DATA_URL} );
}

function gotPhoto(mediaFile){
    selectedPhoto.set(mediaFile);
}
function errPhoto(err){
    alert("Errore nella cattura della foto.");
}