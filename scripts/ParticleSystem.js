var particleSystem = createParticleSystem();
particleSystem.geometry.verticesNeedUpdate = true;
scene.add(particleSystem);
var deltaTime;

function createParticleSystem() {

    // The number of particles in a particle system is not easily changed.
    var particleCount = 500;

    // Particles are just individual vertices in a geometry
    // Create the geometry that will hold all of the vertices
    var particles = new THREE.Geometry();


    for (var sides = 0; sides < 4; ++sides) {
        // Create the vertices and add them to the particles geometry
        for (var p = 0; p < particleCount; p++) {
            switch (sides) {
                case 0://top
                    particles.vertices.push(new THREE.Vector3(250 - Math.random() * 400,
                        150 - Math.random() * (80 - 10) + 10,
                        Math.random() * 400 - 200));
                    break;
                case 1://right
                    particles.vertices.push(new THREE.Vector3(200 - Math.random() * 500,
                        Math.random() * 200,
                        100 + Math.random() * 200));
                    break;
                case 2: //left
                    particles.vertices.push(new THREE.Vector3(200 - Math.random() * 500,
                        Math.random() * 200,
                        (Math.random() * 100) - 220));
                    break;
                case 3:
                    particles.vertices.push(new THREE.Vector3(120 + Math.random() * 200,
                        Math.random() * (80 - 10) + 10,
                        Math.random() * 400 - 200));

                    break;
                case 4://front
                    break;
            }
        }
    }
    var particleMaterial = new THREE.PointsMaterial(
        {
            color: 0xffffff,
            size: 4,
            map: loader.load("images/star.gif"),
            blending: THREE.AdditiveBlending,
            transparent: true,
        });

    // Create the particle system
    particleSystem = new THREE.Points(particles, particleMaterial);
    particleSystem.geometry.verticesNeedUpdate = true;
    return particleSystem;
}


animateParticles();

function animateParticles() {

    // add some rotation to the system
    particleSystem.rotation.y += 0.0004;//speed

    // draw
    renderer.render(scene, camera);

    // set up the next call
    requestAnimationFrame(animateParticles);
}





























