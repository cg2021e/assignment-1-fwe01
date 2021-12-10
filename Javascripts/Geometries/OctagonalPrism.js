import {RegularPolygonPrism} from "./RegularPolygonPrism.js";

export class OctagonalPrism extends RegularPolygonPrism {
    static NUMBER_OF_VERTICE = 8;

    constructor(position, height, color, lowerRadius, upperRadius) {
        super(position, height, OctagonalPrism.NUMBER_OF_VERTICE, color, lowerRadius, upperRadius);
    }
}
