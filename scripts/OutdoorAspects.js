function addOutdoorAspects() {
    addFencing();
    addTerrace();
    addGrass();
    addHouseWalls()
    addPath();
    addDoors();
    addWindows();
    addOutdoorLamps();
}

var woodMaterial = new THREE.MeshLambertMaterial({map: loader.load('images/wood.jpg')});

function addWindows() {

    //front windows
    var windowGeometry = new THREE.BoxGeometry(0.1, 14, 15);
    var windowMaterial = new THREE.MeshPhongMaterial({color: 0x1BA1E2, opacity: 0.5, transparent: true});
    var windows = new THREE.Mesh(windowGeometry, windowMaterial);
    windows.position.set(-20, 12, -17);
    var windowsTop, windowsInsideBtm, windowsL, windowsInsideLeft;
    windowsL = new THREE.Mesh(new THREE.BoxGeometry(2, 15, 1), woodMaterial);
    windowsL.position.set(-20, 12, -25);

    windowsInsideLeft = windowsL.clone();
    windowsInsideLeft.position.set(-20, 12, -21);
    var windowsR = windowsInsideLeft.clone();
    windowsR.position.z += 12;
    windowsTop = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 15), woodMaterial);
    windowsTop.position.set(-20, 19, -17);

    windowsInsideBtm = windowsTop.clone();
    windowsInsideBtm.position.set(-20, 8.5, -17);

    var windowsBtm = windowsInsideBtm.clone();
    windowsBtm.position.y -= 3.5;

    var windowLeftGroup = new THREE.Group();
    windowLeftGroup.add(windows, windowsL, windowsInsideLeft, windowsR, windowsTop, windowsInsideBtm, windowsBtm);
    windowLeftGroup.position.z = -5;
    var windowRightGroup = windowLeftGroup.clone();
    windowRightGroup.position.set(0, 0, 40);
    var windowBtmGroup = new THREE.Group();
    windowBtmGroup.add(windowLeftGroup, windowRightGroup);
    var windowTopGroup = windowBtmGroup.clone();
    windowTopGroup.position.y += 30;
    scene.add(windowBtmGroup, windowTopGroup);

}

function addFencing() {

    loader.load('images/wall.jpg', function (texture) {
        var wallMaterial, wall, wall2, wall3, frontWall, frontWall2;
        wallMaterial = new THREE.MeshLambertMaterial({map: texture, overdraw: 1});
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(4, 1);

        wall = new THREE.Mesh(new THREE.BoxGeometry(200, 15, 3), wallMaterial);
        wall.position.set(15, 7.5, 100);

        wall2 = new THREE.Mesh(new THREE.BoxGeometry(200, 15, 3), wallMaterial);
        wall2.position.set(15, 7.5, -100);

        wall3 = new THREE.Mesh(new THREE.BoxGeometry(200, 15, 3), wallMaterial);
        wall3.position.set(113.5, 7.5, 0);
        wall3.rotation.y = -0.5 * Math.PI;
        //front left
        frontWall = new THREE.Mesh(new THREE.BoxGeometry(92, 15, 3), wallMaterial);
        frontWall.position.set(-85, 7.5, -55.5);
        frontWall.rotation.y = -0.5 * Math.PI;
        //front right
        frontWall2 = new THREE.Mesh(new THREE.BoxGeometry(92, 15, 3), wallMaterial);
        frontWall2.position.set(-85, 7.5, 55.5);
        frontWall2.rotation.y = -0.5 * Math.PI;


        scene.add(wall, wall2, wall3, frontWall, frontWall2);

    });
}

function addTerrace() {


    var terraceFloor = new THREE.Mesh(new THREE.BoxGeometry(20, 1, 70), woodMaterial);

    terraceFloor.position.set(-30, 27.5, 0);
    scene.add(terraceFloor);


    var left = false, right = false;
    for (var r = 0; r < 33; ++r) {
        var terraceRailing = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 6, 16), woodMaterial);
        if (r < 7 && left == false) {
            terraceRailing.position.set(-39 + r * 2.5, 31, -32);
            if (r == 6) {
                left = true;
                r = 0;
            }
        }
        else if (r > 26 && left == true || right == true) {
            left = false;
            right = true;
            terraceRailing.position.set(-39 + (r - 26) * 2.5, 31, 33);
        }
        else if (left == true) {

            terraceRailing.position.set(-39, 31, -32 + r * 2.5);
        }
        scene.add(terraceRailing);
    }
    var terraceRailingTop = new THREE.Mesh(new THREE.BoxGeometry(1.5, 0.5, 66), woodMaterial);
    terraceRailingTop.position.set(-39, 34, 0.5);

    var terraceRailingRight = new THREE.Mesh(new THREE.BoxGeometry(20, 0.5, 1.5), woodMaterial);
    terraceRailingRight.position.set(-29.75, 34, 33);

    var terraceRailingLeft = new THREE.Mesh(new THREE.BoxGeometry(20, 0.5, 1.5), woodMaterial);
    terraceRailingLeft.position.set(-29.75, 34, -32.25);

    scene.add(terraceRailingRight, terraceRailingLeft, terraceRailingTop);


}

