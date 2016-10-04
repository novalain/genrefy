console.log('hello world');

window.onload = function() {

  navigator.getUserMedia = navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia;

  var record = document.querySelector('.record');
  var stop = document.querySelector('.stop');
  var soundClips = document.querySelector('.sound-clips');

  if (navigator.getUserMedia) {
     console.log('getUserMedia supported.');
     navigator.getUserMedia (
        // constraints - only audio needed for this app
        {
           audio: true
        },

        // Success callback
        function(stream) {

          var mediaRecorder = new MediaRecorder(stream);

          record.onclick = function() {
            mediaRecorder.start();
            console.log(mediaRecorder.state);
            console.log("recorder started");
            record.style.background = "red";
            record.style.color = "black";
          }

          stop.onclick = function() {
            mediaRecorder.stop();
            console.log(mediaRecorder.state);
            console.log("recorder stopped");
          }


          var chunks = [];

          mediaRecorder.ondataavailable = function(e) {
            chunks.push(e.data);
          }

          mediaRecorder.onstop = function(e) {
            console.log("recorder stopped");

            var clipName = prompt('Enter a name for your sound clip');

            var clipContainer = document.createElement('article');
            var clipLabel = document.createElement('p');
            var audio = document.createElement('audio');
            var deleteButton = document.createElement('button');

            clipContainer.classList.add('clip');
            audio.setAttribute('controls', '');
            deleteButton.innerHTML = "Delete";
            clipLabel.innerHTML = clipName;

            clipContainer.appendChild(audio);
            clipContainer.appendChild(clipLabel);
            clipContainer.appendChild(deleteButton);
            document.getElementById('main').appendChild(clipContainer);

            var blob = new Blob(chunks, {'type' : 'audio/wav;'});

            console.log("blob", blob)
            chunks = [];
            var audioURL = window.URL.createObjectURL(blob);
            audio.src = audioURL;

            deleteButton.onclick = function(e) {
              evtTgt = e.target;
              evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
            }
          }

        },

        // Error callback
        function(err) {
           console.log('The following gUM error occured: ' + err);
        }
     );
  } else {
     console.log('getUserMedia not supported on your browser!');
  }


}
