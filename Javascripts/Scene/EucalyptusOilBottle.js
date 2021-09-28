import {Cylinder} from "../Geometries/Cylinder.js";
import {Vector3} from "../Geometries/Vector3.js";
import {OctagonalPrism} from "../Geometries/OctagonalPrism.js";
import Geometry from "../Geometries/Geometry.js";
import {Scene} from "./Scene.js";

export class EucalyptusOilBottle extends Scene {
    constructor(canvas) {
        super(canvas);
        this._initGeometries();
    }

    _initGeometries() {
        this.geometries = [
            //Flap tutup
            new Cylinder(
                new Vector3(0, 0, 0.752),
                0.02,
                0.2875,
                0.220,
            ),
            new Cylinder(
                new Vector3(0, 0, 0.6845),
                0.115,
                0.2875
            ),
            //Lip di flap tutup
            new Cylinder(
                new Vector3(0.225, 0, 0.6445),
                0.02,
                0.0875
            ),
            //Transisi base tutup
            new Cylinder(
                new Vector3(0, 0, 0.602),
                0.05,
                0.2625,
                0.2875
            ),
            //Base tutup
            new Cylinder(
                new Vector3(0, 0, 0.49575),
                0.2625,
                0.2625
            ),
            //throat terkecil
            new Cylinder(
                new Vector3(0, 0, 0.356685),
                0.015625,
                0.225,
                0.2525,
            ),
            new Cylinder(
                new Vector3(0, 0, 0.3410635),
                0.015625,
                0.2325,
                0.225,
            ),
            //neck transisi
            new Cylinder(
                new Vector3(0, 0, 0.323875),
                0.01975,
                0.375,
                0.2575,
            ),
            //Body
            new Cylinder(
                new Vector3(0, 0, -0.035875),
                0.7,
                0.375
            ),
            //transis ke octagon
            //octagon
            new OctagonalPrism(
                new Vector3(0, 0, -0.735875),
                0.7,
                0.45,
                0.4125
            ),
            //baseplate
            new Cylinder(
                new Vector3(0, 0, -1.093525),
                0.02,
                0.454,
                0.44,
            ),
            new Cylinder(
                new Vector3(0, 0, -1.113525),
                0.02,
                0.44,
                0.454,
            ),
        ];
    }

    _onMouseClick() {
        Geometry.randomColor = !Geometry.randomColor;
        this._initColorsBuffer();
        this._bindAttributes();
    }

    animate() {
        this._update();
        this._render();
    }

    _update() {
        this.webGlUtils.rotateZ(this.movementMatrix, 0.002);
        this.webGlUtils.rotateY(this.movementMatrix, 0.002);
        this.webGlUtils.rotateX(this.movementMatrix, 0.002);
        this._bindUniforms();
    }
}