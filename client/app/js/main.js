window.onload = () => {
  const ar = new AudioRecorderManager();
  ar.ready().then(() => {
    ar.start();
    console.log('start');
    setTimeout(() => {
      ar.stop();
      console.log("blob", ar.blob);
    }, 1000);
  });
}
