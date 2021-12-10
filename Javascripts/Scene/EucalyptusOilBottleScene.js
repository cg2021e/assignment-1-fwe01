import {Vector3} from "../Geometries/Vector3.js";
import {Scene} from "./Scene.js";
import {EucalyptusOilBottle} from "../GeometryObject/EucalyptusOilBottle.js";
import {CubeLightSource} from "../Geometries/CubeLightSource.js";
import {Color} from "../Geometries/Color.js";
import {Plane} from "../Geometries/Plane.js";

export class EucalyptusOilBottleScene extends Scene {
    movementSpeed = 0.05;

    constructor(canvas) {
        super(canvas);
        this._initGeometries();
        this.moveCubeAway = false;
        this.moveCubeCloser = false;
        this.moveCubeLeft = false;
        this.moveCubeRight = false;
        this.rotateWorld = false;
        this.zoomIn = false;
        this.zoomOut = false;
        this.cameraLeft = false;
        this.cameraRight = false;
        this.turnLightsOff = false;
        this.lastPointOnTrackBall = null;
        this.currentPointOnTrackBall = null;
        this.lastQuat = glMatrix.quat.create();
        this.dragging = false;
        this.rotation = glMatrix.mat4.create();
    }

    _initGeometries() {
        this.left_bottle =
            new EucalyptusOilBottle(
                new Vector3(-1, 0, 0),
                8,
                new Vector3(0, -65, -90),
            );
        this.right_bottle =
            new EucalyptusOilBottle(
                new Vector3(1, 0, 0),
                150,
                new Vector3(-90, -45, 0),
            );
        this.lightsource_cube =
            new CubeLightSource(
                new Vector3(0.0, 0, 0.0),
                0.25,
                new Color(1, 1, 1, 1.0),
                1,
            );
        let plane = new Plane(
            new Vector3(0.0, -1.5, 0.0),
            20,
            new Color(1 / 255, 92 / 255, 22 / 255, 1.0),
            // new Color(1, 1, 1, 1.0),
            100,
        )
        this.addGeometry(this.left_bottle);
        this.addGeometry(this.right_bottle);
        this.addGeometry(this.lightsource_cube);
        this.addGeometry(plane);
    }

    _onKeyDown(event) {
        //W
        if (event.keyCode === 87) {
            this.moveCubeAway = true
        }
        //S
        if (event.keyCode === 83) {
            this.moveCubeCloser = true
        }
        //A
        if (event.keyCode === 65) {
            this.moveCubeLeft = true
        }
        //D
        if (event.keyCode === 68) {
            this.moveCubeRight = true
        }
        //keyUp
        if (event.keyCode === 38) {
            this.zoomIn = true
        }
        //keyDown
        if (event.keyCode === 40) {
            this.zoomOut = true
        }
        //keyLeft
        if (event.keyCode === 37) {
            this.cameraLeft = true
        }
        //keyRight
        if (event.keyCode === 39) {
            this.cameraRight = true
        }
        //Space
        if (event.keyCode === 32) {
            this.turnLightsOff = !this.turnLightsOff;
        }
    }

    animate() {
        this._render();
        this._update();
    }

    _update() {
        let vertexChanged = false;
        let viewChanged = false;

        if (this.turnLightsOff) {
            this.lightsOut = 1;
        } else {
            this.lightsOut = 0;
        }

        if (this.moveCubeCloser) {
            this.lightsource_cube.translate(new Vector3(0, 0, this.movementSpeed));
            this.lightSourcePosition[2] += this.movementSpeed
            this.moveCubeCloser = false
            vertexChanged = true;
        }
        if (this.moveCubeAway) {
            this.lightSourcePosition[2] -= this.movementSpeed
            this.lightsource_cube.translate(new Vector3(0, 0, -this.movementSpeed));
            this.moveCubeAway = false
            vertexChanged = true;
        }
        if (this.moveCubeLeft) {
            this.lightsource_cube.translate(new Vector3(-this.movementSpeed, 0, 0));
            this.lightSourcePosition[0] -= this.movementSpeed
            this.moveCubeLeft = false
            vertexChanged = true;
        }
        if (this.moveCubeRight) {
            this.lightsource_cube.translate(new Vector3(this.movementSpeed, 0, 0));
            this.lightSourcePosition[0] += this.movementSpeed
            this.moveCubeRight = false
            vertexChanged = true;
        }
        if (this.zoomIn) {
            if (this.cameraDistance > .25) {
                this.cameraDistance -= 0.01
            }
            this.zoomIn = false
            viewChanged = true;
        }
        if (this.zoomOut) {
            this.cameraDistance += 0.01
            this.zoomOut = false
            viewChanged = true;
        }
        if (this.cameraLeft) {
            this.cameraOrbit += 0.5
            this.cameraLeft = false
            viewChanged = true;
        }
        if (this.cameraRight) {
            this.cameraOrbit -= 0.5
            this.cameraRight = false
            viewChanged = true;
        }

        if (viewChanged) {
            this._initViewMatrix();
        }

        if (vertexChanged) {
            this._initVerticesBuffer();
            this._initNormalsBuffer();
            this._bindVertexBuffer();
            this._bindNormalBuffer();
        }

        this._bindUniforms();
    }