function addGrass() {

    loader.load('images/grass.png', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(8, 8);
        var geometry = new THREE.PlaneBufferGeometry(220, 220, 10, 10);
        geometry.dynamic = true;
        var grass = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({
            map: texture,
            overdraw: 1
        }));
        grass.rotation.x = -0.5 * Math.PI;
        grass.position.set(15, -0.005, 0);
        scene.add(grass);
    });
}

function addPath() {

    loader.load('images/asphalt.png', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(8, 4);
        var asphalt = new THREE.Mesh(new THREE.PlaneBufferGeometry(65, 20, 1, 1)
            , new THREE.MeshLambertMaterial({map: texture, overdraw: 1}));
        asphalt.rotation.x = -0.5 * Math.PI;
        asphalt.position.set(-52.5, 0.02, 0);
        asphalt.receiveShadow = true;
        scene.add(asphalt);
    });
}

function addHouseWalls() {


    var roofMaterial = [
        new THREE.MeshPhongMaterial({
            map: loader.load("images/roof.jpg", function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping, texture.repeat.set(3, 3)
            })
        }),
        null,//this is the top face of the cylinder,but there is no top face
        new THREE.MeshPhongMaterial({
            map: loader.load("images/house.jpg", function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping, texture.repeat.set(10, 10)
            })
        })
    ];

    var roof = new THREE.Mesh(new THREE.CylinderGeometry(0, 65, 30, 4, 10), roofMaterial);
    roof.position.set(15, 68, 0);
    roof.rotation.y = -0.25 * Math.PI;
    scene.add(roof);


    loader.load('images/parquet.jpg', function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(3, 3);
        var geometry = new THREE.PlaneBufferGeometry(70, 70, 1, 1);
        var material = new THREE.MeshLambertMaterial({map: texture, overdraw: 1});
        var parquet = new THREE.Mesh(geometry, material);
        parquet.position.set(15, 0, 0);
        parquet.rotation.x = -0.5 * Math.PI;
        scene.add(parquet);

    });


    //backWall
    var backWall = new THREE.Mesh(new THREE.BoxGeometry(71, 53, 0.5), houseWallMaterial);
    backWall.position.set(50, 26.5, 0);
    backWall.rotation.set(0, -0.5 * Math.PI, 0);
    backWall.castShadow = false;

    //left wall
    var leftWall = new THREE.Mesh(new THREE.BoxGeometry(70, 53, 1), houseWallMaterial);
    leftWall.position.set(15, 26.5, -35);
    leftWall.receiveShadow = true;
    leftWall.position.set(15, 26.5, -35);

    //right wall
    var rightWall = leftWall.clone();
    rightWall.rotation.y += 1 * Math.PI;
    rightWall.position.z = 35;
    rightWall.receiveShadow = true;

    var midWallL = new THREE.Mesh(new THREE.BoxGeometry(29, 25, 0.5), insideWallsMaterial);
    midWallL.position.set(28, 40.5, 20);
    midWallL.rotation.set(0, -0.5 * Math.PI, 0);
    midWallL.receiveShadow = true;

    var midWallR = new THREE.Mesh(new THREE.BoxGeometry(29, 25, 0.5), insideWallsMaterial);
    midWallR.position.set(28, 40.5, -20);
    midWallR.rotation.set(0, -0.5 * Math.PI, 0);
    midWallR.receiveShadow = true;

    var midWallMid = new THREE.Mesh(new THREE.BoxGeometry(11, 9, 0.5), smallerPartInsideWall);
    midWallMid.position.set(28, 48.5, 0);
    midWallMid.rotation.set(0, -0.5 * Math.PI, 0);
    midWallMid.receiveShadow = true;


     scene.add(backWall, leftWall, rightWall, midWallL, midWallR, midWallMid);


    //////////////////////frontWall wall
    var frontMid = new THREE.Mesh(new THREE.BoxGeometry(1, 53, 9), getFrontWallMaterial(1, 6, 1, 6));

    frontMid.position.set(-20, 26.5, -9.5);
    var frontMid2 = frontMid.clone();
    frontMid2.position.z += 19.5;
    var frontMid3 = new THREE.Mesh(new THREE.BoxGeometry(1, 53, 5),
        getFrontWallMaterial(1, 6, 0.75, 6));
    frontMid3.position.set(-20, 26.5, -33);

    var frontMid4 = frontMid3.clone();
    frontMid4.position.z = 33.01;

    var frontMid5 = new THREE.Mesh(new THREE.BoxGeometry(1, 11, 10.5), getFrontWallMaterial(1, 1, 1, 1));
    frontMid5.position.set(-20, 21.5, 0.25);
    var frontMid6 = new THREE.Mesh(new THREE.BoxGeometry(1, 9, 10.5), getFrontWallMaterial(1, 1, 1, 1));
    frontMid6.position.set(-20, 48.5, 0.25);


    var frontMid8 = new THREE.Mesh(new THREE.BoxGeometry(1, 15, 17), getFrontWallMaterial(2, 2, 2, 2));
    frontMid8.position.set(-20, 27, -22.5);

    var frontMid9 = new THREE.Mesh(new THREE.BoxGeometry(1, 15, 17), getFrontWallMaterial(2, 2, 2, 2));


    frontMid9.position.set(-20, 27, 22.5);

    var frontMid10 = new THREE.Mesh(new THREE.BoxGeometry(1, 5, 17), getFrontWallMaterial(2, 0.5, 2, 0.5));
    frontMid10.position.set(-20, 2.5, -22.5);

    var frontMid11 = frontMid10.clone();
    frontMid11.position.z = 22.5;

    var frontMid12 = new THREE.Mesh(new THREE.BoxGeometry(1, 4, 17), getFrontWallMaterial(2, 0.5, 2, 0.5));
    frontMid12.position.set(-20, 51, -22.5);
    var frontMid13 = frontMid12.clone();
    frontMid13.position.z += 45;

    scene.add(frontMid, frontMid2, frontMid3, frontMid4, frontMid6, frontMid5,
        frontMid8, frontMid9,
        frontMid10, frontMid11, frontMid12, frontMid13);

}

