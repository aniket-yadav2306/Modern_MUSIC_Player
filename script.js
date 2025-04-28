console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let volumeBar = document.getElementById('volumeBar');
let currentTimeElement = document.getElementById('currentTime');
let durationElement = document.getElementById('duration');
let playButton = document.getElementById('playButton');
let stopButton = document.getElementById('stopButton');

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]", filePath: "3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "10.mp3", coverPath: "covers/10.jpg"},
]

songItems.forEach((element, i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})

// Add error handling for audio
audioElement.addEventListener('error', function(e) {
    console.error('Error loading audio:');
    console.error('Error code:', e.target.error.code);
    console.error('Source:', audioElement.src);
});

// Add loading handler
audioElement.addEventListener('loadstart', function() {
    console.log('Started loading:', audioElement.src);
});

audioElement.addEventListener('canplay', function() {
    console.log('Can start playing:', audioElement.src);
});

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play().catch(e => {
            console.error('Error playing audio:', e);
        });
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Play button event listener
playButton.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play().catch(e => {
            console.error('Error playing audio:', e);
        });
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
});

// Stop button event listener
stopButton.addEventListener('click', ()=>{
    audioElement.pause();
    audioElement.currentTime = 0;
    gif.style.opacity = 0;
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    
    // Update UI elements
    myProgressBar.value = 0;
    currentTimeElement.textContent = formatTime(0);
    
    // Reset play icons in song list
    makeAllPlays();
});

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    myProgressBar.value = progress;
    
    // Update time display
    currentTimeElement.textContent = formatTime(audioElement.currentTime);
    if (!isNaN(audioElement.duration)) {
        durationElement.textContent = formatTime(audioElement.duration);
    }
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = songs[songIndex].filePath;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play().catch(e => {
            console.error('Error playing audio:', e);
        });
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

// Update volume slider fill
function updateVolumeSlider(value) {
    volumeBar.style.background = `linear-gradient(to right, #1db954 0%, #1db954 ${value}%, #4d4d4d ${value}%)`;
}

// Handle volume change
volumeBar.addEventListener('input', (e) => {
    const value = e.target.value;
    audioElement.volume = value / 100;
    updateVolumeSlider(value);
});

// Initialize volume slider
updateVolumeSlider(100);

// Update volume on icon clicks
document.querySelector('.fa-volume-down').addEventListener('click', () => {
    const newVolume = Math.max(0, audioElement.volume - 0.1);
    audioElement.volume = newVolume;
    volumeBar.value = newVolume * 100;
    updateVolumeSlider(volumeBar.value);
});

document.querySelector('.fa-volume-up').addEventListener('click', () => {
    const newVolume = Math.min(1, audioElement.volume + 0.1);
    audioElement.volume = newVolume;
    volumeBar.value = newVolume * 100;
    updateVolumeSlider(volumeBar.value);
});

// Format time in MM:SS
function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

// Add keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        if (audioElement.paused) {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
        } else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
        }
    } else if (e.code === 'ArrowRight') {
        audioElement.currentTime = Math.min(audioElement.currentTime + 5, audioElement.duration);
    } else if (e.code === 'ArrowLeft') {
        audioElement.currentTime = Math.max(audioElement.currentTime - 5, 0);
    }
});