    _computeCurrentQuat() {
        // Secara berkala hitung quaternion rotasi setiap ada perubahan posisi titik pointer mouse
        var axisFromCrossProduct = glMatrix.vec3.cross(glMatrix.vec3.create(), this.lastPointOnTrackBall,this.currentPointOnTrackBall);
        var angleFromDotProduct = Math.acos(glMatrix.vec3.dot(this.lastPointOnTrackBall, this.currentPointOnTrackBall));
        var rotationQuat = glMatrix.quat.setAxisAngle(glMatrix.quat.create(), axisFromCrossProduct, angleFromDotProduct);
        glMatrix.quat.normalize(rotationQuat, rotationQuat);
        return glMatrix.quat.multiply(glMatrix.quat.create(), rotationQuat, this.lastQuat);
    }

    _getProjectionPointOnSurface(point) {
        var radius = this.canvas.width / 3;  // Jari-jari virtual trackball kita tentukan sebesar 1/3 lebar kanvas
        var center = glMatrix.vec3.fromValues(this.canvas.width / 2, this.canvas.height / 2, 0);  // Titik tengah virtual trackball
        var pointVector = glMatrix.vec3.subtract(glMatrix.vec3.create(), point, center);
        pointVector[1] = pointVector[1] * (-1); // Flip nilai y, karena koordinat piksel makin ke bawah makin besar
        var radius2 = radius * radius;
        var length2 = pointVector[0] * pointVector[0] + pointVector[1] * pointVector[1];
        if (length2 <= radius2) pointVector[2] = Math.sqrt(radius2 - length2); // Dapatkan nilai z melalui rumus Pytagoras
        else {  // Atur nilai z sebagai 0, lalu x dan y sebagai paduan Pytagoras yang membentuk sisi miring sepanjang radius
            pointVector[0] *= radius / Math.sqrt(length2);
            pointVector[1] *= radius / Math.sqrt(length2);
            pointVector[2] = 0;
        }
        return glMatrix.vec3.normalize(glMatrix.vec3.create(), pointVector);
    }

    _onMouseDown(event) {
        var x = event.clientX;
        var y = event.clientY;
        var rect = event.target.getBoundingClientRect();
        if (
            rect.left <= x &&
            rect.right >= x &&
            rect.top <= y &&
            rect.bottom >= y
        ) {
            this.dragging = true;
        }
        this.lastPointOnTrackBall = this._getProjectionPointOnSurface(glMatrix.vec3.fromValues(x, y, 0));
        this.currentPointOnTrackBall = this.lastPointOnTrackBall;
    }

    _onMouseUp(event) {
        this.dragging = false;
        if (this.currentPointOnTrackBall != this.lastPointOnTrackBall) {
            this.lastQuat = this._computeCurrentQuat();
        }
    }

    _onMouseMove(event) {
        if (this.dragging) {
            var x = event.clientX;
            var y = event.clientY;
            this.currentPointOnTrackBall = this._getProjectionPointOnSurface(glMatrix.vec3.fromValues(x, y, 0));
            glMatrix.mat4.fromQuat(this.rotation, this._computeCurrentQuat());
            this.rotationMatrix = this.rotation;
            this._bindUniforms();
        }
    }
}
