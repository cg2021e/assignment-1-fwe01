import {Vector3} from "../Geometries/Vector3.js";
import Geometry from "../Geometries/Geometry.js";
import {Scene} from "./Scene.js";
import {EucalyptusOilBottle} from "../GeometryObject/EucalyptusOilBottle.js";

export class EucalyptusOilBottleScene extends Scene {
    constructor(canvas) {
        super(canvas);
        this._initGeometries();
    }

    _initGeometries() {
        this.left_bottle =
            new EucalyptusOilBottle(
                new Vector3(-1, 0, 0),
                new Vector3(-90, 0, 0),
            );
        this.right_bottle =
            new EucalyptusOilBottle(
                new Vector3(1, 0, 0),
                new Vector3(-90, 0, 0),
            );
        this.addGeometry(this.left_bottle);
        this.addGeometry(this.right_bottle);
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
        this.right_bottle.translate(new Vector3(0, 0.0016, 0));
        this._initVerticesBuffer();
        this._bindAttributes();
    }
}