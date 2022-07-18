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
    var DialogHelper = /** @class */ (function (_super) {
        __extends(DialogHelper, _super);
        function DialogHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        /**
         * The method which returns Dialog control's root element.
         */
        DialogHelper.prototype.getDialog = function () {
            return this.selector('#' + this.id);
        };
        /**
         * The method which returns content container of the Dialog control.
         */
        DialogHelper.prototype.getContentElement = function () {
            return this.selector('#' + this.id + ' div.e-dlg-content');
        };
        /**
         * The method which returns header container of the Dialog control.
         */
        DialogHelper.prototype.getHeaderElement = function () {
            return this.selector('#' + this.id + ' div.e-dlg-header-content');
        };
        /**
         * The method which returns footer buttons of the Dialog control.
         */
        DialogHelper.prototype.getFooterButtons = function () {
            return this.selector('#' + this.id + ' div.e-footer-content .e-btn');
        };
        /**
         * The method which returns close icon's button of the Dialog control.
         */
        DialogHelper.prototype.getCloseButton = function () {
            return this.selector('#' + this.id + ' div.e-dlg-header-content .e-dlg-closeicon-btn');
        };
        /**
         * The getModel method is used to return value of the property.
         * @param property - Specifies name of the property. It must be string type.
         */
        DialogHelper.prototype.getModel = function (property) {
            this.getModel(property);
        };
        /**
         * The setModel method is used to set value for the property. It will accepts two arguments.
         * @param property - Specifices name of the property which value is to be updated.
         * @param value - Specifies corresponding value of the property.
         */
        DialogHelper.prototype.setModel = function (property, value) {
            this.setModel(property, value);
        };
        /**
         * The invoke method is used to access the public methods available in Dialog control.
         * @param fName - Specifies method name of the Dialog control. It must be string type.
         * @param args - Specifies arguments. This is optional.
         */
        DialogHelper.prototype.invoke = function (fName, args) {
            this.invoke(fName, args);
        };
        return DialogHelper;
    }(e2e_1.TestHelper));
    exports.DialogHelper = DialogHelper;
});
