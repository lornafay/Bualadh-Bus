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
    var textboxHelper = /** @class */ (function (_super) {
        __extends(textboxHelper, _super);
        function textboxHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        textboxHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        textboxHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        textboxHelper.prototype.getWrapperElement = function () {
            return this.selector('.e-float-input.e-control-wrapper');
        };
        textboxHelper.prototype.getInputElement = function () {
            return this.selector('.e-float-input.e-control-wrapper .e-control.e-textbox.e-lib');
        };
        textboxHelper.prototype.getClearIconElement = function () {
            return this.selector('.e-float-input.e-control-wrapper .e-float-line .e-clear-icon');
        };
        textboxHelper.prototype.getFloatLabelElement = function () {
            return this.selector('#' + 'label_' + this.id);
        };
        textboxHelper.prototype.setModel = function (property, value) {
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                return ele[0].ej2_instances[0][property] = value;
            });
        };
        return textboxHelper;
    }(e2e_1.TestHelper));
    exports.textboxHelper = textboxHelper;
});
