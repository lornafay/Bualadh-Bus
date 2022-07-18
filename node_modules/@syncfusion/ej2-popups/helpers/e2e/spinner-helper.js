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
define(["require", "exports", "@syncfusion/ej2-base/helpers/e2e"], function (require, exports, e2e_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SpinnerHelper = /** @class */ (function (_super) {
        __extends(SpinnerHelper, _super);
        function SpinnerHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        /**
         * The method which returns target element of the Spinner control.
         */
        SpinnerHelper.prototype.getSpinner = function () {
            return this.selector('#' + this.id);
        };
        /**
         * The getSpinnerPane method which returns wrapper element of the Spinner control.
         */
        SpinnerHelper.prototype.getSpinnerPane = function () {
            return this.selector('#' + this.id + ' div.e-spinner-pane');
        };
        /**
         * The method which returns Spinner image.
         */
        SpinnerHelper.prototype.getSpinnerImage = function () {
            return this.selector('#' + this.id + ' div.e-spinner-pane .e-spinner-inner svg');
        };
        /**
         * The getModel method is used to return value of the property.
         * @param property - Specifies name of the property. It must be string type.
         */
        SpinnerHelper.prototype.getModel = function (property) {
            this.getModel(property);
        };
        /**
         * The setModel method is used to set value for the property. It will accepts two arguments.
         * @param property - Specifices name of the property which value is to be updated.
         * @param value - Specifies corresponding value of the property.
         */
        SpinnerHelper.prototype.setModel = function (property, value) {
            this.setModel(property, value);
        };
        /**
         * The invoke method is used to access the public methods available in Spinner control.
         * @param fName - Specifies method name of the Spinner control. It must be string type.
         * @param args - Specifies arguments. This is optional.
         */
        SpinnerHelper.prototype.invoke = function (fName, args) {
            this.invoke(fName, args);
        };
        return SpinnerHelper;
    }(e2e_1.TestHelper));
    exports.SpinnerHelper = SpinnerHelper;
});
