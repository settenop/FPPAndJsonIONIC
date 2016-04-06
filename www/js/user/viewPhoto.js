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
            this.img = img;
            this.listeners.forEach(
                function(fn){
                    fn(img);
                });
        }
    };

document.addEventListener("deviceready", function(){
    captureShot = navigator.device.capture.captureImage;
    document.getElementById("BTNSelectPhoto").onclick = onBTNClick;
    selectedPhoto.addListener(function(img){
       console.log(img); 
    });
    
    selectedPhoto.test();
}, false);

function onBTNClick(){
    captureShot(gotPhoto, errPhoto);
}

function gotPhoto(mediaFiles){
    selectedPhoto.set(mediaFiles[0]);
}
function errPhoto(err){
    alert("Errore nella cattura della foto.");
}