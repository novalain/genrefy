const GUIData = function() {
  this.displayOutline = false;
  this.Classifier = 'Nearest Neighbour';
  this.Record = function() {alert('hej');}
  this.K = 5;
};

window.onload = () => {

  const ar = new AudioRecorderManager();
  const particles = new Particles();
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
    }, 3000);
  });

  let data = new GUIData();
  let gui = new dat.GUI();
  gui.add(particles, 'Record');
  let controller = gui.add(data, 'Classifier', [ 'Nearest Neighbour', 'K-Nearest Neighbours', 'Neural Networks' ] );
  let item;

  controller.onChange( value => {
    if (value === 'K-Nearest Neighbours') {
      item = gui.add(data, 'K');
    } else if(item){
      gui.remove(item);
    }
  });
}

