import Geometry from "./Geometry.js";
import {Vector3} from "./Vector3.js";

export class Plane extends Geometry {
    constructor(position, side, color,specular) {
        super(color);
        this.side = side;
        this.specular = specular;
        this.halfSide = side * 0.5;
        this.position = position;
        this.initVertices();
        this.initIndices()
        this.initNormals()
    }

    initVertices() {
        this.vertices = [];
        this.initUpperFaceVertices();
    }

    initUpperFaceVertices() {
        this.addVertex(new Vector3(this.position.x - this.halfSide, this.position.y, this.position.z + this.halfSide)) //A
        this.addVertex(new Vector3(this.position.x + this.halfSide, this.position.y, this.position.z + this.halfSide)) //B
        this.addVertex(new Vector3(this.position.x + this.halfSide, this.position.y, this.position.z - this.halfSide)) //C
        this.addVertex(new Vector3(this.position.x - this.halfSide, this.position.y, this.position.z - this.halfSide)) //D
    }

    initIndices() {
        this.indices = [];
        this.addIndices([0, 1, 2]); //A B C
        this.addIndices([0, 3, 2]); //A D C

    }

    initNormals() {
        this.normals = [];
        this.addNormals(new Vector3(0,1,0))
        this.addNormals(new Vector3(0,1,0))
    }

    getNormals() {
        this.faceNormals = [];
        for (let index = 0; index < this.indices.length; index++) {
            this.faceNormals.push(Vector3.copyVector3(this.normals[Math.floor(index / 3)]));
        }
        return this.faceNormals;
    }

    getSpecular() {
        let specular = Array(this.faceNormals.length).fill(this.specular)
        return specular;
    }
}
