/*window.onload = () => {
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
*/

let record = true;

(function() {
  'use strict';

  var tau = Math.PI * 2;
  var width, height;
  var scene, camera, renderer, pointCloud;

  function onDocumentReady() {
    initialize();
    /* DO STUFF! */
    var material = new THREE.PointsMaterial({
      color: 0xFFFFFF,
      size: 0.01,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    var geometry = new THREE.Geometry();
    var x, y, z;
    for (var i = 0; i < 20000; i++) {

      x = -1 + Math.random() * 2;
      y = -1 + Math.random() * 2;
      z = -1 + Math.random() * 2;

      var d = 1 / Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2) + Math.pow(z, 2));
      x *= d;
      y *= d;
      z *= d;

      geometry.vertices.push(new THREE.Vector3(x* 0.5  , y * .5 , z* 1));
      geometry.colors.push(
          new THREE.Color(255,255, 255));
    };

    var pointCloud = new THREE.Points(geometry, material);

    scene.add(pointCloud);

    function render() {


      window.requestAnimationFrame(render);

      geometry.vertices.forEach(function(particle, index) {
        var dX, dY, dZ;

        if (!record) {
          dX = (Math.random() * 2 - 1) * 0.0001;
          dY = (Math.random() * 2 - 1) * 0.0001;
          dZ = (Math.random() * 2 - 1) * 0.05

        } else {
          dX = (Math.random() * 2 - 1) * 0.0002;
          dY = (Math.random() * 2 - 1) * 0.0002;
          dZ = (Math.random() * 2 - 1) * 0.003
        }

        particle.add(new THREE.Vector3(dX, dY, dZ) );
        geometry.colors[index] =
            new THREE.Color(Math.random() + 0.4,  Math.random()+ 0.4, Math.random() + 0.4);
      });

       // Create a sphere for the background:

      geometry.verticesNeedUpdate = true;
      geometry.colorsNeedUpdate = true;

      renderer.render(scene, camera);

    }



    render();
  }

  function initialize() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(120, 16 / 9, 1, 1000);
    renderer = new THREE.WebGLRenderer();
    document.body.appendChild(renderer.domElement);
    window.addEventListener('resize', onWindowResize);
    onWindowResize();

    document.getElementById('record').addEventListener("click", function(){
      record = !record;
    });

  }

  function onWindowResize() {
    width = window.innerWidth;
    height = window.innerHeight;
    updateRendererSize();
  }

  function updateRendererSize() {
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  document.addEventListener('DOMContentLoaded', onDocumentReady);
})();


