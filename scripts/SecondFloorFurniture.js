function furnishSecondFloor() {
    addSecondFloor();
    addSecondFloorRailing();
    addBed();
    clothes_cabinet();
}

function ClothesCabinet(zAxis) {
    this.zAxis = zAxis;

}

function clothes_cabinet() {
    var clothesCabinetWhiteMaterial = new THREE.MeshPhongMaterial ( {map: loader.load("images/white_laminate_shelf.png")});
    var clothesCabinetBlackMaterial = new THREE.MeshLambertMaterial ( {map: loader.load("images/black_laminate_shelf.jpg")});

    var cabinet_back = new THREE.Mesh(new THREE.BoxGeometry(0.25, 20, 25), clothesCabinetWhiteMaterial);

    var cabinet_front_left = new THREE.Mesh(new THREE.BoxGeometry(0.25, 18, 12),clothesCabinetBlackMaterial);
    cabinet_front_left.position.set(23, 38, 15);

    cabinet_back.position.set(27.1, 38, 20);

    var cabinet_front_right = new THREE.Mesh(new THREE.BoxGeometry(0.25, 18, 12),clothesCabinetWhiteMaterial);
    cabinet_front_right.position.set(22.5, 38, 24);

    cabinet_front_left.userData = new ClothesCabinet(cabinet_front_left.position.z);
    cabinet_front_right.userData = new ClothesCabinet(cabinet_front_right.position.z);
    if (cabinet_front_right.userData instanceof ClothesCabinet) {
        console.log(cabinet_front_right.userData.zAxis);
        console.log(cabinet_front_left.userData.zAxis);
    }

    var cabinet_left = new THREE.Mesh(new THREE.BoxGeometry(5, 20, 0.25), clothesCabinetWhiteMaterial);
    cabinet_left.position.set(24.75, 38, 7.5)
    var cabinet_right = cabinet_left.clone();
    cabinet_right.position.set(24.75, 38, 32.5);


    var cabinet_top = new THREE.Mesh(new THREE.BoxGeometry(5, 1, 25.5), clothesCabinetWhiteMaterial);
    cabinet_top.position.set(24.5, 47.5, 20);
    var cabinet_btm = cabinet_top.clone();
    cabinet_btm.position.set(24.5, 28.5, 20);
    scene.add(cabinet_back, cabinet_front_left, cabinet_front_right, cabinet_left, cabinet_right, cabinet_top, cabinet_btm);


}

function addSecondFloor() {

    var smallerPartInsideWall = [
        new THREE.MeshBasicMaterial({color: 0xffffff}),
        new THREE.MeshBasicMaterial({color: 0xffffff}),
        new THREE.MeshPhongMaterial({
            map: loader.load("images/parquet.jpg", function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(4, 4)
            })
        }),
        new THREE.MeshPhongMaterial({
            map: loader.load("images/house.jpg", function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(6, 6)
            })
        }),
        new THREE.MeshBasicMaterial({color: 0xffffff}),
        new THREE.MeshBasicMaterial({color: 0xffffff})

    ];


    var secondFloor = new THREE.Mesh(new THREE.BoxGeometry(60, 1, 70), smallerPartInsideWall);
    secondFloor.position.set(10, 27.5, 0);

    scene.add(secondFloor);
}

function addSecondFloorRailing() {


    for (var numStairs = 0; numStairs < 34; numStairs += 2) {

        var railing = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 10, 16), woodMaterial);
        railing.position.set(39, 32.5, 34 - numStairs * 1.96);
        scene.add(railing);
    }
    var railing = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 64), woodMaterial);
    railing.position.set(39, 37.5, 2.5);
    scene.add(railing);
}

function addBed() {

    var length = 15, width = 1;

    var shape = new THREE.Shape();
    shape.moveTo(0, 5);
    shape.lineTo(0, width);
    shape.lineTo(length, width);
    shape.lineTo(length, 0);
    shape.lineTo(0, 0);

    var extrudeSettings = {
        steps: 2,
        amount: 16,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 3
    };

    var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);
    loader.load('images/bed.jpg', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(0.1, 0.1);

        var material = new THREE.MeshLambertMaterial({map: texture, overdraw: 1});
        var bed = new THREE.Mesh(geometry, material);
        bed.position.set(15, 29, -33);
        bed.rotation.y = -0.5 * Math.PI;
        scene.add(bed);

    });

    addNightShelf(-3.5, true);
    addNightShelf(21.5, false);
}


function Lamp(isOn, isTop, isLeft) {
    this.isOn = isOn;
    this.isTop = isTop;
    this.isLeft = isLeft;
}

function addNightShelf(x, lampIsLeft) {


    var length = 5, width = 3;

    var shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, width);
    shape.lineTo(length, width);
    shape.lineTo(length, 0);
    shape.lineTo(0, 0);

    var extrudeSettings = {
        steps: 2,
        amount: 4,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 1,
        bevelSegments: 3
    };

    var geometry = new THREE.ExtrudeBufferGeometry(shape, extrudeSettings);

    var bed = new THREE.Mesh(geometry, woodMaterial);
    bed.position.set(x, 29, -32);
    bed.rotation.y = -0.5 * Math.PI;
    scene.add(bed);


    //lamps for the night shelf
    var lamp = new THREE.Mesh(smallerLampGeometry, lampOffMaterial);
    lamp.position.set(x - 2, 38, -30);
    lamp.userData = new Lamp(false, true, lampIsLeft);
    scene.add(lamp);

    //lamp holders


    var path = new CustomSinCurve(2);
    var lampHolderGeometry = new THREE.TubeBufferGeometry(path, 20, 0.3, 3, false);

    var lampHolder = new THREE.Mesh(lampHolderGeometry, lampOffMaterial);
    lampHolder.position.set(x - 2, 38, -32.5);
    lampHolder.rotation.y += 0.5 * Math.PI;
    lampHolder.rotation.z += 0.8 * Math.PI;

    scene.add(lampHolder);

}


CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
CustomSinCurve.prototype.constructor = CustomSinCurve;

function CustomSinCurve(scale) {
    THREE.Curve.call(this);
    this.scale = ( scale === undefined ) ? 1 : scale;
}


CustomSinCurve.prototype.getPoint = function (t) {

    var tx = t * 3 - 1.5;
    var ty = Math.sin(2 * Math.PI * t);
    var tz = 0;

    return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);
};


//mirror
var cubeCamera = new THREE.CubeCamera(1, 100000, 256);
scene.add(cubeCamera);

cubeCamera.needsUpdate = true;
// Create car
var chromeMaterial = new THREE.MeshPhongMaterial({color: 0xffffff, envMap: cubeCamera.renderTarget});
var mirror = new THREE.Mesh(new THREE.BoxGeometry(32, 12, 0.1), chromeMaterial);
mirror.userData = new Mirror(false);

function Mirror(isRendering) {
    this.isRendering = isRendering;
}

mirror.position.set(5, 42, 34.5);
scene.add(mirror);


