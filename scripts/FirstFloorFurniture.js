function furnishFirstFloor() {
    addSofa();
    addLighter();
    addTable();
    addChairs();
    addTVShelf();
    addBookShelf();
    addRailing();
    addVase();
    addGlasses();
}

function addSofa() {

    loader.load('images/sofaMaterial.jpg', function (texture) {
        var length = 1, width = 5;
        var shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.lineTo(0, width);
        shape.lineTo(length, width);
        shape.lineTo(length, 0);
        shape.lineTo(5, 0);

        var extrudeSettings = {
            steps: 8,
            amount: 20,
            bevelEnabled: true,
            bevelThickness: 2,
            bevelSize: 1,
            bevelSegments: 32
        };

        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);
        var geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        var material = new THREE.MeshLambertMaterial({map: texture, overdraw: 1});
        var sofa = new THREE.Mesh(geometry, material);
        sofa.position.set(17.5, 1, 30);
        sofa.rotation.z = +0.5 * Math.PI;
        sofa.rotation.y = -0.5 * Math.PI;
        scene.add(sofa);
    });
}

function addLighter() {
    //global variable
    lightingSource.position.set(10, 24.5, 0);
    lightingSource.userData = new Lamp(false, false, false);
    lightingSource.needsUpdate = true;
    scene.add(lightingSource);
}

function addTable() {

    ;
    //TABLE
    var tableBotGeometry = new THREE.CylinderGeometry(2, 2, 4, 32);
    var tableBot = new THREE.Mesh(tableBotGeometry, woodMaterial);
    tableBot.position.set(0, 2, 7);

    var tableTopGeometry = new THREE.CylinderGeometry(5, 5, 1, 32);
    var tabletTop = new THREE.Mesh(tableTopGeometry, woodMaterial);
    tabletTop.position.set(0, 4.5, 7);
    scene.add(tableBot, tabletTop);
}

function addChairs() {

    //chair
    var chairLegGeometry = new THREE.CylinderGeometry(0.25, 0.25, 3, 16);
    var chairLeg = new THREE.Mesh(chairLegGeometry, woodMaterial);
    chairLeg.position.set(0, 1.5, 0);

    var chairLeg2 = chairLeg.clone();
    chairLeg2.position.set(2, 1.5, 0);

    var chairBackLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 8, 16), woodMaterial);
    chairBackLeg.position.set(0, 4, -2.5);

    var chairBackLeg2 = chairBackLeg.clone();
    chairBackLeg2.position.set(2, 4, -2.5);

    var chairSeatGeometry = new THREE.BoxGeometry(2.5, 0.25, 2.5);
    var chairSeat = new THREE.Mesh(chairSeatGeometry, woodMaterial);
    chairSeat.position.set(1, 3, -1);

    var backPart = new THREE.Mesh(new THREE.BoxGeometry(2.5, 2.5, 0.25), woodMaterial);
    backPart.position.set(1, 6, -2.5);

    var chairGroup = new THREE.Group();
    chairGroup.add(chairLeg, chairLeg2, chairBackLeg, chairBackLeg2, chairSeat, backPart);

    var chairGroup2 = chairGroup.clone();


    chairGroup.position.set(1, 0, 13);
    chairGroup.rotateY(3.15);

    var twoChairsGroup = new THREE.Group();
    twoChairsGroup.add(chairGroup, chairGroup2);

    var moreChairs = twoChairsGroup.clone();
    moreChairs.rotateY(1.6);
    moreChairs.position.set(-6, 0, 8);
    scene.add(moreChairs, chairGroup, chairGroup2);
}

function addTVShelf() {
    tvScreenGeometry = new THREE.PlaneBufferGeometry(15.7,8.7,10,10);
    tvScreenGeometry.dynamic=true;
    var tvScreen = new THREE.Mesh(tvScreenGeometry,new THREE.MeshPhongMaterial({map: loader.load("images/tv_screen.png")}));
    tvScreen.position.set(15,11,-31.8);

    //TV shelf
    var shelf = new THREE.Mesh(new THREE.BoxGeometry(20, 5, 5), woodMaterial);
    shelf.position.set(15, 2.5, -32);
    scene.add(shelf);
    var tvMaterial = new THREE.MeshLambertMaterial({color: 0x000000});
    var tvTop = new THREE.Mesh(new THREE.BoxGeometry(16, 9, 0.2), tvMaterial);
    tvTop.position.set(15, 11, -32);

    var tvStand = new THREE.Mesh(new THREE.CylinderGeometry(0, 2.5, 2, 4, 1000), tvMaterial);
    tvStand.position.set(15, 6, -32);
    tvStand.rotation.y = -0.25 * Math.PI;
    scene.add(tvStand, tvTop,tvScreen);


}

