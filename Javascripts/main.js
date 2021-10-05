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

    document.addEventListener("click", onMouseClick);

    function animate() {
        scene.animate()
        requestAnimationFrame(animate);
    }

    function onMouseClick() {
        scene._onMouseClick()
    }
}
