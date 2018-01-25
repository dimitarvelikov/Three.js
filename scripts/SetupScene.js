//////////////////////////////////////////GLOBAL VARIABLES////////////////////////////////////////////////
var scene, camera, renderer, controls, loader;
scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x000000, 0.006);
scene.background = new THREE.Color(0x081640);//0x66CCFF

camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-100, 60, 0);
camera.lookAt(0, 0, 0);


renderer = new THREE.WebGLRenderer();
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
renderer.setSize(window.innerWidth, window.innerHeight);

loader = new THREE.TextureLoader();

controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;
controls.enableZoom = true;
controls.addEventListener('change', render, function (e) {
    console.log(e.defaultPrevented);  // will be false
    e.preventDefault();   // does nothing since the listener is passive
    console.log(e.defaultPrevented);  // still false
});

window.addEventListener('resize', onWindowResize, false);

var showMirror = false;


function init() {
//animateParticles();
    addOutdoorAspects();
    addLighting();
    furnishFirstFloor();
    furnishSecondFloor();
    keyboardMovement();
    render();

}
function render() {
    if (showMirror) {
        mirror.visible = false;
        cubeCamera.position.copy(mirror.position);
        cubeCamera.update(renderer, scene);
        mirror.visible = true;
    }

    renderer.render(scene, camera);
}


function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
