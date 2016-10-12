// TODO: Put GUI and logic in separate class
const classifiers =
    ['Nearest Neighbour', 'K-Nearest Neighbours', 'Neural Networks'];

// guistring -> apidata
const convertGUItoData = new Map([
  [classifiers[0], 'nearest'], [classifiers[1], 'k_nearest'],
  [classifiers[2], 'neural_networks']
]);

let isUserRecording = false;


let STARTTIME = 30;

const GUIData = function() {
  this.displayOutline = false;
  this.Classifier = 'Nearest Neighbour';
  this.K = 5;

  this.Record = handleRecordings.bind(this);

};

function handleRecordings(){
  if(isUserRecording) return;

  isUserRecording = !isUserRecording
  countdown.innerHTML = STARTTIME;
  this.recordController.domElement.setAttribute("disabled", "disabled");
  
  countDownRecording.bind(this)();
  toggleRecording(isUserRecording);
}
  
let countdown = document.getElementById("count-down")

countdown.innerHTML = STARTTIME;



window.onload = () => {
  let data = new GUIData();
  let gui = new dat.GUI();

  data.recordController = gui.add(data, 'Record');

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



function resultFromBackend(res){
  let result = JSON.parse(res).genre
  if(result){
    countdown.innerHTML = result;
  }else{
    countdown.innerHTML = JSON.parse(res).message;
  }


}


function countDownRecording(){

  let timeLeft =  parseInt(countdown.innerHTML)
  if(timeLeft <= 0){
    data = {
      'Classifier': convertGUItoData.get(this.Classifier),
      'K': convertGUItoData.get(this.Classifier) === 'k_nearest' ? this.K : null
    };


    isUserRecording = !isUserRecording
    toggleRecording(isUserRecording, data);
    countdown.innerHTML = "Processing data...";
    this.recordController.domElement.removeAttribute("disabled");
    return;
  }

  countdown.innerHTML = parseInt(countdown.innerHTML) - 1;
  setTimeout(countDownRecording.bind(this), 1000);
} 

