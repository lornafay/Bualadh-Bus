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
    var maskedtextboxHelper = /** @class */ (function (_super) {
        __extends(maskedtextboxHelper, _super);
        function maskedtextboxHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        maskedtextboxHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        maskedtextboxHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        maskedtextboxHelper.prototype.getWrapperElement = function () {
            return this.selector('.e-control-wrapper.e-mask.e-input-group');
        };
        maskedtextboxHelper.prototype.getInputElement = function () {
            return this.selector('.e-control-wrapper.e-mask.e-input-group .e-control.e-maskedtextbox.e-lib.e-input');
        };
        maskedtextboxHelper.prototype.getFocusElement = function () {
            return this.selector('.e-control-wrapper.e-mask.e-input-group.e-input-focus');
        };
        maskedtextboxHelper.prototype.getClearIconElement = function () {
            return this.selector('.e-control-wrapper.e-mask.e-input-group .e-clear-icon');
        };
        maskedtextboxHelper.prototype.getFloatLabelElement = function () {
            return this.selector('#' + 'label_' + this.id);
        };
        maskedtextboxHelper.prototype.setModel = function (property, value) {
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                return ele[0].ej2_instances[0][property] = value;
            });
        };
        return maskedtextboxHelper;
    }(e2e_1.TestHelper));
    exports.maskedtextboxHelper = maskedtextboxHelper;
});
