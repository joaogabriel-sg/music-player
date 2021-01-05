export default class Elements {
  static get() {
    this.musicTitle = document.querySelector('.music-title');
    this.musicAuthor = document.querySelector('.music-author');
    this.musicCover = document.querySelector('.music-cover');

    this.btnPlay = document.querySelector('.btn-play');
    this.btnPrev = document.querySelector('.btn-prev');
    this.btnNext = document.querySelector('.btn-next');
    
    this.audioTrack = document.querySelector('.music-track');
    this.currentMinutes = document.querySelector('.music-current-minutes');
    this.totalMinutes = document.querySelector('.music-total-minutes');
    
    this.volumeTrack = document.querySelector('.volume-track');
    this.btnVolume = document.querySelector('.btn-volume');
    this.btnMute = document.querySelector('.btn-mute');
  }
  
  static actions() {
    this.audioTrack.oninput = () => this.updateAudioTrack();
    this.audioTrack.onchange = () => this.updateAudioTrack();
    this.btnPlay.onclick = () => this.togglePlayPause();
    this.btnPrev.onclick = () => this.prev();
    this.btnNext.onclick = () => this.next();

    this.volumeTrack.oninput = () => this.updateVolumeTrack();
    this.volumeTrack.onchange = () => this.updateVolumeTrack();
    this.btnVolume.onclick = () => this.setVolumeToMax();
    this.btnMute.onclick = () => this.setVolumeToMute();
  }
}
