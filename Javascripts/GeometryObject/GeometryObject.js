import Geometry from "../Geometries/Geometry.js";

export class GeometryObject extends Geometry {
    constructor(position, rotation = null) {
        super();
        this.geometries = [];
        this.position = position;
        this.rotation = rotation;
        if (rotation != null) {
            this._initRotationMatrix();
        }
    }

    addGeometry(geometry) {
        this.geometries.push(geometry);
    }

    getVertices() {
        let faceVertice = [];
        this.geometries.forEach((geometry) => {
            faceVertice.push(...geometry.getVertices())
        })
        if (this.rotation != null) {
            for (let vert = 0; vert < faceVertice.length; vert++) {
                let point = [faceVertice[vert].x - this.position.x, faceVertice[vert].y - this.position.y, faceVertice[vert].z - this.position.z];
                let result = math.multiply(this.rotation_matrix, point);
                result = math.add(result, this.position.toArray())
                faceVertice[vert].setX(result[0]);
                faceVertice[vert].setY(result[1]);
                faceVertice[vert].setZ(result[2]);
            }
        }
        return faceVertice;
    }

    getColors() {
        let colors = [];
        this.geometries.forEach((geometry) => {
            colors.push(...geometry.getColors())
        })
        return colors;
    }

    _initRotationMatrix() {
        let sin_gamma = Math.sin(this.rotation.x * Math.PI / 180.0);
        let cos_gamma = Math.cos(this.rotation.x * Math.PI / 180.0);
        let sin_beta = Math.sin(this.rotation.y * Math.PI / 180.0);
        let cos_beta = Math.cos(this.rotation.y * Math.PI / 180.0);
        let sin_alpha = Math.sin(this.rotation.z * Math.PI / 180.0);
        let cos_alpha = Math.cos(this.rotation.z * Math.PI / 180.0);
        this.rotation_matrix = [
            [cos_alpha * cos_beta, cos_alpha * sin_beta * sin_gamma - sin_alpha * cos_gamma, cos_alpha * sin_beta * cos_gamma + sin_alpha * sin_gamma],
            [sin_alpha * cos_beta, sin_alpha * sin_beta * sin_gamma + cos_alpha * cos_gamma, sin_alpha * sin_beta * cos_gamma - cos_alpha * sin_gamma],
            [-1 * sin_beta, cos_beta * sin_gamma, cos_beta * cos_gamma],
        ];
    }
}