var PInfoID = "FPPStats";
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
  };
}

document.addEventListener("deviceready", function () {
    var el = document.getElementById(PInfoID);
    containerCreate('Gender', el);
    containerCreate('Race', el);
    containerCreate('Age', el);
    containerCreate('Glass', el);
    containerCreate('Smile', el);
} );

function containerCreate (id, parent) {
    var container = document.createElement("DIV");
    container.setAttribute("id", id);
    parent.appendChild(container);
}

function updateInfo (FPPResponse) {
    console.log(FPPResponse);
    if (FPPResponse.face.length) {
        document.getElementById(BTNFaceShareID).disabled = false;
        var faccia = FPPResponse.face[0].attribute;
        FPPData = faccia;
        // creo le progressbar
        if(bars.length)
            bars.forEach(
                function (el) {
                    el.destroy();
                }
            );
        bars[0] = new ProgressBar.Line('#Gender', defBarObj(faccia.gender.value));
        bars[0].animate(faccia.gender.confidence / 100);
        bars[1] = new ProgressBar.Line('#Race', defBarObj(faccia.race.value));
        bars[1].animate(faccia.race.confidence / 100);
        bars[2] = new ProgressBar.Line('#Age', defBarObj('Age ( &plusmn;' + faccia.age.range + ' )'));
        bars[2].animate(faccia.age.value / 100);
        bars[3] = new ProgressBar.Line('#Smile', defBarObj('Smiling'));
        bars[3].animate(faccia.smiling.value / 100);
        bars[4] = new ProgressBar.Line('#Glass', defBarObj('Glass type: ' + faccia.glass.value));
        bars[4].animate(faccia.glass.confidence / 100);
    } else {
        FPPData = null;
        alert("Non è stato rilevato alcun volto =(\nScatta una foto migliore!");
    }
}
