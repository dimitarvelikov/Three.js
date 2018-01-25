var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2(),
    mouseClick = new THREE.Vector2();

window.addEventListener("mousemove", onDocumentMouseMove, false);
window.addEventListener("click", onDocumentClick, false);


function onDocumentMouseMove(event) {
    mouse.x = event.clientX / window.innerWidth * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

animate();

//click handler
function onDocumentClick(event) {

    mouseClick.x = event.clientX / window.innerWidth * 2 - 1;
    mouseClick.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // figure out which objects in the scene were clicked
    raycaster.setFromCamera(mouseClick, camera);
    var intersects = raycaster.intersectObjects(scene.children, false);

    var clickedObjectRef = intersects[0].object; //reference to the clicked object less code

    if (clickedObjectRef.userData instanceof Door && !clickedObjectRef.userData.isOpen) {
        openDoor(clickedObjectRef);
    }

    else if (clickedObjectRef.userData instanceof Lamp) {
        extractUserData(clickedObjectRef);
    }

    else if (clickedObjectRef.userData instanceof Mirror) {
        if (showMirror == false) {
            showMirror = true;
            mirror.material = chromeMaterial;
        } else {
            showMirror = false;
            mirror.material = new THREE.MeshPhongMaterial({color: 0x000000});
        }
    }
    else if (clickedObjectRef.userData instanceof OutDoorLamp) {
        if (clickedObjectRef.userData.isFront) {
            if (clickedObjectRef.userData.isLeft) {
                if (clickedObjectRef.userData.isOn) {
                    scene.remove(frontLeftLight);
                    clickedObjectRef.userData.isOn = false;
                    clickedObjectRef.material = lampOffMaterial;
                }
                else {
                    scene.add(frontLeftLight);
                    clickedObjectRef.userData.isOn = true;
                    clickedObjectRef.material = lampOnMaterial;
                }
            }
            else {
                if (clickedObjectRef.userData.isOn) {
                    scene.remove(frontRightLight);
                    clickedObjectRef.userData.isOn = false;
                    clickedObjectRef.material = lampOffMaterial;
                }
                else {
                    scene.add(frontRightLight);
                    clickedObjectRef.userData.isOn = true;
                    clickedObjectRef.material = lampOnMaterial;
                }
            }
        }
        else {
            if (clickedObjectRef.userData.isLeft) {
                if (clickedObjectRef.userData.isOn) {
                    scene.remove(backLeftLight);
                    clickedObjectRef.userData.isOn = false;
                    clickedObjectRef.material = lampOffMaterial;
                }
                else {
                    scene.add(backLeftLight);
                    clickedObjectRef.userData.isOn = true;
                    clickedObjectRef.material = lampOnMaterial;
                }
            }
            else {

                if (clickedObjectRef.userData.isOn) {
                    scene.remove(backRightLight);
                    clickedObjectRef.userData.isOn = false;
                    clickedObjectRef.material = lampOffMaterial;
                }
                else {
                    scene.add(backRightLight);
                    clickedObjectRef.userData.isOn = true;
                    clickedObjectRef.material = lampOnMaterial;
                }
            }
        }
    }
    else if (clickedObjectRef.userData instanceof ClothesCabinet) {
        console.log('clicked' + clickedObjectRef.userData.zAxis);
        var z = 0;
        var max_right=27;
        var max_left=12;

        z = Math.floor((Math.random() * 5)+1);

       // console.log("z is: " + z);
        if (clickedObjectRef.userData.zAxis + z < max_right){// && clickedObjectRef.userData.zAxis + z < 29 ) {
            clickedObjectRef.userData.zAxis += z;
            clickedObjectRef.position.z += z;
      //      console.log("right");
        }

        else if (clickedObjectRef.userData.zAxis - z > max_left){//} && clickedObjectRef.userData.zAxis + z < max_right) {
            clickedObjectRef.userData.zAxis -= z;
            clickedObjectRef.position.z -= z;
          //  console.log("left");
        }
    }
    render();
}

function openDoor(door) {
    if (door.userData.hasLight) {
        scene.add(roomLight);//add light when the door is opened
        lightingSource.material = lampOnMaterial;
        lightingSource.userData.isOn = true;
    }
    door.userData.isOpen = true;
    door.translateZ(-4);
    door.translateX(-5);
    new TWEEN.Tween(door.rotation).easing(TWEEN.Easing.Linear.None).to(
        {
            y: 0.5 * Math.PI,//rotation
        },
        400 //animation time
    )
        .start();
}

function extractUserData(clickedObj) {

    if (clickedObj.userData.isTop) {

        if (clickedObj.userData.isLeft) {
            swLights(clickedObj, secondFloorLightL);
        } else {
            swLights(clickedObj, secondFloorLightR);
        }
    }
    else {
        swLights(clickedObj, roomLight);
    }
}

function swLights(clickedObject, light) {
    if (clickedObject.userData.isOn) {
        clickedObject.userData.isOn = false;
        scene.remove(light);
        lightingSource.material = lampOffMaterial;
    }
    else {
        clickedObject.userData.isOn = true;
        scene.add(light);
        lightingSource.material = lampOnMaterial;
    }
    render();
}


function animate(time) {
    // let Tween engine know it is time to animate stuff
    TWEEN.update(time);
    render();
    // request the next frame to draw in a (time) milliseconds
    requestAnimationFrame(animate);
}


