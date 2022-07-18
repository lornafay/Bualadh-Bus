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
    var numerictextboxHelper = /** @class */ (function (_super) {
        __extends(numerictextboxHelper, _super);
        function numerictextboxHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        numerictextboxHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        numerictextboxHelper.prototype.getWrapperElement = function () {
            return this.selector('.e-control-wrapper.e-numeric.e-input-group');
        };
        numerictextboxHelper.prototype.getInputElement = function () {
            return this.selector('.e-control-wrapper.e-numeric.e-input-group .e-numerictextbox');
        };
        numerictextboxHelper.prototype.getUpIconElement = function () {
            return this.selector('.e-control-wrapper.e-numeric.e-input-group .e-input-group-icon.e-spin-up');
        };
        numerictextboxHelper.prototype.getDownIconElement = function () {
            return this.selector('.e-control-wrapper.e-numeric.e-input-group .e-input-group-icon.e-spin-down');
        };
        numerictextboxHelper.prototype.getFocusElement = function () {
            return this.selector('.e-control-wrapper.e-numeric.e-input-group.e-input-focus');
        };
        numerictextboxHelper.prototype.getClearIconElement = function () {
            return this.selector('.e-control-wrapper.e-numeric.e-input-group .e-clear-icon');
        };
        numerictextboxHelper.prototype.getFloatLabelElement = function () {
            return this.selector('#' + 'label_' + this.id);
        };
        return numerictextboxHelper;
    }(e2e_1.TestHelper));
    exports.numerictextboxHelper = numerictextboxHelper;
});
