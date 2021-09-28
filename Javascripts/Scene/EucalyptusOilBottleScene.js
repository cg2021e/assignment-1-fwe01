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
       this.addGeometry(
           new EucalyptusOilBottle(
               new Vector3(0.5, 0, 0)
           )
       );
        this.addGeometry(
            new EucalyptusOilBottle(
                new Vector3(-0.5, 0, 0)
            )
        );
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