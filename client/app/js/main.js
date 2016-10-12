// TODO: Put GUI and logic in separate class
const classifiers =
    ['Nearest Neighbour', 'K-Nearest Neighbours', 'Neural Networks'];

// guistring -> apidata
const convertGUItoData = new Map([
  [classifiers[0], 'nearest'], [classifiers[1], 'k_nearest'],
  [classifiers[2], 'neural_networks']
]);

let isUserRecording = false;

const GUIData = function() {
  this.displayOutline = false;
  this.Classifier = 'Nearest Neighbour';
  this.K = 5;
  this.Record = function() {
    isUserRecording = !isUserRecording;
    let data;
    if (!isUserRecording) {
      data = {
        'Classifier': convertGUItoData.get(this.Classifier),
        'k': convertGUItoData.get(this.Classifier) === 'k_nearest' ? this.K : null
      };
    }
    toggleRecording(isUserRecording, data);
  }
};

window.onload = () => {
  let data = new GUIData();
  let gui = new dat.GUI();

  gui.add(data, 'Record');
  let controller = gui.add(data, 'Classifier', [ 'Nearest Neighbour', 'K-Nearest Neighbours', 'Neural Networks' ] );
  let item;

  controller.onChange(value => {
    if (value === 'K-Nearest Neighbours') {
      item = gui.add(data, 'K');
    } else if (item) {
      gui.remove(item);
    }
  });
}
