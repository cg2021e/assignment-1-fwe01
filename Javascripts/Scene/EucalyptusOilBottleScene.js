import {Vector3} from "../Geometries/Vector3.js";
import Geometry from "../Geometries/Geometry.js";
import {Scene} from "./Scene.js";
import {EucalyptusOilBottle} from "../GeometryObject/EucalyptusOilBottle.js";

export class EucalyptusOilBottleScene extends Scene {
    constructor(canvas) {
        super(canvas);
        this._initGeometries();
        this.addY = 0.0016;
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
                new Vector3(-90, 0, 0),
            );
        this.addGeometry(this.left_bottle);
        this.addGeometry(this.right_bottle);
    }

    _onMouseClick() {
        Geometry.randomColor = !Geometry.randomColor;
        this._initColorsBuffer();
        this._bindColorBuffer();
    }

    animate() {
        let startTime = new Date();
        this._update();
        this._render();
        let endTime = new Date();
        let timeDiff = endTime - startTime;
        // console.log(timeDiff);
    }

    _update() {
        let right_bottle_position = this.right_bottle.position;
        if (right_bottle_position.y > 0.45 || right_bottle_position.y < -0.05) {
            this.addY *= -1;
        }
        // this.right_bottle.translate(new Vector3(0, this.addY, 0));
        // this._initVerticesBuffer();
        // this._bindVertexBuffer();
    }
}