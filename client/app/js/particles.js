class Particles {
  constructor() {
    // Engine stuff
    this.windowHeight_;
    this.windowWidth_;
    this.scene_;
    this.camera_;
    this.renderer_;
    this.initThreeJS_();
    this.listen_();

    // Particles
    this.particles_ = new THREE.Geometry();
    this.shouldResetCtx_ = true;
    this.scaleAccumulator_ = 1;
    this.bounce_ = true;
    this.initParticles_();
    this.render_();

    // User input
    this.record_ = false;
  }

  initParticles_() {
    const material = Particles.PARTICLE_MATERIAL;

    for (let i = 0; i < Particles.NUM_PARTICLES; i++) {
      // Define unit sphere
      let x = -1 + Math.random() * 2;
      let y = -1 + Math.random() * 2;
      let z = -1 + Math.random() * 2;
      let v = new THREE.Vector3(x, y, z).normalize();

      // Move z out from the camera a bit
      v.z += -5;
      this.particles_.vertices.push(v);
      this.particles_.colors.push(
          new THREE.Color(Math.random(), Math.random(), Math.random()));
    };

    const pointCloud = new THREE.Points(this.particles_, material);
    this.scene_.add(pointCloud);
    this.renderer_.render(this.scene_, this.camera_);
  }

  initThreeJS_() {
    this.scene_ = new THREE.Scene();
    this.camera_ = new THREE.PerspectiveCamera(
        45, this.windowWidth_ / this.windowHeight_, 0.1, 20000);
    this.renderer_ = new THREE.WebGLRenderer({antialias: true});
    document.body.appendChild(this.renderer_.domElement);
  }

  listen_() {
    window.addEventListener('resize', this.onWindowResize_.bind(this));
    this.onWindowResize_();
    document.getElementById('record').addEventListener(
        "click", function() { this.record_ = !this.record_; });
  }

  render_() {
    window.requestAnimationFrame(this.render_.bind(this));

    if (this.bounce_) {
      this.particles_.vertices.forEach((particle, index) => {
        let dX, dY, dZ;
        dX = (Math.random() * 2 - 1) * 0.005;
        dY = (Math.random() * 2 - 1) * 0.005;
        dZ = (Math.random() * 2 - 1) * 0.005;

        particle.z += 5;
        const normal = particle;
        const random = new THREE.Vector3(dX, dY, dZ);
        const biTangent = new THREE.Vector3();
        biTangent.crossVectors(normal, random).normalize();

        // Move in surface tangent direction
        particle.add(biTangent.multiplyScalar(0.005));
        particle.multiplyScalar(Particles.SCALE_FACTOR);
        particle.z -= 5;
        // particle.add(v);
        this.particles_.colors[index] =
            new THREE.Color(Math.random(), Math.random(), Math.random());
      });
      this.scaleAccumulator_ = Particles.SCALE_FACTOR * this.scaleAccumulator_;
    } else {
      this.particles_.vertices.forEach((particle, index) => {
        particle.z += 5;
        particle.multiplyScalar(1 / this.scaleAccumulator_);
        particle.z -= 5;
        // this.particles_.colors[index] = new THREE.Color(
        //  Math.random(), Math.random(), Math.random());
      });
      this.scaleAccumulator_ = 1;
      this.bounce_ = true;
    }

    if (this.shouldResetCtx_) {
      this.shouldResetCtx_ = false;
      setTimeout( () => {
        this.bounce_ = false;
        this.shouldResetCtx_ = true;
      }, 750);
    }

    this.renderer_.render(this.scene_, this.camera_);
    this.particles_.verticesNeedUpdate = true;
    this.particles_.colorsNeedUpdate = true;
  }

  onWindowResize_() {
    this.windowWidth_ = window.innerWidth;
    this.windowHeight_ = window.innerHeight;
    this.updateRendererSize_();
  }

  updateRendererSize_() {
    this.renderer_.setSize(this.windowWidth_, this.windowHeight_);
    this.camera_.aspect = this.windowWidth_ / this.windowHeight_;
    this.camera_.updateProjectionMatrix();
  }
}

// Constants
Particles.NUM_PARTICLES = 1000;
Particles.PARTICLE_MATERIAL = new THREE.PointsMaterial({
  color: 0xFFFFFF,
  size: 0.11,
  // map: THREE.ImageUtils.loadTexture("js/particle.png"),
  blending: THREE.AdditiveBlending,
  transparent: true
});
Particles.SCALE_FACTOR = 1.003;
