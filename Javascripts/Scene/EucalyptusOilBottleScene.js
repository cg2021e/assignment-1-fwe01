import {Vector3} from "../Geometries/Vector3.js";
import Geometry from "../Geometries/Geometry.js";
import {Scene} from "./Scene.js";
import {EucalyptusOilBottle} from "../GeometryObject/EucalyptusOilBottle.js";
import {CubeLightSource} from "../Geometries/CubeLightSource.js";
import {Color} from "../Geometries/Color.js";

export class EucalyptusOilBottleScene extends Scene {
    movementSpeed = 0.05;

    constructor(canvas) {
        super(canvas);
        this._initGeometries();
        this.addY = 0.0016;
        this.moveLightSourceUp = false;
        this.moveLightSourceDown = false;
        this.moveCameraLeft = false;
        this.moveCameraRight = false;
        this.rotateWorld = false;
    }

    _initGeometries() {
        this.left_bottle =
            new EucalyptusOilBottle(
                new Vector3(-1, 0, 0),
                new Vector3(0, -65, -90),
            );
        this.right_bottle =
            new EucalyptusOilBottle(
                new Vector3(1, 0, 0),
                new Vector3(-90, -45, 0),
            );
        this.lightsource_cube =
            new CubeLightSource(
                new Vector3(0.0, 0.0, 0.0),
                0.25,
                new Color(1, 1, 1, 1.0)
            );
        this.addGeometry(this.left_bottle);
        this.addGeometry(this.right_bottle);
        this.addGeometry(this.lightsource_cube);
    }

    _onMouseClick() {
        Geometry.randomColor = !Geometry.randomColor;
        this._initColorsBuffer();
        this._bindColorBuffer();
    }

    _onKeyDown(event) {
        //W
        if (event.keyCode === 87) {
            this.moveLightSourceUp = true
        }
        //S
        if (event.keyCode === 83) {
            this.moveLightSourceDown = true
        }
        //A
        if (event.keyCode === 65) {
            this.moveCameraLeft = true
        }
        //D
        if (event.keyCode === 68) {
            this.moveCameraRight = true
        }
        //Enter
        if (event.keyCode === 13) {
            this.rotateWorld = !this.rotateWorld;
        }
    }

    animate() {
        let startTime = new Date();
        this._update();
        this._render();
        let endTime = new Date();
        // let timeDiff = endTime - startTime;
        // console.log(timeDiff);
    }

    _update() {
        let vertexChanged = false;

        if (this.moveLightSourceUp) {
            this.lightsource_cube.translate(new Vector3(0, this.movementSpeed, 0));
            this.lightSourcePosition[1] += this.movementSpeed
            this.moveLightSourceUp = false
            vertexChanged = true;
        }
        if (this.moveLightSourceDown) {
            this.lightsource_cube.translate(new Vector3(0, -this.movementSpeed, 0));
            this.lightSourcePosition[1] -= this.movementSpeed
            this.moveLightSourceDown = false
            vertexChanged = true;
        }
        if (this.moveCameraLeft) {
            this.translateMatrix[0] -= 0.01
            this.moveCameraLeft = false
        }
        if (this.moveCameraRight) {
            this.translateMatrix[0] += 0.01
            this.moveCameraRight = false
        }

        if (vertexChanged) {
            this._initVerticesBuffer();
            this._bindVertexBuffer();
        }

        if (this.rotateWorld) {
            this.webGlUtils.rotateZ(this.movementMatrix, 0.002);
            this.webGlUtils.rotateY(this.movementMatrix, 0.002);
            this.webGlUtils.rotateX(this.movementMatrix, 0.002);
        }
        this._bindUniforms();
    }
}
