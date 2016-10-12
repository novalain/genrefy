const GUIData = function() {
  this.displayOutline = false;
  this.Classifier = 'Nearest Neighbour';
  this.K = 5;
  this.Record = (element) => {
    countDownRecording(!recording);
    toggleRecording(!recording)
    this.recordController.domElement.addEventListener("click", function(event){
      event.stopPropagation()
    }, true); 
// to toggle it open 
  }
};
  
let countdown = document.getElementById("count-down")

let recording = false;
window.onload = () => {
  //const particles = new Particles();

  let data = new GUIData();
  let gui = new dat.GUI();



  data.recordController = gui.add(data, 'Record');

  let controller = gui.add(data, 'Classifier', [ 'Nearest Neighbour', 'K-Nearest Neighbours', 'Neural Networks' ] );
  let item;

  controller.onChange( value => {
    if (value === 'K-Nearest Neighbours') {
      item = gui.add(data, 'K');
    } else if(item){
      gui.remove(item);
    }
  });

  // console.log('reco ', recordController.domElement.hasElement("disabled"))
  data.recordController.domElement.setAttribute("disabled", "disabled");

}


function countDownRecording(){
  let timeLeft =  parseInt(countdown.innerHTML)
  if(timeLeft <= 0){
    return;
  }
  countdown.innerHTML = parseInt(countdown.innerHTML) - 1;
  setTimeout(countDownRecording, 1000);
} 

