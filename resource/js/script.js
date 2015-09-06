/**
 * Created by jonas baumgartner on 9/6/15.
 */

//global variables
var bgcolorForm = document.getElementById('bgcolor');
var audioForm = document.getElementById('audioItem');
var audioPlay = document.getElementById('audioAutoPlay');

//initialize project
init();

/**
 * initialize javascript functions
 * background-color
 * audio
 */
function init(){
    if(!localStorage.getItem('bgcolorForm')) {
        populateStorage();
    } else {
        setChangedAttr();
    }

    bgcolorForm.onchange = populateStorage;
    audioForm.onchange = populateStorage;
    audioPlay.onchange = populateStorage;
}

/**
 * populate storage and update changed values
 * check if storage is once created
 */
function populateStorage() {
    localStorage.setItem('bgcolorForm', document.getElementById('bgcolor').value);
    localStorage.setItem('audioItem', document.getElementById('audioItem').value);
    localStorage.setItem('audioAutoPlay', document.getElementById('audioAutoPlay').checked);

    if(!localStorage.getItem('firstDateTime'))
        localStorage.setItem('firstDateTime',  new Date());

    setChangedAttr();
}

/**
 * update values
 */
function setChangedAttr() {
    //initialize variables
    var currentColor = localStorage.getItem('bgcolorForm');
    var currentAudio = localStorage.getItem('audioItem');
    var audioAutoPlay = localStorage.getItem('audioAutoPlay');
    var audio = document.getElementById('audio');
    var oggSource = document.getElementById('oggSource');
    var mp3Source = document.getElementById('mp3Source');
    var backgroundElement = document.getElementById('backgroundColor');

    //set current background color in input field
    document.getElementById('bgcolor').value = currentColor;
    //set current audio in selection
    document.getElementById('audioItem').value = currentAudio;
    //set background color as HEX
    backgroundElement.style.backgroundColor = '#' + currentColor;
    // set audio path
    oggSource.src='resource/audio/'+currentAudio+'.ogg';
    mp3Source.src='resource/audio/'+currentAudio+'.mp3';

    //check if auto play is enabled and update checkbox
    if(audioAutoPlay === 'true'){
        audio.load(); //call this to just preload the audio without playing
        audio.play(); //play audio
        audioPlay.checked = true;
    }else{
        audioPlay.checked = false;
        audio.load(); //call this to just preload the audio without playing
    }

    setControlPanel(currentColor,currentAudio,audioAutoPlay)
}

/**
 * update control panel values
 *
 * @param currentColor
 * @param currentAudio
 * @param audioAutoPlay
 */
function setControlPanel(currentColor, currentAudio,audioAutoPlay){
    //set control time
    document.getElementById('firstStoredDateTime').innerHTML = localStorage.getItem('firstDateTime').toString();
    document.getElementById('updatedDateTime').innerHTML = new Date().toString();

    //set table values
    document.getElementById('storedValueColor').innerHTML = currentColor;
    document.getElementById('storedValueSong').innerHTML = currentAudio;
    document.getElementById('storedValueAutoPlay').innerHTML = audioAutoPlay;
}

