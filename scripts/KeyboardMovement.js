function keyboardMovement() {
    var camSpeed = 8;
    document.addEventListener("keydown", onDocumentKeyDown, false);

    function onDocumentKeyDown(event) {
        var keyCode = event.which;
        if (keyCode == 87) {//W
            camera.position.x += camSpeed;
            ;//Math.sin(camera.rotation.y) * 0.2;

        } else if (keyCode == 83) {//S
            camera.position.x -= camSpeed;

        } else if (keyCode == 65) {
            camera.position.z -= camSpeed;
            console.log("65");
        } else if (keyCode == 68) {
            camera.position.z += camSpeed;


        } else if (keyCode == 37) { //left arrow
         //   camera.rotation.x -= 0.1;
        }
        else if (keyCode == 38) { //up arrow
            camera.rotation.y -= 0.1;
        }
        else if (keyCode == 39) { //right arrow
            //   camera.rotation.x +=0.1;

     //       camera.rotation.y += 5 * Math.PI / 180;
  ///          camera.rotation.z -= 5 * Math.PI / 180;
//
        }
        else if (keyCode == 40) { //down arrow
            camera.rotation.y += 0.1;
        }
        render(); //update camera
    };
}