import {EucalyptusOilBottleScene} from "./Scene/EucalyptusOilBottleScene.js";

window.onload = startCanvas();

function startCanvas() {
    drawBottle();
}

function drawBottle() {
    let canvas = document.getElementById('myCanvas');
    let scene = new EucalyptusOilBottleScene(canvas);

    scene.start();
    animate();

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onMouseDown, false);
    document.addEventListener("mouseup", onMouseUp, false);
    document.addEventListener("mousemove", onMouseMove, false);

    function animate() {
        scene.animate()
        requestAnimationFrame(animate);
    }

    function onKeyDown(event) {
        scene._onKeyDown(event)
    }

    function onMouseDown(event) {
        scene._onMouseDown(event)
    }

    function onMouseUp(event) {
        scene._onMouseUp(event)
    }

    function onMouseMove(event) {
        scene._onMouseMove(event)
    }
}
