import {GeometryObject} from "./GeometryObject.js";
import {Cylinder} from "../Geometries/Cylinder.js";
import {Vector3} from "../Geometries/Vector3.js";
import {OctagonalPrism} from "../Geometries/OctagonalPrism.js";
import {Color} from "../Geometries/Color.js";

export class EucalyptusOilBottle extends GeometryObject {
    static SOLID_GREEN = new Color(
        0.46374509803921568627450980392157,
        0.65198039215686274509803921568627,
        0.18139215686274509803921568627451,
        1
    )
    static SOLID_GREEN_SHADE = new Color(
        0.32549019607843137254901960784314,
        0.52549019607843137254901960784314,
        0.10980392156862745098039215686275,
        1
    )
    static TRANSPARENT_GREEN = new Color(
        0.41960784313725490196078431372549,
        0.57647058823529411764705882352941,
        0.1921568627450980392156862745098,
        0.90
    )
    static LABELS_RED = new Color(
        157 / 255,
        55 / 255,
        11 / 255,
        1
    )
    static LABELS_GREEN = new Color(
        125 / 255,
        177 / 255,
        63 / 255,
        1
    )

    constructor(position, rotation = null) {
        super(position, rotation);
        this._initGeometry();
    }

    _initGeometry() {
        this.geometries = [
            //Flap tutup
            new Cylinder(
                new Vector3(this.position.x, this.position.y, this.position.z + 0.752),
                0.02,
                EucalyptusOilBottle.SOLID_GREEN,
                0.2875,
                0.220,
            ),
            new Cylinder(
                new Vector3(this.position.x, this.position.y, this.position.z + 0.6845),
                0.115,
                EucalyptusOilBottle.SOLID_GREEN,
                0.2875
            ),
            //Lip di flap tutup
            new Cylinder(
                new Vector3(this.position.x + 0.225, this.position.y, this.position.z + 0.6445),
                0.02,
                EucalyptusOilBottle.SOLID_GREEN_SHADE,
                0.0875
            ),
            //Transisi base tutup
            new Cylinder(
                new Vector3(this.position.x, this.position.y, this.position.z + 0.602),
                0.05,
                EucalyptusOilBottle.SOLID_GREEN_SHADE,
                0.2625,
                0.2875
            ),
            //Base tutup
            new Cylinder(
                new Vector3(this.position.x, this.position.y, this.position.z + 0.49575),
                0.2625,
                EucalyptusOilBottle.SOLID_GREEN,
                0.2625
            ),
            //throat terkecil
            new Cylinder(
                new Vector3(this.position.x, this.position.y, this.position.z + 0.356685),
                0.015625,
                EucalyptusOilBottle.SOLID_GREEN_SHADE,
                0.225,
                0.2525,
            ),
            new Cylinder(
                new Vector3(this.position.x, this.position.y, this.position.z + 0.3410635),
                0.015625,
                EucalyptusOilBottle.SOLID_GREEN_SHADE,
                0.2325,
                0.225,
            ),
            //neck transisi
            new Cylinder(
                new Vector3(this.position.x, this.position.y, this.position.z + 0.323875),
                0.01975,
                EucalyptusOilBottle.TRANSPARENT_GREEN,
                0.375,
                0.2575,
            ),
            //Body
            new Cylinder(
                new Vector3(this.position.x, this.position.y, this.position.z + 0.264125),
                0.1,
                EucalyptusOilBottle.TRANSPARENT_GREEN,
                0.375
            ),
            new Cylinder(
                new Vector3(this.position.x, this.position.y, this.position.z + 0.014125),
                0.4,
                EucalyptusOilBottle.LABELS_GREEN,
                0.375
            ),
            new Cylinder(
                new Vector3(this.position.x, this.position.y, this.position.z - 0.285875),
                0.2,
                EucalyptusOilBottle.LABELS_RED,
                0.375
            ),
            //octagon
            new OctagonalPrism(
                new Vector3(this.position.x, this.position.y, this.position.z + -0.735875),
                0.7,
                EucalyptusOilBottle.TRANSPARENT_GREEN,
                0.45,
                0.4125
            ),
            //baseplate
            new Cylinder(
                new Vector3(this.position.x, this.position.y, this.position.z + -1.093525),
                0.02,
                EucalyptusOilBottle.SOLID_GREEN_SHADE,
                0.464,
                0.454,
            ),
            new Cylinder(
                new Vector3(this.position.x, this.position.y, this.position.z + -1.113525),
                0.02,
                EucalyptusOilBottle.SOLID_GREEN_SHADE,
                0.454,
                0.464,
            ),
        ];
    }
}