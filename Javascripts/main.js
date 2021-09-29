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

    function animate() {
        scene.animate()
        requestAnimationFrame(animate);
    }
}
