import Geometry from "../Geometries/Geometry.js";

export class GeometryObject extends Geometry{
    geometries = [];
    constructor(position) {
        super();
        this.position = position;
    }

    addGeometry(geometry){
        this.geometries.push(geometry);
    }

    getVertices(){
        let faceVertice = [];
        this.geometries.forEach((geometry) =>{
            faceVertice.push(...geometry.getVertices())
        })
        return faceVertice;
    }

    getColors() {
        let colors = [];
        this.geometries.forEach((geometry) =>{
            colors.push(...geometry.getColors())
        })
        return colors;
    }
}