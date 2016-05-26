var target;
var spinner;
var opts = {
      lines: 11 // The number of lines to draw
    , length: 0 // The length of each line
    , width: 14 // The line thickness
    , radius: 42 // The radius of the inner circle
    , scale: 1 // Scales overall size of the spinner
    , corners: 0.6 // Corner roundness (0..1)
    , color: '#0066ff' // #rgb or #rrggbb or array of colors
    , opacity: 0.25 // Opacity of the lines
    , rotate: 0 // The rotation offset
    , direction: 1 // 1: clockwise, -1: counterclockwise
    , speed: 1 // Rounds per second
    , trail: 60 // Afterglow percentage
    , fps: 30 // Frames per second when using setTimeout() as a fallback for CSS
    , zIndex: 2e9 // The z-index (defaults to 2000000000)
    , className: 'spinner' // The CSS class to assign to the spinner
    , top: '50%' // Top position relative to parent
    , left: '50%' // Left position relative to parent
    , shadow: false // Whether to render a shadow
    , hwaccel: false // Whether to use hardware acceleration
    , position: 'absolute' // Element positioning
};


document.addEventListener("deviceready", function () {
    target = document.getElementsByTagName('Body')[0];
    spinner = new Spinner(opts);
    $(document).ajaxStart( function() {
        spinner.spin(target);
        document.getElementById(BTNSelectID).disabled = true;
        document.getElementById(BTNShotID).disabled = true;
        document.getElementById(BTNSendID).disabled = true;
    } );
    $(document).ajaxStop( function() {
        spinner.stop();
        document.getElementById(BTNSelectID).disabled = false;
        document.getElementById(BTNShotID).disabled = false;
        document.getElementById(BTNSendID).disabled = false;
    } );
} );