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
    /**
     * E2E test helpers for Colorpicker to easily interact and the test the component
     */
    var ColorpickerHelper = /** @class */ (function (_super) {
        __extends(ColorpickerHelper, _super);
        /**
         * Initialize the Colorpicker E2E helpers
         * @param id Element id of the Colorpicker element
         * @param wrapperFn Pass the wrapper function
         */
        function ColorpickerHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        /**
         * Used to get root element of the Colorpicker component
         */
        ColorpickerHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        ColorpickerHelper.prototype.getSplitButtonElement = function () {
            return this.selector('#' + this.id + '_dropdownbtn');
        };
        ColorpickerHelper.prototype.getSplitButtonPopupElement = function () {
            return this.selector('#' + this.id + '_dropdownbtn_popup');
        };
        ColorpickerHelper.prototype.setModel = function (property, value) {
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                return ele[0].ej2_instances[0][property] = value;
            });
        };
        ColorpickerHelper.prototype.getModel = function (property) {
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                return ele[0].ej2_instances[0][property];
            });
        };
        ColorpickerHelper.prototype.invoke = function (fName, args) {
            if (args === void 0) { args = []; }
            var cy;
            return cy.get('#' + this.id).then(function (ele) {
                var inst = ele[0].ej2_instances[0];
                return inst[fName].apply(inst, args);
            });
        };
        return ColorpickerHelper;
    }(e2e_1.TestHelper));
    exports.ColorpickerHelper = ColorpickerHelper;
});
