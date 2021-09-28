import {RegularPolygonPrism} from "./RegularPolygonPrism.js";

export class Cylinder extends RegularPolygonPrism {
    static NUMBER_OF_VERTICE = 64;

    constructor(position, height, lowerRadius, upperRadius) {
        super(position, height, Cylinder.NUMBER_OF_VERTICE, lowerRadius, upperRadius);
    }
}
