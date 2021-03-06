function createTrackItem(index, name, duration) {
  var trackItem = document.createElement('div');
  trackItem.setAttribute("class", "playlist-track-ctn");
  trackItem.setAttribute("id", "ptc-" + index);
  trackItem.setAttribute("data-index", index);
  document.querySelector(".playlist-ctn").appendChild(trackItem);

  var playBtnItem = document.createElement('div');
  playBtnItem.setAttribute("class", "playlist-btn-play");
  playBtnItem.setAttribute("id", "pbp-" + index);
  document.querySelector("#ptc-" + index).appendChild(playBtnItem);

  var btnImg = document.createElement('i');
  btnImg.setAttribute("class", "fas fa-play");
  btnImg.setAttribute("height", "40");
  btnImg.setAttribute("width", "40");
  btnImg.setAttribute("id", "p-img-" + index);
  document.querySelector("#pbp-" + index).appendChild(btnImg);

  var trackInfoItem = document.createElement('div');
  trackInfoItem.setAttribute("class", "playlist-info-track");
  trackInfoItem.innerHTML = name
  document.querySelector("#ptc-" + index).appendChild(trackInfoItem);

  var trackDurationItem = document.createElement('div');
  trackDurationItem.setAttribute("class", "playlist-duration");
  trackDurationItem.innerHTML = duration
  document.querySelector("#ptc-" + index).appendChild(trackDurationItem);
}

var listAudio = [
  {
    name: "Vulnerable - Selena Gomez",
    file: "https://hiphopmore.site/music/uploads/2021/09/Selena_Gomez_-_Vulnerable_-HIPHOPMORE.COM.mp3",
    duration: "03:12"
  },
  {
    name: "Ring - Selena Gomez",
    file: "https://hiphopmore.site/music/uploads/2021/09/Selena_Gomez_-_Ring-HIPHOPMORE.COM.mp3",
    duration: "02:28"
  },
  {
    name: "Let Me Get Me - Selena Gomez",
    file: "https://hiphopmore.site/music/uploads/2021/09/Selena_Gomez_-_Let_Me_Get_Me-HIPHOPMORE.COM.mp3",
    duration: "03:09"
  },
  {
    name: "Kill Em with Kindness - Selena Gomez",
    file: "https://hiphopmore.site/music/uploads/2021/10/Selena_Gomez_-_Kill_Em_with_Kindness-HIPHOPMORE.COM.mp3",
    duration: "03:43"
  },
  {
    name: "Souvenir - Selena Gomez",
    file: "https://hiphopmore.site/music/uploads/2021/09/Selena_Gomez_-_Souvenir-HIPHOPMORE.COM.mp3",
    duration: "02:42"

  },
  {
    name: "Motive - Ariana Grande ft Doja Cat",
    file: "https://hiphopmore.site/music/uploads/2021/10/Ariana_Grande_ft_Doja_Cat_-_Motive-HIPHOPMORE.COM.mp3",
    duration: "02:48"
  },
  {
    name: "Off the Table - Ariana Grande ft The Weeknd",
    file: "https://hiphopmore.site/music/uploads/2021/10/Ariana_Grande_ft_The_Weeknd_-_Off_The_Table-HIPHOPMORE.COM.mp3",
    duration: "03:59"

  },
  {
    name: "Pov - Ariana Grande",
    file: "https://hiphopmore.site/music/uploads/2021/10/Ariana_Grande_-_Positions-HIPHOPMORE.COM.mp3",
    duration: "02:53"
  },
  {
    name: "Rain on Me - Lady Gaga ft Ariana Grande",
    file: "https://hiphopmore.site/music/uploads/2021/09/Lady_Gaga_Ft_Ariana_Grande_-_Rain_On_Me-HIPHOPMORE.COM.mp3",
    duration: "03:02"
  },
  {
    name: "Bad to You - Ariana Grande ft Normani & Nicki Minaj",
    file: "https://hiphopmore.site/music/uploads/2021/09/Ariana_Grande_ft_Normani_Nicki_Minaj_-_Bad_to_You-HIPHOPMORE.COM.mp3",
    duration: "02:51"
  },
  {
    name: "Stuck with U - Ariana Grande ft Justin Bieber",
    file: "https://hiphopmore.site/music/uploads/2021/09/Ariana_Grande_Ft_Justin_Bieber_-_Stuck_with_U-HIPHOPMORE.COM.mp3",
    duration: "03:49"
  }
]

for (var i = 0; i < listAudio.length; i++) {
  createTrackItem(i, listAudio[i].name, listAudio[i].duration);
}
var indexAudio = 0;

function loadNewTrack(index) {
  var player = document.querySelector('#source-audio')
  player.src = listAudio[index].file
  document.querySelector('.title').innerHTML = listAudio[index].name
  this.currentAudio = document.getElementById("myAudio");
  this.currentAudio.load()
  this.toggleAudio()
  this.updateStylePlaylist(this.indexAudio, index)
  this.indexAudio = index;
}

var playListItems = document.querySelectorAll(".playlist-track-ctn");

for (let i = 0; i < playListItems.length; i++) {
  playListItems[i].addEventListener("click", getClickedElement.bind(this));
}

