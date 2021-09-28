export class Color {
    constructor(r, g, b, a) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    static convertArrayOfColorsToFloatArray(arrayOfColors) {
        let float_array = [];
        arrayOfColors.forEach(vertex => {
            float_array.push(...vertex.toArray())
        })
        return float_array;
    }

    toArray() {
        return [
            this.r,
            this.g,
            this.b,
            this.a
        ];
    }
}
