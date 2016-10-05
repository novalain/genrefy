class AudioRecorderManager {
  constructor(stream) {
    this.mediaRecorder_;
    this.chunks_ = [];
    this.blob_;
    this.readyPromise_ = this.init_();
  }

  get blob() { return this.blob_; }

  ready() { return this.readyPromise_; }
  start() { this.mediaRecorder_.start(); }
  stop() {
    this.mediaRecorder_.stop();
    this.blob_ = new Blob(this.chunks_, {'type': 'audio/wav;'});
  }

  init_() {
    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

    if (!navigator.getUserMedia) {
      console.log('navigator.getUserMedia undefined');
      return;
    }
    return new Promise(resolve => {
      navigator.getUserMedia(
          {audio: true},
          stream => {
            this.mediaRecorder_ = new MediaRecorder(stream);
            this.listen_();
            resolve();
          },
          error => {
            console.warn('Error in getting user media');
            resolve();
          });
    });
  }

  listen_() {
    this.mediaRecorder_.ondataavailable = e => {
      this.chunks_.push(e);
    }
  }
};
