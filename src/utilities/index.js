export function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function ansiConvert(string){
  var el = document.createElement('div');
  let t = string.replace(/&[#0-9a-z]+;/g, (enc) => {
    el.innerHTML = enc;
    return el.innerText
  });
  return t;
}

export function talk(statement, callback, speed = 1){
  if ( typeof window.responsiveVoice.speak === 'function' ) {

    window.responsiveVoice.speak(statement,"UK English Male", {
      onend: function(){
        if ( typeof callback === 'function') {
          callback();
        }
      },
      rate: speed
    });

  }
}