function Door(isOpen, hasLight) {
    this.isOpen = isOpen;
    this.hasLight = hasLight;
}

function addDoors() {

    //door

    var door = new THREE.Mesh(new THREE.BoxGeometry(1, 15, 9), woodMaterial);
    door.position.set(-20, 7.5, 0);

    door.userData = new Door(false, true);


    var doorleft = new THREE.Mesh(new THREE.BoxGeometry(3, 15, 1), woodMaterial);
    doorleft.position.set(-20, 7.5, -5);

    var doorRight = doorleft.clone();
    doorRight.position.set(-20, 7.5, 5);

    var doorTop = new THREE.Mesh(new THREE.BoxGeometry(3, 1.5, 11), woodMaterial);
    doorTop.position.set(-20, 15.5, 0);

    var inFrontDoor = new THREE.Mesh(new THREE.PlaneBufferGeometry(5, 10, 1, 1), new THREE.MeshPhongMaterial({color: 0x000000}));
    inFrontDoor.position.set(-24, 0.2, 0);
    inFrontDoor.rotation.x = -0.5 * Math.PI;
    var btmDoorGroup = new THREE.Group();
    btmDoorGroup.add(doorleft, doorRight, doorTop);
    var topDoorGroup = btmDoorGroup.clone();
    topDoorGroup.position.y += 28;
    var insideDoor = topDoorGroup.clone();
    insideDoor.position.x = 48;


    var doorSecondFl = new THREE.Mesh(new THREE.BoxGeometry(1, 15, 9), woodMaterial);
    doorSecondFl.position.set(-20, 35.5, 0);
    doorSecondFl.userData = new Door(false, false);


    var doorSecondFlInside = new THREE.Mesh(new THREE.BoxGeometry(1, 15, 9), woodMaterial);
    doorSecondFlInside.position.set(28, 35.5, 0);
    doorSecondFlInside.userData = new Door(false, false);

    scene.add(btmDoorGroup, topDoorGroup, insideDoor, inFrontDoor, doorSecondFl, door, doorSecondFlInside);

}


function OutDoorLamp(isOn, isFront, isLeft) {
    this.isOn = isOn;
    this.isFront = isFront;
    this.isLeft = isLeft;
}

