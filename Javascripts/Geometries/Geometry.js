import {Color} from "./Color.js";
import {Vector3} from "./Vector3.js";

export default class Geometry {
    static randomColor = true;
    color = new Color(0.3, 0.6, 0.1, 0.8);
    vertices = null;
    indices = null;

    getVertices() {
        let faceVertices = [];
        this.indices.forEach((value) => {
            faceVertices.push(Vector3.copyVector3(this.vertices[value]));
        })
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
