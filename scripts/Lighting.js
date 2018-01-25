var lampOnMaterial = new THREE.MeshDepthMaterial();
var lampOffMaterial = new THREE.MeshPhongMaterial({color: 0xffd6aa});

var lampGeometry = new THREE.CylinderGeometry(0.8, 2.5, 6, 32);
var smallerLampGeometry = new THREE.CylinderGeometry(0.6, 2, 4, 32);

var lightingSource = new THREE.Mesh(lampGeometry, lampOffMaterial);


var roomLight = new THREE.PointLight(0xffd6aa, 3, 60, 2);
var secondFloorLightL = new THREE.PointLight(0xffd6aa, 3, 30, 2);
var secondFloorLightR = new THREE.PointLight(0xffd6aa, 3, 30, 2);


var frontLeftLight = new THREE.PointLight(0xffd6aa, 6,80, 2);
var frontRightLight = new THREE.PointLight(0xffd6aa, 6,80, 2);
var backLeftLight = new THREE.PointLight(0xffd6aa, 7,100, 2);
var backRightLight = new THREE.PointLight(0xffd6aa, 7,100, 2);



function addLighting() {

    var light = new THREE.HemisphereLight(0x081640,0xffd6aa,1);
    scene.add(light);


    roomLight.position.set(10, 20, 5);
    roomLight.needsUpdate = true;
    roomLight.castShadow = true;


    secondFloorLightL.position.set(-5.5, 38, -25)
    secondFloorLightL.needsUpdate = true;
    secondFloorLightL.castShadow = true;

    secondFloorLightR.position.set(19.5, 38, -25)
    secondFloorLightR.needsUpdate = true;
    secondFloorLightR.castShadow = true;

    frontLeftLight.position.set(-50,30,-50);
    frontRightLight.position.set(-50,30,50);
    backLeftLight.position.set(70,30,-60);
    backRightLight.position.set(70,30,60);

}


