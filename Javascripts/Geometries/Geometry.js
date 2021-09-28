import {Color} from "./Color.js";
import {Vector3} from "./Vector3.js";

export default class Geometry {
    static randomColor = false;
    vertices = null;
    indices = null;

    constructor(color) {
        this.color = color;
    }

    getVertices() {
        let faceVertices = [];
        for (let index = 0; index < this.indices.length; index++) {
            faceVertices.push(Vector3.copyVector3(this.vertices[this.indices[index]]));
        }
        return faceVertices;
    }

    getColors() {
        let colors = [];
        this.indices.forEach((value) => {
            if (Geometry.randomColor) {
                colors.push(
                    new Color(
                        Math.random(),
                        Math.random(),
                        Math.random(),
                        0.8
                    )
                )
            } else {
                colors.push(this.color);
            }
        });
        return colors;
    }

    addVertex(vertex) {
        this.vertices.push(vertex);
    }

    addVertices(vertices) {
        this.vertices.push(...vertices);
    }

    addIndex(index) {
        this.indices.push(index);
    }

    addIndices(indices) {
        this.indices.push(...indices);
    }
}
