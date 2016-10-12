const GUIData = function() {
  this.displayOutline = false;
  this.Classifier = 'Nearest Neighbour';
  this.K = 5;
};

window.onload = () => {
  //const particles = new Particles();

  let data = new GUIData();
  let gui = new dat.GUI();
 // gui.add(particles, 'Record');
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

