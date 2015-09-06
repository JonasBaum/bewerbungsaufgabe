/**
 * Created by jonas on 9/6/15.
 */

var bgcolorForm = document.getElementById('bgcolor');
var audioForm = document.getElementById('audioItem');
var audioPlay = document.getElementById('audioAutoPlay');

if(!localStorage.getItem('bgcolorForm')) {
    populateStorage();
} else {
    setChangedAttr();
}

if (!localStorage.getItem('audioAutoPlay')) {
    audioPlay.checked = false;
}

function populateStorage() {
    localStorage.setItem('bgcolorForm', document.getElementById('bgcolor').value);
    localStorage.setItem('audioItem', document.getElementById('audioItem').value);


    if(!localStorage.getItem('firstDateTime'))
        localStorage.setItem('firstDateTime',  new Date());

    setChangedAttr();
}

function setChangedAttr() {
    var currentColor = localStorage.getItem('bgcolorForm');
    var currentAudio = localStorage.getItem('audioItem');
    var audioAutoPlay = localStorage.getItem('audioAutoPlay');
    var firstStoredDateTime = localStorage.getItem('firstDateTime');
    var audio = document.getElementById('audio');
    var oggSource = document.getElementById('oggSource');
    var mp3Source = document.getElementById('mp3Source');
    var backgroundElement = document.getElementById('backgroundColor');

    document.getElementById('bgcolor').value = currentColor;
    document.getElementById('audioItem').value = currentAudio;
    backgroundElement.style.backgroundColor = '#' + currentColor;

    oggSource.src='resource/audio/'+currentAudio+'.ogg';
    mp3Source.src='resource/audio/'+currentAudio+'.mp3';

    if(audioAutoPlay === 'true'){
        audio.play(); //play audio
    }else{
        audio.load(); //call this to just preload the audio without playing
    }


    document.getElementById('firstStoredDateTime').innerHTML = firstStoredDateTime.toString();
    document.getElementById('updatedDateTime').innerHTML = new Date().toString();
}

function autoPlay(){
    localStorage.setItem('audioAutoPlay', document.getElementById('audioAutoPlay').checked);
}

bgcolorForm.onchange = populateStorage;
audioForm.onchange = populateStorage;
audioPlay.onchange = autoPlay;
