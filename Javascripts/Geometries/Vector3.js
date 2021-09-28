export class Vector3 {
    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    static convertArrayOfVector3ToFloatArray(arrayOfVector3) {
        let float_array = [];
        arrayOfVector3.forEach(vector3 => {
            float_array.push(...vector3.toArray())
        })
        return float_array;
    }

    toArray() {
        return [
            this.x,
            this.y,
            this.z
        ];
    }
}
