import {Vector3} from "../Geometries/Vector3.js";
import {Scene} from "./Scene.js";
import {EucalyptusOilBottle} from "../GeometryObject/EucalyptusOilBottle.js";
import {CubeLightSource} from "../Geometries/CubeLightSource.js";
import {Color} from "../Geometries/Color.js";
import {Plane} from "../Geometries/Plane.js";

export class EucalyptusOilBottleScene extends Scene {
    movementSpeed = 0.05;

    constructor(canvas) {
        super(canvas);
        this._initGeometries();
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
                8,
                new Vector3(0, -65, -90),
            );
        this.right_bottle =
            new EucalyptusOilBottle(
                new Vector3(1, 0, 0),
                150,
                new Vector3(-90, -45, 0),
            );
        this.lightsource_cube =
            new CubeLightSource(
                new Vector3(0.0, 0, 0.0),
                0.25,
                new Color(1, 1, 1, 1.0),
                1,
            );
        let plane = new Plane(
            new Vector3(0.0, -1.5, 0.0),
            20,
            new Color(1, 92, 22, 1.0),
            1,
        )
        this.addGeometry(this.left_bottle);
        this.addGeometry(this.right_bottle);
        this.addGeometry(this.lightsource_cube);
        this.addGeometry(plane);
    }


    animate() {
        let startTime = new Date();
        this._render();
        let endTime = new Date();
    }
}
