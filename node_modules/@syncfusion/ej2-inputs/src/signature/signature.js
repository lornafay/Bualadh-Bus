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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Event } from '@syncfusion/ej2-base';
import { NotifyPropertyChanges, Property, addClass } from '@syncfusion/ej2-base';
import { SignatureBase } from '../common/signature-base';
/**
 * The Signature component allows user to draw smooth signatures as vector outline of strokes using variable width bezier curve interpolation.
 * It allows to save signature as image.
 * You can use your finger, pen, or mouse on a tablet, touchscreen, etc., to draw your own signature on this Signature component.
 * Signature component is a user interface to draw the Signature or Text.
 * It provides supports for various Background color, Stroke color and Background Image.
 * ```html
 * <canvas id="signature"></canvas>
 * ```
 * ```typescript
 * <script>
 *   let signatureObj: Signature = new Signature(null , "#signature");
 * </script>
 * ```
 */
var Signature = /** @class */ (function (_super) {
    __extends(Signature, _super);
    /**
     * Constructor for creating the widget.
     *
     * @param {SignatureModel} options - Specifies the Signature model.
     * @param {string | HTMLCanvasElement} element - Specifies the element.
     * @private
     */
    function Signature(options, element) {
        return _super.call(this, options, element) || this;
    }
    Signature.prototype.preRender = function () {
        // pre render code snippets
    };
    /**
     * To Initialize the component rendering
     *
     * @private
     * @returns {void}
     */
    Signature.prototype.render = function () {
        this.initialize();
    };
    Signature.prototype.initialize = function () {
        addClass([this.element], 'e-' + this.getModuleName());
        _super.prototype.initialize.call(this, this.element);
        if (this.enablePersistence) {
            this.loadPersistedSignature();
        }
    };
    /**
     * To get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    Signature.prototype.getModuleName = function () {
        return 'signature';
    };
    /**
     * To get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    Signature.prototype.getPersistData = function () {
        return this.addOnPersist(['signatureValue']);
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {SignatureModel} newProp - Specifies new properties
     * @param  {SignatureModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    Signature.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'backgroundColor':
                    _super.prototype.propertyChanged.call(this, prop, newProp.backgroundColor);
                    break;
                case 'backgroundImage':
                    _super.prototype.propertyChanged.call(this, prop, newProp.backgroundImage);
                    break;
                case 'strokeColor':
                    if (newProp.strokeColor !== oldProp.strokeColor) {
                        _super.prototype.propertyChanged.call(this, prop, newProp.strokeColor);
                    }
                    break;
                case 'saveWithBackground':
                    _super.prototype.propertyChanged.call(this, prop, newProp.saveWithBackground);
                    break;
                case 'isReadOnly':
                    _super.prototype.propertyChanged.call(this, prop, newProp.isReadOnly);
                    break;
                case 'disabled':
                    _super.prototype.propertyChanged.call(this, prop, newProp.disabled);
                    break;
            }
        }
    };
    __decorate([
        Property('')
    ], Signature.prototype, "backgroundColor", void 0);
    __decorate([
        Property('')
    ], Signature.prototype, "backgroundImage", void 0);
    __decorate([
        Property(false)
    ], Signature.prototype, "disabled", void 0);
    __decorate([
        Property(false)
    ], Signature.prototype, "isReadOnly", void 0);
    __decorate([
        Property(true)
    ], Signature.prototype, "saveWithBackground", void 0);
    __decorate([
        Property('#000000')
    ], Signature.prototype, "strokeColor", void 0);
    __decorate([
        Property(0.5)
    ], Signature.prototype, "minStrokeWidth", void 0);
    __decorate([
        Property(2)
    ], Signature.prototype, "maxStrokeWidth", void 0);
    __decorate([
        Property(0.7)
    ], Signature.prototype, "velocity", void 0);
    __decorate([
        Property('en-US')
    ], Signature.prototype, "locale", void 0);
    __decorate([
        Property(false)
    ], Signature.prototype, "enableRtl", void 0);
    __decorate([
        Property(false)
    ], Signature.prototype, "enablePersistence", void 0);
    __decorate([
        Event()
    ], Signature.prototype, "beforeSave", void 0);
    __decorate([
        Event()
    ], Signature.prototype, "change", void 0);
    __decorate([
        Event()
    ], Signature.prototype, "created", void 0);
    Signature = __decorate([
        NotifyPropertyChanges
    ], Signature);
    return Signature;
}(SignatureBase));
export { Signature };
