import musics from './musics.js';
import Elements from './elements.js';
import { path, secondsToMinutes } from './utils.js';

export default class Player {
  constructor() {
    this.currentAudio = {};
    this.currentPlaying = 0;
    this.isPlaying = false;
    this.isMuted = false;
    this.isFirstLoad = true;
  }

  play() {
    this.audio.play();
    this.isPlaying = true;
  }

  pause() {
    this.audio.pause();
    this.isPlaying = false;
  }

  togglePlayPause() {
    this.isPlaying ? this.pause() : this.play();
  }

  updateAndPlay() {
    this.update();
    this.play();
  }

  prev() {
    this.currentPlaying--;
    if (this.currentPlaying < 0) this.currentPlaying = musics.length - 1;
    this.updateAndPlay();
  }

  next() {
    this.currentPlaying++;
    if (this.currentPlaying === musics.length) this.currentPlaying = 0;
    this.updateAndPlay();
  }

  updateAudioTrack() {
    this.audio.currentTime = this.audioTrack.value;
  }

  updateVolumeTrack() {
    this.changeVolumeTo(this.volumeTrack.value);
  }

  muteLikeTrue() {
    this.isMuted = true;
    this.audio.muted = true;
  }

  muteLikeFalse() {
    this.isMuted = false;
    this.audio.muted = false;
  }

  setVolumeToMax() {
    this.muteLikeFalse();
    this.changeVolumeTo(100);
  }

  setVolumeToMute() {
    if (this.isMuted) {
      this.muteLikeFalse();
      this.changeVolumeTo(this.audio.volume * 100);
    } else {
      this.muteLikeTrue();
      this.changeVolumeTo(0);
    }
  }

  changeVolumeTo(value) {
    this.volumeTrack.value = value;

    if (Number(value)) {
      this.audio.volume = value / 100;
      this.muteLikeFalse();
    } else {
      this.muteLikeTrue();
    }
  }

  setAudioEvents() {
    this.audio.onloadeddata = () => {
      this.currentMinutes.textContent = secondsToMinutes(0);
      this.totalMinutes.textContent = secondsToMinutes(this.audio.duration);

      this.audioTrack.value = 0;
      this.audioTrack.min = 0;
      this.audioTrack.max = this.audio.duration;
    }

    this.audio.ontimeupdate = () => {
      this.currentMinutes.textContent = secondsToMinutes(this.audio.currentTime);
      this.audioTrack.value = this.audio.currentTime;
    }

    this.audio.onended = () => this.next();
  }

  setMusicDatas() {
    this.musicTitle.textContent = this.currentAudio.music;
    this.musicAuthor.textContent = this.currentAudio.author;
    this.musicCover.src = this.currentAudio.cover;
  }

  update() {
    this.currentAudio = musics[this.currentPlaying];
    this.setMusicDatas();

    if (this.audio) this.audio.pause();

    if (!this.isFirstLoad)
      this.currentVolume = (this.isMuted ? 0 : this.audio.volume) * 100;
    
    this.audio = new Audio(path(this.currentAudio.file));
    this.setAudioEvents();
    
    if (this.isFirstLoad) this.changeVolumeTo(50);
    else this.changeVolumeTo(this.currentVolume);
    
    this.isFirstLoad = false;
  }

  start() {
    Elements.get.call(this);
    Elements.actions.call(this);
    
    this.update();
  }
}