function addBookShelf() {
    //book shelf
    var shelfBack, shelfTop, shelfBottom, shelfLeft, shelfRight, shelfMid;
    var shelfGroup = new THREE.Group();
    shelfBack = new THREE.Mesh(new THREE.BoxGeometry(0.1, 15, 30), woodMaterial);
    shelfBack.position.set(48, 7.5, -10);
    shelfTop = new THREE.Mesh(new THREE.BoxGeometry(2, 0.3, 30), woodMaterial);
    shelfTop.position.set(47, 15, -10);
    shelfBottom = shelfTop.clone();
    shelfBottom.position.set(47, 0.15, -10);
    shelfLeft = new THREE.Mesh(new THREE.BoxGeometry(2, 15.3, 0.3), woodMaterial);
    shelfLeft.position.set(47, 7.5, -25);
    shelfRight = shelfLeft.clone();
    shelfRight.position.set(47, 7.5, 5);
    shelfGroup.add(shelfBack, shelfTop, shelfLeft, shelfRight);


    for (var z = 0, x = 0; z < 3; ++z) {
        shelfMid = shelfTop.clone();
        shelfMid.position.set(47, 0.15 + z * 5.6, -10);
        shelfGroup.add(shelfMid);
        for (x = 0; x < 29; ++x) {

            var material = new THREE.MeshLambertMaterial({color: 0xC0C0C0});
            var book = new THREE.Mesh(new THREE.BoxGeometry(2, 3, 0.4), material);
            book.position.set(47, 2 + z * 5.5, -24 + x);
            shelfGroup.add(book);
        }
    }
    shelfGroup.position.set(-8, 0, -9.3);
    scene.add(shelfGroup);
}

function addRailing() {
    var decrease = 24;
    for (var numStairs = 0; numStairs < 27; numStairs += 2) {
        decrease--;

        decrease--;
        if (numStairs < 25) {
            var railing = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 10, 16), woodMaterial);
            railing.position.set(40.5, 6 + numStairs, -3 - numStairs + decrease);
            scene.add(railing);
        }
        var stair = new THREE.Mesh(new THREE.BoxGeometry(10, 2, 34 - numStairs + decrease), woodMaterial);
        stair.position.set(45, 1 + numStairs, -7 - numStairs);
        scene.add(stair);
    }
    var railingTopPart = new THREE.Mesh(new THREE.BoxGeometry(1, 0.5, 55), woodMaterial);
    railingTopPart.position.set(40.5, 23, -5);
    railingTopPart.rotation.x = 0.15 * Math.PI;
    scene.add(railingTopPart);
}

function addVase() {

    var ballGeo = new THREE.SphereGeometry(1.1, 32, 32);
    var material = new THREE.MeshPhongMaterial({map: loader.load("images/vase.jpg")});
    var ball = new THREE.Mesh(ballGeo, material);

    var pendulumGeo = new THREE.CylinderGeometry(1.2, 0.5, 2.2, 8);//,100,false ,0,2*Math.PI);

    ball.updateMatrix();
    pendulumGeo.merge(ball.geometry, ball.matrix);

    var pendulum = new THREE.Mesh(pendulumGeo, material);
    pendulum.position.set(0, 6.1, 7.25);

    scene.add(pendulum);
}

function addGlasses() {
    var geometry = new THREE.CylinderBufferGeometry(0.03, 0.03, 0.3, 20);//,100,false ,0,2*Math.PI);
    geometry.openEnded = true;
    var material = new THREE.MeshPhongMaterial({color: 0xc9dbdc, opacity: 0.6, transparent: true});
    var cylinder = new THREE.Mesh(geometry, material);
    cylinder.position.set(0, 5.65, 2);


    var glassBtm = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.03, 0.2, 0.05, 20), material);
    glassBtm.position.set(0, 5.5, 2);


    var glassTop = new THREE.Mesh(new THREE.CylinderBufferGeometry(0.25, 0.03, 0.2, 20), material);
    glassTop.position.set(0, 5.9, 2);
    var glassOne = new THREE.Group();
    glassOne.add(cylinder, glassTop, glassBtm);
    glassOne.position.set(0, -0.48, 1.5);//,1);
    var glassTwo = new THREE.Group();
    glassTwo = glassOne.clone();
    glassTwo.position.set(0, -0.48, 9);


    scene.add(glassOne, glassTwo);
}