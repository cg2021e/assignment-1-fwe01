import {BufferTypeEnum, DataTypeEnum, DrawModeEnum, ShaderTypeEnum, UsageTypeEnum, WebGLUtils} from "../WebGLUtils.js";
import {Vector3} from "../Geometries/Vector3.js";
import {Color} from "../Geometries/Color.js";

export class Scene {
    geometries = [];
    webGlUtils = null;
    projectionMatrix = null;
    viewMatrix = null;
    movementMatrix = null;
    vertices = null;
    colors = null;

    vertex_buffer = null;
    color_buffer = null;

    constructor(canvas) {
        this._initWebGlUtils(canvas);
        this._initProjectionMatrix();
        this._initViewMatrix();
        this._initMovementMatrix();
    }

    start() {
        this._initVerticesBuffer();
        this._initColorsBuffer();
        this._startProgram();
        this._bindAttributes();
        this._bindUniforms();

        this.animate();
    }

    addGeometry(geometry) {
        this.geometries.push(geometry);
    }

    _initWebGlUtils(canvas) {
        this.webGlUtils = new WebGLUtils(canvas);
    }

    _initProjectionMatrix() {
        this.projectionMatrix = this.webGlUtils.getProjection(30, 1, 10);
    }

    _initViewMatrix() {
        this.viewMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
        this.viewMatrix[14] = this.viewMatrix[14] - 5;
    }

    _initMovementMatrix() {
        this.movementMatrix = [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
    }

    _initVerticesBuffer() {
        this.vertices = [];
        for (let geometry = 0; geometry < this.geometries.length; geometry++) {
            this.vertices.push(...this.geometries[geometry].getVertices());
        }
        let float_vertice = Vector3.convertArrayOfVector3ToFloatArray(this.vertices);
        this.vertex_buffer = this.webGlUtils.initBuffer(
            BufferTypeEnum.ARRAY,
            DataTypeEnum.FLOAT,
            float_vertice,
            UsageTypeEnum.STATIC
        );
    }

    _initColorsBuffer() {
        this.colors = [];
        this.geometries.forEach((geometry) => {
            this.colors.push(...geometry.getColors());
        });
        let float_color = Color.convertArrayOfColorsToFloatArray(this.colors);
        this.color_buffer = this.webGlUtils.initBuffer(
            BufferTypeEnum.ARRAY,
            DataTypeEnum.FLOAT,
            float_color,
            UsageTypeEnum.STATIC
        );
    }

    _startProgram() {
        let vertCode = this._getVertCode();
        let vertShader = this.webGlUtils.createShader(ShaderTypeEnum.VERTEX, vertCode);
        let fragCode = this._getFragCode();
        let fragShader = this.webGlUtils.createShader(ShaderTypeEnum.FRAGMENT, fragCode);
        this.webGlUtils.attachShader(vertShader);
        this.webGlUtils.attachShader(fragShader);
        this.webGlUtils.startProgram();
    }

    _getVertCode() {
        return 'attribute vec3 aCoordinates;' +
            'attribute vec4 aColor;' +
            'uniform mat4 uProjectionMatrix;' +
            'uniform mat4 uViewMatrix;' +
            'uniform mat4 uRotationMatrix;' +
            'varying vec4 vColor;' +
            'void main(void) {' +
            ' gl_Position = uProjectionMatrix * uViewMatrix * uRotationMatrix * vec4(aCoordinates, 1.0);' +
            ' gl_PointSize = 18.0;' +
            ' vColor = aColor;' +
            '}';
    }

    _getFragCode() {
        return 'varying mediump vec4 vColor;' +
            'void main(void) {' +
            ' gl_FragColor = vColor;' +
            '}';
    }

    _bindAttributes() {
        this._bindVertexBuffer();
        this._bindColorBuffer();
    }

    _bindVertexBuffer() {
        this.webGlUtils.bindAttributes(
            BufferTypeEnum.ARRAY,
            this.vertex_buffer,
            'aCoordinates',
            3,
            DataTypeEnum.FLOAT
        );
    }

    _bindColorBuffer() {
        this.webGlUtils.bindAttributes(
            BufferTypeEnum.ARRAY,
            this.color_buffer,
            'aColor',
            4,
            DataTypeEnum.FLOAT
        );
    }

    _bindUniforms() {
        this.webGlUtils.bindUniforms(
            'uProjectionMatrix',
            DataTypeEnum.FLOAT,
            this.projectionMatrix
        )
        this.webGlUtils.bindUniforms(
            'uViewMatrix',
            DataTypeEnum.FLOAT,
            this.viewMatrix
        )
        this.webGlUtils.bindUniforms(
            'uRotationMatrix',
            DataTypeEnum.FLOAT,
            this.movementMatrix
        )
    }

    animate() {
        this._render();
    }

    _render() {
        // webGlUtils.setBackgroundColor(0.5, 0.5, 0.5, 1.0);
        this.webGlUtils.enableDepthTest();
        this.webGlUtils.enableBlending();
        this.webGlUtils.drawArray(DrawModeEnum.TRIANGLES, 0, this.vertices.length)
    }
}