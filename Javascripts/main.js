import {EucalyptusOilBottle} from "./Scene/EucalyptusOilBottle.js";

window.onload = startCanvas();

function startCanvas() {
    drawBottle();
}

function drawBottle() {
    let canvas = document.getElementById('myCanvasBox');
    let scene = new EucalyptusOilBottle(canvas);

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