function addOutdoorLamps() {


    var frontLeftLamp = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 16, 16), new THREE.MeshLambertMaterial({color: 0x000000}));
    frontLeftLamp.position.set(-50, 8, -50);


    var frontRightLamp = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 16, 16), new THREE.MeshLambertMaterial({color: 0x000000}));
    frontRightLamp.position.set(-50, 8, 50);


    var backLeftLamp = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 16, 16), new THREE.MeshLambertMaterial({color: 0x000000}));
    backLeftLamp.position.set(70, 8, -60);


    var backRightLamp = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 16, 16), new THREE.MeshLambertMaterial({color: 0x000000}));
    backRightLamp.position.set(70, 8, 60);

    var spheregeometry = new THREE.SphereGeometry(5, 16, 16)

    var sphereFrontLeft = new THREE.Mesh(spheregeometry, lampOffMaterial);
    sphereFrontLeft.userData = new OutDoorLamp(false, true, true);
    sphereFrontLeft.position.set(-50, 20, -50);

    var sphereFrontRight = new THREE.Mesh(spheregeometry, lampOffMaterial);
    sphereFrontRight.userData = new OutDoorLamp(false, true, false);
    sphereFrontRight.position.set(-50, 20, 50);


    var sphereBackLeft = new THREE.Mesh(spheregeometry, lampOffMaterial);
    sphereBackLeft.userData = new OutDoorLamp(false, false, true);
    sphereBackLeft.position.set(70, 20, -60);

    var sphereBackRight = new THREE.Mesh(spheregeometry, lampOffMaterial);
    sphereBackRight.userData = new OutDoorLamp(false, false, false);
    sphereBackRight.position.set(70, 20, 60);


    scene.add(frontLeftLamp, frontRightLamp, backLeftLamp, backRightLamp,
        sphereFrontLeft, sphereFrontRight, sphereBackLeft, sphereBackRight);
}

///HOUSE WALL MATERIALS BELOW

var houseWallMaterial = [
    new THREE.MeshLambertMaterial({color: loader.load("images/house.jpg")}),
    new THREE.MeshLambertMaterial({color: loader.load("images/house.jpg")}),
    new THREE.MeshLambertMaterial({color: loader.load("images/house.jpg")}),
    new THREE.MeshLambertMaterial({color: loader.load("images/house.jpg")}),
    new THREE.MeshLambertMaterial({
        map: loader.load("images/wallpaper.jpg", function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(4, 4)
        })
    }),

    new THREE.MeshLambertMaterial({
        map: loader.load("images/house.jpg", function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(4, 4)
        })
    }),
];


///FRONT HOUSE WALL MATERIALS BELOW

function getFrontWallMaterial(i, i2, f, f2) {//i as inside, f as front
    return frontHouseWallMaterial = [
        new THREE.MeshPhongMaterial({
            map: loader.load("images/wallpaper.jpg", function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(i, i2)
            })
        }),
        new THREE.MeshPhongMaterial({
            map: loader.load("images/house.jpg", function (texture) {
                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.set(f, f2)
            })
        }),

        new THREE.MeshLambertMaterial({color: loader.load("images/house.jpg")}),
        new THREE.MeshLambertMaterial({color: loader.load("images/house.jpg")}),
        new THREE.MeshLambertMaterial({color: loader.load("images/house.jpg")}),
        new THREE.MeshLambertMaterial({color: loader.load("images/house.jpg")})
    ];
}


//walls inside only wallpaper

var insideWallsMaterial = [
    new THREE.MeshBasicMaterial({color: 0xffffff}),
    new THREE.MeshBasicMaterial({color: 0xffffff}),
    new THREE.MeshBasicMaterial({color: 0xffffff}),
    new THREE.MeshBasicMaterial({color: 0xffffff}),
    new THREE.MeshLambertMaterial({
        map: loader.load("images/wallpaper.jpg", function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 2)
        })
    }),

    new THREE.MeshLambertMaterial({
        map: loader.load("images/wallpaper.jpg", function (texture) {
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 2)
        })
    }),
];

//walls inside only wallpaper
//this material is set above the 2nd floor inside door

var smallerPartInsideWall = [
    new THREE.MeshBasicMaterial({color: 0xffffff}),
    new THREE.MeshBasicMaterial({color: 0xffffff}),
    new THREE.MeshBasicMaterial({color: 0xffffff}),
    new THREE.MeshBasicMaterial({color: 0xffffff}),
    new THREE.MeshLambertMaterial({map: loader.load("images/wallpaper.jpg")}),
    new THREE.MeshLambertMaterial({map: loader.load("images/wallpaper.jpg")}),
];








