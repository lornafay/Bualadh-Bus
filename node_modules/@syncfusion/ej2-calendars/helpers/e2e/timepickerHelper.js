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
    var timepickerHelper = (function (_super) {
        __extends(timepickerHelper, _super);
        function timepickerHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        timepickerHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        timepickerHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        timepickerHelper.prototype.getTimePickerInput = function () {
            return this.selector('.e-control.e-timepicker.e-lib.e-input');
        };
        timepickerHelper.prototype.getTimePickerIcon = function () {
            return this.selector('.e-time-wrapper .e-time-icon');
        };
        timepickerHelper.prototype.getTimePickerClearIcon = function () {
            return this.selector('.e-time-wrapper .e-clear-icon');
        };
        timepickerHelper.prototype.getTimePicker = function () {
            return this.selector('.e-input-group.e-control-wrapper');
        };
        timepickerHelper.prototype.getTimePickerContent = function () {
            return this.selector('.e-timepicker .e-content');
        };
        timepickerHelper.prototype.getTimePickerListContent = function () {
            return this.selector('.e-timepicker .e-content .e-list-parent');
        };
        timepickerHelper.prototype.getTimePickerListItem = function () {
            return this.selector('.e-timepicker .e-content .e-list-parent .e-list-item');
        };
        timepickerHelper.prototype.getTimePickerDisabledTime = function () {
            return this.selector('.e-timepicker .e-content .e-list-parent .e-list-item.e-disabled');
        };
        timepickerHelper.prototype.getTimePickerSelectedTime = function () {
            return this.selector('.e-timepicker .e-content .e-list-parent .e-list-item.e-active');
        };
        return timepickerHelper;
    }(e2e_1.TestHelper));
    exports.timepickerHelper = timepickerHelper;
});
