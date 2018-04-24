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

export function ArrRandom(arr, status){
  let length = arr.length;
  return arr[Math.floor(Math.random() * length)];
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

export function tsvJSON(tsv){

  var lines=tsv.split("\n");

  var result = [];

  var headers=lines[0].split("\t");

  for(var i=1;i<lines.length;i++){

    var obj = {};
    var currentline=lines[i].split("\t");

    for(var j=0;j<headers.length;j++){
      obj[headers[j].trim()] = currentline[j].trim();
    }
    result.push(obj);

  }
  return result; //JavaScript object
  //return JSON.stringify(result); //JSON
}

export function fetchRedux(urlGDrive, callback) {
  // let url = urlGDrive ? urlGDrive : 'http://localhost:3000/data.json';
  let url = urlGDrive ? urlGDrive : 'https://opentdb.com/api.php?amount=10';
  fetch(url)
    .then(response => {
      if ( response.status === 404 ) {
        window.location.reload();
      } else {
        if (urlGDrive) 
          return response.text();

        return response.json();
      }
    })
    .then(json => {
      let dt;
      if (urlGDrive) {
        let t = tsvJSON(json);
        dt = t;
      }else{
        if (json.results.length) {
          dt = json.results;
        }
      }
      if (typeof callback === 'function') {
        callback(dt);
      }
    })
    .catch(() => {
      console.log( 'No internet connection found. App is running in offline mode.' );
    });
}