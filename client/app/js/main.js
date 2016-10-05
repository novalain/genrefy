window.onload = () => {
  const ar = new AudioRecorderManager();
  ar.ready().then(() => {
    ar.start();
    console.log('Start recording audio');
    // Stop record after 1s
    setTimeout(() => {
      ar.stop();
      console.log("Stop recoring, sending blob: ", ar.blob);
      const fetcher = new GenreFetcher();
      GenreFetcher.fetch(ar.blob).then(
          res => console.log("Message from server", res));
    }, 1000);
  });
}