function getClickedElement(event) {
  for (let i = 0; i < playListItems.length; i++) {
    if (playListItems[i] == event.target) {
      var clickedIndex = event.target.getAttribute("data-index")
      if (clickedIndex == this.indexAudio) { // alert('Same audio');
        this.toggleAudio()
      } else {
        loadNewTrack(clickedIndex);
      }
    }
  }
}

document.querySelector('#source-audio').src = listAudio[indexAudio].file
document.querySelector('.title').innerHTML = listAudio[indexAudio].name


var currentAudio = document.getElementById("myAudio");

currentAudio.load()

currentAudio.onloadedmetadata = function () {
  document.getElementsByClassName('duration')[0].innerHTML = this.getMinutes(this.currentAudio.duration)
}.bind(this);

var interval1;

function toggleAudio() {

  if (this.currentAudio.paused) {
    document.querySelector('#icon-play').style.display = 'none';
    document.querySelector('#icon-pause').style.display = 'block';
    document.querySelector('#ptc-' + this.indexAudio).classList.add("active-track");
    this.playToPause(this.indexAudio)
    this.currentAudio.play();
  } else {
    document.querySelector('#icon-play').style.display = 'block';
    document.querySelector('#icon-pause').style.display = 'none';
    this.pauseToPlay(this.indexAudio)
    this.currentAudio.pause();
  }
}

function pauseAudio() {
  this.currentAudio.pause();
  clearInterval(interval1);
}

var timer = document.getElementsByClassName('timer')[0]

var barProgress = document.getElementById("myBar");


var width = 0;

function onTimeUpdate() {
  var t = this.currentAudio.currentTime
  timer.innerHTML = this.getMinutes(t);
  this.setBarProgress();
  if (this.currentAudio.ended) {
    document.querySelector('#icon-play').style.display = 'block';
    document.querySelector('#icon-pause').style.display = 'none';
    this.pauseToPlay(this.indexAudio)
    if (this.indexAudio < listAudio.length - 1) {
      var index = parseInt(this.indexAudio) + 1
      this.loadNewTrack(index)
    }
  }
}


function setBarProgress() {
  var progress = (this.currentAudio.currentTime / this.currentAudio.duration) * 100;
  document.getElementById("myBar").style.width = progress + "%";
}


function getMinutes(t) {
  var min = parseInt(parseInt(t) / 60);
  var sec = parseInt(t % 60);
  if (sec < 10) {
    sec = "0" + sec
  }
  if (min < 10) {
    min = "0" + min
  }
  return min + ":" + sec
}

var progressbar = document.querySelector('#myProgress')
progressbar.addEventListener("click", seek.bind(this));


function seek(event) {
  var percent = event.offsetX / progressbar.offsetWidth;
  this.currentAudio.currentTime = percent * this.currentAudio.duration;
  barProgress.style.width = percent * 100 + "%";
}

function forward() {
  this.currentAudio.currentTime = this.currentAudio.currentTime + 5
  this.setBarProgress();
}

function rewind() {
  this.currentAudio.currentTime = this.currentAudio.currentTime - 5
  this.setBarProgress();
}


function next() {
  if (this.indexAudio < listAudio.length - 1) {
    var oldIndex = this.indexAudio
    this.indexAudio++;
    updateStylePlaylist(oldIndex, this.indexAudio)
    this.loadNewTrack(this.indexAudio);
  }
}

function previous() {
  if (this.indexAudio > 0) {
    var oldIndex = this.indexAudio
    this.indexAudio--;
    updateStylePlaylist(oldIndex, this.indexAudio)
    this.loadNewTrack(this.indexAudio);
  }
}

function updateStylePlaylist(oldIndex, newIndex) {
  document.querySelector('#ptc-' + oldIndex).classList.remove("active-track");
  this.pauseToPlay(oldIndex);
  document.querySelector('#ptc-' + newIndex).classList.add("active-track");
  this.playToPause(newIndex)
}

function playToPause(index) {
  var ele = document.querySelector('#p-img-' + index)
  ele.classList.remove("fa-play");
  ele.classList.add("fa-pause");
}

function pauseToPlay(index) {
  var ele = document.querySelector('#p-img-' + index)
  ele.classList.remove("fa-pause");
  ele.classList.add("fa-play");
}


function toggleMute() {
  var btnMute = document.querySelector('#toggleMute');
  var volUp = document.querySelector('#icon-vol-up');
  var volMute = document.querySelector('#icon-vol-mute');
  if (this.currentAudio.muted == false) {
    this.currentAudio.muted = true
    volUp.style.display = "none"
    volMute.style.display = "block"
  } else {
    this.currentAudio.muted = false
    volMute.style.display = "none"
    volUp.style.display = "block"
  }
}

function search_song(value) {
  document.querySelector(".playlist-ctn").innerHTML = "";
  const filteredAudioList = listAudio.filter((audio) => audio.name.toLowerCase().includes(value.toLowerCase()))
  for (var i = 0; i < filteredAudioList.length; i++) {
    createTrackItem(i, filteredAudioList[i].name, filteredAudioList[i].duration);
  }
}

function orderByName() {
  document.querySelector(".playlist-ctn").innerHTML = "";
  const sortedListAudio = listAudio.sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    return 0;
  }
  )
  for (var i = 0; i < sortedListAudio.length; i++) {
    createTrackItem(i, sortedListAudio[i].name, sortedListAudio[i].duration);
  }
}