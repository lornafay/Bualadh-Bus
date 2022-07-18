var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Component, removeClass } from '@syncfusion/ej2-base';
import { EventHandler, isNullOrUndefined } from '@syncfusion/ej2-base';
var SignatureBase = /** @class */ (function (_super) {
    __extends(SignatureBase, _super);
    function SignatureBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /* minDistance(distance between the two point) was calaculated for smoothness.*/
        _this.minDistance = 5;
        _this.previous = 0;
        /* interval handles for the smoothness in the mouse move event.*/
        _this.interval = 30;
        _this.timeout = null;
        _this.isSignatureEmpty = true;
        _this.backgroundLoaded = null;
        _this.clearArray = [];
        _this.isBlazor = false;
        _this.isResponsive = false;
        return _this;
    }
    /**
     * To Initialize the component rendering
     *
     * @private
     * @param {HTMLCanvasElement} element - Specifies the canvas element.
     * @param {BlazorDotnetObject} dotnetRef - Specifies for blazor client to server communication.
     * @returns {void}
     */
    SignatureBase.prototype.initialize = function (element, dotnetRef) {
        this.element = element;
        this.canvasContext = this.element.getContext('2d');
        this.canvasContext.canvas.tabIndex = 0;
        if (dotnetRef) {
            this.dotnetRef = dotnetRef;
            this.isBlazor = true;
            if (this.signatureValue) {
                this.loadPersistedSignature();
            }
        }
        this.setHTMLProperties();
        if (isNullOrUndefined(this.signatureValue)) {
            this.updateSnapCollection(true);
        }
        this.wireEvents();
        if (!this.isBlazor) {
            this.trigger('created', null);
        }
    };
    SignatureBase.prototype.wireEvents = function () {
        if (isNullOrUndefined(this.pointColl) && !this.isReadOnly && !this.disabled) {
            EventHandler.add(this.canvasContext.canvas, 'mousedown touchstart', this.mouseDownHandler, this);
            EventHandler.add(this.canvasContext.canvas, 'keydown', this.keyboardHandler, this);
            window.addEventListener('resize', this.resizeHandler.bind(this));
        }
        else if (this.pointColl) {
            EventHandler.add(this.canvasContext.canvas, 'mousemove touchmove', this.mouseMoveHandler, this);
            EventHandler.add(this.canvasContext.canvas, 'mouseup touchend', this.mouseUpHandler, this);
            EventHandler.add(document, 'mouseup', this.mouseUpHandler, this);
        }
    };
    SignatureBase.prototype.unwireEvents = function (type) {
        if (type === 'mouseup' || type === 'touchend') {
            EventHandler.remove(this.canvasContext.canvas, 'mousemove touchmove', this.mouseMoveHandler);
            EventHandler.remove(this.canvasContext.canvas, 'mouseup touchend', this.mouseUpHandler);
            EventHandler.remove(document, 'mouseup', this.mouseUpHandler);
        }
        else {
            EventHandler.remove(this.canvasContext.canvas, 'mousedown touchstart', this.mouseDownHandler);
            EventHandler.remove(this.canvasContext.canvas, 'keydown', this.keyboardHandler);
            window.removeEventListener('resize', this.resizeHandler);
        }
    };
    SignatureBase.prototype.setHTMLProperties = function () {
        if (this.element.height === 150 && this.element.width === 300) {
            this.element.height = this.element.offsetHeight;
            this.element.width = this.element.offsetWidth;
            this.isResponsive = true;
        }
        this.canvasContext.scale(1, 1);
        this.canvasContext.fillStyle = this.strokeColor;
        if (this.backgroundImage) {
            this.canvasContext.canvas.style.backgroundImage = 'url(' + this.backgroundImage + ')';
            this.canvasContext.canvas.style.backgroundRepeat = "no-repeat";
        }
        else if (this.backgroundColor) {
            this.canvasContext.canvas.style.backgroundColor = this.backgroundColor;
        }
    };
    SignatureBase.prototype.mouseDownHandler = function (e) {
        if (e.buttons === 1 || e.buttons === 2 || e.type === 'touchstart') {
            if (e.type === 'touchstart') {
                e.preventDefault();
                e.stopPropagation();
            }
            this.beginStroke(e);
            this.wireEvents();
        }
    };
    SignatureBase.prototype.mouseMoveHandler = function (e) {
        if (e.buttons === 1 || e.buttons === 2 || e.type === 'touchmove') {
            if (e.type === 'touchmove') {
                e.preventDefault();
                e.stopPropagation();
            }
            if (this.interval) {
                this.updateStrokeWithThrottle(e);
            }
            else {
                this.updateStroke(e);
            }
        }
    };
    SignatureBase.prototype.mouseUpHandler = function (e) {
        var args = { actionName: 'strokeUpdate' };
        if (e.type === 'touchstart') {
            e.preventDefault();
            e.stopPropagation();
        }
        this.endDraw();
        this.updateSnapCollection();
        this.unwireEvents(e.type);
        if (!this.isBlazor) {
            this.trigger('change', args);
        }
        else {
            this.dotnetRef.invokeMethodAsync('TriggerEventAsync', 'mouseUp');
        }
        this.signatureValue = this.snapColl[this.incStep];
    };
    SignatureBase.prototype.keyboardHandler = function (e) {
        var _this = this;
        var args = { fileName: 'Signature', type: 'Png', cancel: false };
        switch (e.key) {
            case 'Delete':
                this.clear();
                break;
            case (e.ctrlKey && 's'):
                if (!this.isBlazor) {
                    this.trigger('beforeSave', args, function (observableSaveArgs) {
                        if (!args.cancel) {
                            _this.save(observableSaveArgs.type, observableSaveArgs.fileName);
                        }
                    });
                }
                else {
                    this.dotnetRef.invokeMethodAsync('TriggerEventAsync', 'beforeSave');
                }
                e.preventDefault();
                e.stopImmediatePropagation();
                break;
            case (e.ctrlKey && 'z'):
                this.undo();
                break;
            case (e.ctrlKey && 'y'):
                this.redo();
                break;
        }
    };
    SignatureBase.prototype.resizeHandler = function () {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        if (this.isResponsive) {
            this.canvasContext.canvas.width = this.element.offsetWidth;
            this.canvasContext.canvas.height = this.element.offsetHeight;
            this.canvasContext.scale(1, 1);
        }
        var restoreImg = new Image();
        restoreImg.src = this.snapColl[this.incStep];
        restoreImg.onload = function () {
            proxy.canvasContext.clearRect(0, 0, proxy.element.width, proxy.element.height);
            proxy.canvasContext.drawImage(restoreImg, 0, 0, proxy.element.width, proxy.element.height);
        };
    };
    SignatureBase.prototype.beginStroke = function (e) {
        this.refresh();
        this.updateStroke(e);
    };
    SignatureBase.prototype.updateStroke = function (e) {
        var point = this.createPoint(e);
        this.addPoint(point);
    };
    SignatureBase.prototype.updateStrokeWithThrottle = function (args) {
        var now = Date.now();
        var remaining = this.interval - (now - this.previous);
        this.storedArgs = args;
        if (remaining <= 0 || remaining > this.interval) {
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.previous = now;
            this.updateStroke(this.storedArgs);
            if (!this.timeout) {
                this.storedArgs = null;
            }
        }
        else if (!this.timeout) {
            this.timeout = window.setTimeout(this.delay.bind(this), remaining);
        }
    };
    SignatureBase.prototype.delay = function () {
        this.previous = Date.now();
        this.timeout = null;
        this.updateStroke(this.storedArgs);
        if (!this.timeout) {
            this.storedArgs = null;
        }
    };
    SignatureBase.prototype.createPoint = function (e) {
        var rect = this.canvasContext.canvas.getBoundingClientRect();
        if (e.type === 'mousedown' || e.type === 'mousemove') {
            return this.point(e.clientX - rect.left, e.clientY - rect.top, new Date().getTime());
        }
        else {
            return this.point(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top, new Date().getTime());
        }
    };
    /* Returns the current point corrdinates(x, y) and time.*/
    SignatureBase.prototype.point = function (pointX, pointY, time) {
        this.pointX = pointX;
        this.pointY = pointY;
        this.time = time || new Date().getTime();
        return { x: this.pointX, y: this.pointY, time: this.time };
    };
    SignatureBase.prototype.addPoint = function (point) {
        var points = this.pointColl;
        var controlPoint1;
        var controlPoint2;
        var lastPoint = points.length > 0 && points[points.length - 1];
        var isLastPointTooClose = lastPoint ? this.distanceTo(lastPoint) <= this.minDistance : false;
        if (!lastPoint || !(lastPoint && isLastPointTooClose)) {
            points.push(point);
            if (points.length > 2) {
                if (points.length === 3) {
                    points.unshift(points[0]);
                }
                controlPoint1 = (this.calculateCurveControlPoints(points[0], points[1], points[2])).controlPoint2;
                controlPoint2 = (this.calculateCurveControlPoints(points[1], points[2], points[3])).controlPoint1;
                this.startPoint = points[1];
                this.controlPoint1 = controlPoint1;
                this.controlPoint2 = controlPoint2;
                this.endPoint = points[2];
                this.startDraw();
                points.shift();
            }
        }
    };
    SignatureBase.prototype.startDraw = function () {
        var velocity;
        velocity = this.pointVelocityCalc(this.startPoint);
        velocity = this.velocity * velocity + (1 - this.velocity) * this.lastVelocity;
        var newWidth = Math.max(this.maxStrokeWidth / (velocity + 1), this.minStrokeWidth);
        this.curveDraw(this.lastWidth, newWidth);
        this.lastVelocity = velocity;
        this.lastWidth = newWidth;
    };
    SignatureBase.prototype.endDraw = function () {
        var canDrawCurve = this.pointColl.length > 2;
        var point = this.pointColl[0];
        if (!canDrawCurve && point) {
            this.strokeDraw(point);
        }
    };
    /* Calculate the Bezier (x, y) coordinate of the curve. */
    SignatureBase.prototype.curveDraw = function (startWidth, endWidth) {
        var context = this.canvasContext;
        var width;
        var i;
        var t1;
        var t2;
        var t3;
        var u1;
        var u2;
        var u3;
        var x;
        var y;
        var widthValue = endWidth - startWidth;
        var bezierLength = this.bezierLengthCalc();
        var drawSteps = Math.ceil(bezierLength) * 2;
        context.beginPath();
        for (i = 0; i < drawSteps; i++) {
            t1 = i / drawSteps;
            t2 = t1 * t1;
            t3 = t2 * t1;
            u1 = 1 - t1;
            u2 = u1 * u1;
            u3 = u2 * u1;
            x = u3 * this.startPoint.x;
            x += 3 * u2 * t1 * this.controlPoint1.x;
            x += 3 * u1 * t2 * this.controlPoint2.x;
            x += t3 * this.endPoint.x;
            y = u3 * this.startPoint.y;
            y += 3 * u2 * t1 * this.controlPoint1.y;
            y += 3 * u1 * t2 * this.controlPoint2.y;
            y += t3 * this.endPoint.y;
            width = Math.min(startWidth + t3 * widthValue, this.maxStrokeWidth);
            this.arcDraw(x, y, width);
        }
        context.closePath();
        context.fill();
        this.isSignatureEmpty = false;
    };
    SignatureBase.prototype.strokeDraw = function (point) {
        var context = this.canvasContext;
        var pointSize = (this.minStrokeWidth + this.maxStrokeWidth) / 2;
        context.beginPath();
        this.arcDraw(point.x, point.y, pointSize);
        context.closePath();
        context.fill();
        this.isSignatureEmpty = false;
    };
    SignatureBase.prototype.arcDraw = function (x, y, size) {
        var context = this.canvasContext;
        context.moveTo(x, y);
        context.arc(x, y, size, 0, 2 * Math.PI, false);
    };
    /* Utility functions for Bezier algorithm*/
    SignatureBase.prototype.calculateCurveControlPoints = function (p1, p2, p3) {
        var dx1 = p1.x - p2.x;
        var dy1 = p1.y - p2.y;
        var dx2 = p2.x - p3.x;
        var dy2 = p2.y - p3.y;
        var m1 = { x: (p1.x + p2.x) / 2.0, y: (p1.y + p2.y) / 2.0 };
        var m2 = { x: (p2.x + p3.x) / 2.0, y: (p2.y + p3.y) / 2.0 };
        var l1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
        var l2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        var dxm = (m1.x - m2.x);
        var dym = (m1.y - m2.y);
        var k = l2 / (l1 + l2);
        var cm = { x: m2.x + dxm * k, y: m2.y + dym * k };
        var tx = p2.x - cm.x;
        var ty = p2.y - cm.y;
        return {
            controlPoint1: this.point(m1.x + tx, m1.y + ty, 0),
            controlPoint2: this.point(m2.x + tx, m2.y + ty, 0)
        };
    };
    /* Returns approximated bezier length of the curuve.*/
    SignatureBase.prototype.bezierLengthCalc = function () {
        var steps = 10;
        var length = 0;
        var i;
        var t;
        var pointx1;
        var pointy1;
        var pointx2;
        var pointy2;
        var pointx3;
        var pointy3;
        for (i = 0; i <= steps; i++) {
            t = i / steps;
            pointx1 = this.bezierPointCalc(t, this.startPoint.x, this.controlPoint1.x, this.controlPoint2.x, this.endPoint.x);
            pointy1 = this.bezierPointCalc(t, this.startPoint.y, this.controlPoint1.y, this.controlPoint2.y, this.endPoint.y);
            if (i > 0) {
                pointx3 = pointx1 - pointx2;
                pointy3 = pointy1 - pointy2;
                length += Math.sqrt(pointx3 * pointx3 + pointy3 * pointy3);
            }
            pointx2 = pointx1;
            pointy2 = pointy1;
        }
        return length;
    };
    /* Calculate parametric value of x or y given t and the
       four point(startpoint, controlpoint1, controlpoint2, endpoint) coordinates of a cubic bezier curve.*/
    SignatureBase.prototype.bezierPointCalc = function (t, startpoint, cp1, cp2, endpoint) {
        return startpoint * (1.0 - t) * (1.0 - t) * (1.0 - t) + 3.0 * cp1 * (1.0 - t) * (1.0 - t) * t + 3.0 *
            cp2 * (1.0 - t) * t * t + endpoint * t * t * t;
    };
    /* Velocity between the current point and last point.*/
    SignatureBase.prototype.pointVelocityCalc = function (startPoint) {
        return (this.time !== startPoint.time) ? this.distanceTo(startPoint) / (this.time - startPoint.time) : 0;
    };
    /* Distance between the current point and last point.*/
    SignatureBase.prototype.distanceTo = function (start) {
        return Math.sqrt(Math.pow(this.pointX - start.x, 2) + Math.pow(this.pointY - start.y, 2));
    };
    SignatureBase.prototype.isRead = function (isRead) {
        if (isRead) {
            EventHandler.remove(this.canvasContext.canvas, 'mousedown touchstart', this.mouseDownHandler);
        }
        else if (!this.disabled) {
            EventHandler.add(this.canvasContext.canvas, 'mousedown touchstart', this.mouseDownHandler, this);
        }
    };
    SignatureBase.prototype.enableOrDisable = function (isDisable) {
        this.disabled = isDisable;
        if (isDisable) {
            this.reDraw('0.5');
            this.isRead(true);
        }
        else {
            this.reDraw('1');
            this.isRead(false);
        }
    };
    SignatureBase.prototype.reDraw = function (opacity) {
        var data = this.canvasContext.getImageData(0, 0, this.element.width, this.element.height);
        this.canvasContext.clearRect(0, 0, this.element.width, this.element.height);
        this.element.style.opacity = opacity;
        this.canvasContext.putImageData(data, 0, 0);
    };
    SignatureBase.prototype.updateSnapCollection = function (isClear) {
        if (isNullOrUndefined(this.incStep)) {
            this.incStep = -1;
            this.incStep++;
            this.snapColl = [];
            this.clearArray = [];
        }
        else {
            this.incStep++;
        }
        if (this.incStep < this.snapColl.length) {
            this.snapColl.length = this.incStep;
        }
        if (this.incStep > 0) {
            var canvasNew = this.createElement('canvas', { className: 'e-' + this.getModuleName() + '-wrapper' });
            var canvasContextNew = canvasNew.getContext('2d');
            canvasNew.width = this.canvasContext.canvas.width;
            canvasNew.height = this.canvasContext.canvas.height;
            canvasContextNew.drawImage(this.canvasContext.canvas, 0, 0, canvasNew.width, canvasNew.height);
            this.snapColl.push(canvasNew.toDataURL());
        }
        else {
            this.snapColl.push(this.canvasContext.canvas.toDataURL());
        }
        if (isClear) {
            this.clearArray.push(this.incStep);
        }
    };
    SignatureBase.prototype.setBackgroundImage = function (imageSrc) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var imageObj = new Image();
        imageObj.crossOrigin = 'anonymous';
        imageObj.src = imageSrc;
        imageObj.onload = function () {
            proxy.canvasContext.globalCompositeOperation = 'source-over';
            proxy.canvasContext.drawImage(imageObj, 0, 0, proxy.element.width, proxy.element.height);
            proxy.updateSnapCollection();
            proxy.saveBackground(true);
        };
        this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
    };
    SignatureBase.prototype.setBackgroundColor = function (color) {
        var canvasEle = this.canvasContext;
        canvasEle.strokeStyle = color;
        var i;
        var j;
        for (i = 1; i <= canvasEle.canvas.width; i++) {
            for (j = 1; j <= canvasEle.canvas.height; j++) {
                canvasEle.strokeRect(0, 0, i, j);
            }
        }
        this.updateSnapCollection();
    };
    SignatureBase.prototype.loadPersistedSignature = function () {
        if (isNullOrUndefined(this.signatureValue)) {
            return;
        }
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var lastImage = new Image();
        lastImage.src = this.signatureValue;
        lastImage.onload = function () {
            proxy.canvasContext.clearRect(0, 0, proxy.element.width, proxy.element.height);
            proxy.canvasContext.drawImage(lastImage, 0, 0);
            proxy.updateSnapCollection();
        };
        this.isSignatureEmpty = false;
    };
    /**
     * To get the signature as Blob.
     *
     * @param {string} url - specify the url/base 64 string to get blob of the signature.
     * @returns {Blob}.
     */
    SignatureBase.prototype.getBlob = function (url) {
        var arr = url.split(',');
        var type = arr[0].match(/:(.*?);/)[1];
        var bstr = atob(arr[1]);
        var n = bstr.length;
        var u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: type });
    };
    SignatureBase.prototype.download = function (blob, fileName) {
        var blobUrl = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = blobUrl;
        a.target = '_parent';
        a.download = fileName;
        (document.body || document.documentElement).appendChild(a);
        a.click();
        a.parentNode.removeChild(a);
    };
    /**
     * To refresh the signature.
     *
     * @private
     * @returns {void}.
     */
    SignatureBase.prototype.refresh = function () {
        this.pointColl = [];
        this.lastVelocity = 0;
        this.lastWidth = (this.minStrokeWidth + this.maxStrokeWidth) / 2;
    };
    /**
     * Erases all the signature strokes signed by user.
     *
     * @returns {void}.
     */
    SignatureBase.prototype.clear = function () {
        var args = { actionName: 'clear' };
        this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        this.refresh();
        this.updateSnapCollection(true);
        this.isSignatureEmpty = true;
        if (!this.isBlazor) {
            this.trigger('change', args);
        }
        else {
            this.dotnetRef.invokeMethodAsync('TriggerEventAsync', 'Clear');
        }
    };
    /**
     * Undo the last user action.
     *
     * @returns {void}.
     */
    SignatureBase.prototype.undo = function () {
        var args = { actionName: 'undo' };
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        if (this.incStep > 0) {
            this.incStep--;
            var undoImg_1 = new Image();
            undoImg_1.src = this.snapColl[this.incStep];
            undoImg_1.onload = function () {
                proxy.canvasContext.clearRect(0, 0, proxy.element.width, proxy.element.height);
                proxy.canvasContext.drawImage(undoImg_1, 0, 0, proxy.element.width, proxy.element.height);
            };
        }
        this.isClear();
        if (!this.isBlazor) {
            this.trigger('change', args);
        }
        else {
            this.dotnetRef.invokeMethodAsync('TriggerEventAsync', 'Undo');
        }
    };
    /**
     * Redo the last user action.
     *
     * @returns {void}.
     */
    SignatureBase.prototype.redo = function () {
        var args = { actionName: 'redo' };
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        if (this.incStep < this.snapColl.length - 1) {
            this.incStep++;
            var redoImg_1 = new Image();
            redoImg_1.src = this.snapColl[this.incStep];
            redoImg_1.onload = function () {
                proxy.canvasContext.clearRect(0, 0, proxy.element.width, proxy.element.height);
                proxy.canvasContext.drawImage(redoImg_1, 0, 0, proxy.element.width, proxy.element.height);
            };
        }
        this.isClear();
        if (!this.isBlazor) {
            this.trigger('change', args);
        }
        else {
            this.dotnetRef.invokeMethodAsync('TriggerEventAsync', 'Redo');
        }
    };
    SignatureBase.prototype.isClear = function () {
        if (this.clearArray) {
            var empty = false;
            for (var i = 0; i < this.clearArray.length; i++) {
                if (this.clearArray[i] === this.incStep) {
                    this.isSignatureEmpty = true;
                    empty = true;
                }
            }
            if (!empty) {
                this.isSignatureEmpty = false;
            }
        }
    };
    /**
     * To check whether the signature is empty or not.
     *
     * @returns {boolean}.
     */
    SignatureBase.prototype.isEmpty = function () {
        return this.isSignatureEmpty;
    };
    /**
     * To check whether the undo collection is empty or not.
     *
     * @returns {boolean}.
     */
    SignatureBase.prototype.canUndo = function () {
        return this.incStep > 0;
    };
    /**
     * To check whether the redo collection is empty or not.
     *
     * @returns {boolean}.
     */
    SignatureBase.prototype.canRedo = function () {
        return this.incStep < this.snapColl.length - 1;
    };
    /**
     * To draw the signature based on the given text, with the font family and font size.
     *
     * @param {string} text - specify text to be drawn as signature.
     * @param {string} fontFamily - specify font family of a signature.
     * @param {number} fontSize - specify font size of a signature.
     *
     * @returns {void}.
     */
    SignatureBase.prototype.draw = function (text, fontFamily, fontSize) {
        this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        fontFamily = fontFamily || 'Arial';
        fontSize = fontSize || 30;
        this.canvasContext.font = fontSize + 'px ' + fontFamily;
        this.canvasContext.textAlign = 'center';
        this.canvasContext.textBaseline = 'middle';
        this.canvasContext.fillText(text, this.element.width / 2, this.element.height / 2);
        this.updateSnapCollection();
        this.isSignatureEmpty = false;
    };
    /**
     * To load the signature with the given base 64 string, height and width.
     *
     * @param {string} signature - specify the url/base 64 string to be drawn as signature.
     * @param {number} width - specify the width of the loaded signature image.
     * @param {number} height - specify the height of the loaded signature image.
     * @returns {void}.
     */
    SignatureBase.prototype.load = function (signature, width, height) {
        height = height || this.element.height;
        width = width || this.element.width;
        this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var bitmapImage = new Image();
        bitmapImage.src = signature;
        if (signature.slice(0, 4) !== 'data') {
            bitmapImage.crossOrigin = 'anonymous';
        }
        bitmapImage.onload = function () {
            Promise.all([
                createImageBitmap(bitmapImage, 0, 0, width, height)
            ]).then(function (results) {
                var tempCanvas = document.createElement('canvas');
                tempCanvas.width = width;
                tempCanvas.height = height;
                tempCanvas.getContext('2d').drawImage(results[0], 0, 0);
                if (signature.slice(0, 4) !== 'data') {
                    proxy.canvasContext.globalCompositeOperation = 'source-over';
                }
                proxy.canvasContext.drawImage(tempCanvas, 0, 0, width, height, 0, 0, proxy.element.width, proxy.element.height);
                proxy.updateSnapCollection();
            });
        };
        this.isSignatureEmpty = false;
    };
    SignatureBase.prototype.saveBackground = function (savebg) {
        var imageSrc;
        if (savebg && this.backgroundImage) {
            imageSrc = this.snapColl[this.incStep - 1];
        }
        else {
            imageSrc = this.snapColl[this.incStep];
        }
        if (!savebg) {
            this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
            if (this.backgroundImage) {
                this.setBackgroundImage(this.backgroundImage);
            }
            else if (this.backgroundColor) {
                this.setBackgroundColor(this.backgroundColor);
                savebg = true;
            }
        }
        if (savebg) {
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            var proxy_1 = this;
            var imageObj_1 = new Image();
            imageObj_1.crossOrigin = 'anonymous';
            imageObj_1.src = imageSrc;
            imageObj_1.onload = function () {
                proxy_1.backgroundLoaded = true;
                proxy_1.canvasContext.globalCompositeOperation = 'source-over';
                proxy_1.canvasContext.drawImage(imageObj_1, 0, 0, proxy_1.element.width, proxy_1.element.height);
                proxy_1.save(proxy_1.fileType, proxy_1.fileName);
            };
        }
    };
    /**
     * To save the signature with the given file type and file name.
     *
     * @param {SignatureFileType} type - specify type of the file to be saved a signature.
     * @param {string} fileName - specify name of the file to be saved a signature.
     *
     * @returns {void}.
     */
    SignatureBase.prototype.save = function (type, fileName) {
        if (this.saveWithBackground && this.backgroundLoaded == null && (this.backgroundImage || this.backgroundColor)) {
            this.backgroundLoaded = false;
            this.fileType = type;
            this.fileName = fileName;
            this.saveBackground(false);
        }
        else if (type === 'Svg') {
            fileName = fileName || 'Signature';
            this.toSVG(fileName);
        }
        else if (type === 'Jpeg') {
            fileName = fileName || 'Signature';
            if (!this.saveWithBackground || this.saveWithBackground && !(this.backgroundImage || this.backgroundColor)) {
                this.toJPEG(fileName);
            }
            else {
                var dataURL = this.canvasContext.canvas.toDataURL('image/jpeg');
                this.download(this.getBlob(dataURL), fileName + '.' + 'jpeg');
            }
        }
        else {
            fileName = fileName || 'Signature';
            var dataURL = this.canvasContext.canvas.toDataURL('image/png');
            this.download(this.getBlob(dataURL), fileName + '.' + 'png');
        }
        if (this.saveWithBackground && this.backgroundLoaded) {
            this.resetSnap();
        }
    };
    SignatureBase.prototype.resetSnap = function () {
        this.canvasContext.clearRect(0, 0, this.canvasContext.canvas.width, this.canvasContext.canvas.height);
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var restoreObj = new Image();
        restoreObj.src = this.snapColl[this.incStep - 1];
        restoreObj.onload = function () {
            proxy.canvasContext.drawImage(restoreObj, 0, 0, proxy.element.width, proxy.element.height);
            proxy.updateSnapCollection();
        };
        this.backgroundLoaded = null;
        this.snapColl.pop();
        this.incStep--;
        this.snapColl.pop();
        this.incStep--;
    };
    SignatureBase.prototype.toJPEG = function (fileName) {
        var _this = this;
        var imageSrc = this.snapColl[this.incStep];
        this.setBackgroundColor('#ffffff');
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var imageObj = new Image();
        imageObj.crossOrigin = 'anonymous';
        imageObj.src = imageSrc;
        imageObj.onload = function () {
            proxy.canvasContext.globalCompositeOperation = 'source-over';
            proxy.canvasContext.drawImage(imageObj, 0, 0, proxy.element.width, proxy.element.height);
            var dataURL = proxy.canvasContext.canvas.toDataURL('image/jpeg');
            proxy.download(proxy.getBlob(dataURL), fileName + '.' + 'jpeg');
            proxy.canvasContext.clearRect(0, 0, proxy.canvasContext.canvas.width, proxy.canvasContext.canvas.height);
            _this.resizeHandler();
        };
        this.snapColl.pop();
        this.incStep--;
    };
    SignatureBase.prototype.toSVG = function (fileName) {
        var dataUrl = this.canvasContext.canvas.toDataURL();
        var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', this.canvasContext.canvas.width.toString());
        svg.setAttribute('height', this.canvasContext.canvas.height.toString());
        var XLinkNS = 'http://www.w3.org/1999/xlink';
        var img = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        img.setAttributeNS(null, 'height', this.canvasContext.canvas.height.toString());
        img.setAttributeNS(null, 'width', this.canvasContext.canvas.width.toString());
        img.setAttributeNS(XLinkNS, 'xlink:href', dataUrl);
        svg.appendChild(img);
        var prefix = 'data:image/svg+xml;base64,';
        var header = '<svg' + ' xmlns="http://www.w3.org/2000/svg"' + ' xmlns:xlink="http://www.w3.org/1999/xlink"'
            + (" width=\"" + this.canvasContext.canvas.width + "\"") + (" height=\"" + this.canvasContext.canvas.height + "\"") + '>';
        var footer = '</svg>';
        var body = svg.innerHTML;
        var data = header + body + footer;
        var svgDataUrl = prefix + btoa(data);
        if (fileName == null) {
            return svgDataUrl;
        }
        else {
            this.download(this.getBlob(svgDataUrl), fileName + '.' + 'svg');
            return null;
        }
    };
    /**
     * To save the signature as Blob.
     *
     * @returns {Blob}.
     */
    SignatureBase.prototype.saveAsBlob = function () {
        return this.getBlob(this.canvasContext.canvas.toDataURL('image/png'));
    };
    /**
     * To get the signature as Base 64.
     *
     * @private
     * @param {SignatureFileType} type - Specifies the type of the image format.
     * @returns {string}.
     */
    SignatureBase.prototype.getSignature = function (type) {
        if (type === 'Jpeg') {
            var imgData = this.canvasContext.getImageData(0, 0, this.element.width, this.element.height);
            var data = imgData.data;
            for (var i = 0; i < data.length; i += 4) {
                if (data[i + 3] < 255) {
                    data[i] = 255 - data[i];
                    data[i + 1] = 255 - data[i + 1];
                    data[i + 2] = 255 - data[i + 2];
                    data[i + 3] = 255 - data[i + 3];
                }
            }
            this.canvasContext.putImageData(imgData, 0, 0);
            var dataURL = this.canvasContext.canvas.toDataURL('image/jpeg');
            this.resizeHandler();
            return dataURL;
        }
        else if (type === 'Svg') {
            return this.toSVG(null);
        }
        else {
            return this.canvasContext.canvas.toDataURL('image/png');
        }
    };
    /**
     * Get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    SignatureBase.prototype.getModuleName = function () {
        return 'signature';
    };
    /**
     * To get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    SignatureBase.prototype.getPersistData = function () {
        this.signatureValue = this.snapColl[this.incStep];
        return this.addOnPersist(['signatureValue']);
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers.
     * Also it maintains the initial input element from the DOM.
     *
     * @method destroy
     * @returns {void}
     */
    SignatureBase.prototype.destroy = function () {
        this.unwireEvents(null);
        removeClass([this.element], 'e-' + this.getModuleName());
        this.element.removeAttribute('tabindex');
        this.pointColl = null;
        _super.prototype.destroy.call(this);
    };
    /**
     * Modified onPropertyChanged method for both blazor and EJ2 signature component.
     *
     * @private
     * @param {string} key - Specifies the property, which changed.
     * @param {string} value - Specifies the property value changed.
     * @returns {void}
     */
    SignatureBase.prototype.propertyChanged = function (key, value) {
        var canvasNew = this.canvasContext;
        switch (key) {
            case 'backgroundColor':
                canvasNew.canvas.style.backgroundColor = value;
                this.backgroundColor = value;
                break;
            case 'backgroundImage':
                canvasNew.canvas.style.backgroundImage = 'url(' + value + ')';
                this.backgroundImage = value;
                break;
            case 'strokeColor':
                canvasNew.fillStyle = value;
                this.strokeColor = value;
                break;
            case 'saveWithBackground':
                this.saveWithBackground = value;
                break;
            case 'maxStrokeWidth':
                this.maxStrokeWidth = value;
                break;
            case 'minStrokeWidth':
                this.minStrokeWidth = value;
                break;
            case 'velocity':
                this.velocity = value;
                break;
            case 'isReadOnly':
                this.isRead(value);
                break;
            case 'disabled':
                this.enableOrDisable(value);
                break;
        }
    };
    return SignatureBase;
}(Component));
export { SignatureBase };
