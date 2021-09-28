import Geometry from "./Geometry.js";
import {Vector3} from "./Vector3.js";

export class RegularPolygonPrism extends Geometry {
    constructor(position, height, numberOfVertice, lowerRadius, upperRadius = null) {
        super();
        this.position = position;
        this.numberOfVertice = numberOfVertice;
        this.height = height;
        this.lowerRadius = lowerRadius;
        if (upperRadius == null) {
            this.upperRadius = lowerRadius;
        } else {
            this.upperRadius = upperRadius;
        }
        this.initVertices();
        if (this.indices == null) {
            this.initIndices();
        }
    }

    initIndices() {
        this.indices = [];
        this.initUpperFaceIndices();
        this.initLowerFaceIndices();
        this.initSheetFaceIndices();
    }

    initUpperFaceIndices() {
        for (let vert = 1; vert < this.numberOfVertice; vert++) {
            this.addIndices([0, vert, vert + 1]);
        }
        //push last triangles
        this.addIndices([0, 1, this.numberOfVertice]);
    }

    initLowerFaceIndices() {
        for (let vert = 1; vert < this.numberOfVertice; vert++) {
            this.addIndices([this.numberOfVertice + 1, this.numberOfVertice + 1 + vert, this.numberOfVertice + 2 + vert]);
        }
        //push last triangle
        this.addIndices([
            this.numberOfVertice + 1,
            this.numberOfVertice + 2,
            2 * this.numberOfVertice + 1
        ])
    }

    initSheetFaceIndices() {
        for (let face = 1; face < this.numberOfVertice; face++) {
            //push first triangle
            this.addIndices([face, face + 1, this.numberOfVertice + 1 + face])
            //push second triangle
            this.addIndices([face + 1, this.numberOfVertice + 1 + face, this.numberOfVertice + 2 + face]);
        }
        //push last face
        this.addIndices([this.numberOfVertice, 1, 2 * this.numberOfVertice + 1]);
        this.addIndices([1, this.numberOfVertice + 2, 2 * this.numberOfVertice + 1]);
    }

    initVertices() {
        this.vertices = [];
        this.initUpperOctagonVertices();
        this.initLowerOctagonVertices();
    }

    initUpperOctagonVertices() {
        this.addVertex(
            new Vector3(
                this.position.x,
                this.position.y,
                this.position.z + this.height / 2
            )
        )

        for (let degree = 0.0; degree < 360.0; degree += 360.0 / this.numberOfVertice) {
            let cos = Math.cos(degree * Math.PI / 180.0);
            let sin = Math.sin(degree * Math.PI / 180.0);

            this.addVertex(
                new Vector3(
                    this.position.x + this.upperRadius * sin,
                    this.position.y + this.upperRadius * cos,
                    this.position.z + this.height / 2
                )
            )
        }
    }

    initLowerOctagonVertices() {
        this.addVertex(
            new Vector3(
                this.position.x,
                this.position.y,
                this.position.z - this.height / 2
            )
        )

        for (let degree = 0.0; degree < 360.0; degree += 360.0 / this.numberOfVertice) {
            let cos = Math.cos(degree * Math.PI / 180.0);
            let sin = Math.sin(degree * Math.PI / 180.0);

            this.addVertex(
                new Vector3(
                    this.position.x + this.lowerRadius * sin,
                    this.position.y + this.lowerRadius * cos,
                    this.position.z - this.height / 2
                )
            )
        }
    }
}
