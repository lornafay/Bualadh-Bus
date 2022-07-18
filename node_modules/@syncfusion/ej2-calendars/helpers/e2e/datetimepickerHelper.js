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
    var datetimepickerHelper = (function (_super) {
        __extends(datetimepickerHelper, _super);
        function datetimepickerHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        datetimepickerHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        datetimepickerHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        datetimepickerHelper.prototype.getDateIcon = function () {
            return this.selector('.e-datetime-wrapper .e-date-icon');
        };
        datetimepickerHelper.prototype.getTimeIcon = function () {
            return this.selector('.e-datetime-wrapper .e-time-icon');
        };
        datetimepickerHelper.prototype.getClearIcon = function () {
            return this.selector('.e-datetime-wrapper .e-clear-icon');
        };
        datetimepickerHelper.prototype.getInputFocus = function () {
            return this.selector('.e-datetime-wrapper.e-input-focus');
        };
        datetimepickerHelper.prototype.getPopupElement = function () {
            return this.selector('.e-datepicker.e-popup-wrapper');
        };
        datetimepickerHelper.prototype.getCalender = function () {
            return this.selector('.e-datepicker .e-calendar.e-lib.e-keyboard');
        };
        datetimepickerHelper.prototype.getCalendarMonthHeader = function () {
            return this.selector('.e-datepicker .e-calendar .e-header.e-month');
        };
        datetimepickerHelper.prototype.getCalendarYearHeader = function () {
            return this.selector('.e-datepicker .e-calendar .e-header.e-year');
        };
        datetimepickerHelper.prototype.getCalendarDecadeHeader = function () {
            return this.selector('.e-datepicker .e-calendar .e-header.e-decade');
        };
        datetimepickerHelper.prototype.getTitleElement = function () {
            return this.selector('.e-datepicker .e-calendar .e-header .e-day.e-title');
        };
        datetimepickerHelper.prototype.getIconContainer = function () {
            return this.selector('.e-datepicker .e-calendar .e-header .e-icon-container');
        };
        datetimepickerHelper.prototype.getPrevIcon = function () {
            return this.selector('.e-datepicker .e-calendar .e-header .e-icon-container .e-prev');
        };
        datetimepickerHelper.prototype.getNextIcon = function () {
            return this.selector('.e-datepicker .e-calendar .e-header .e-icon-container .e-next');
        };
        datetimepickerHelper.prototype.getWeeKHeader = function () {
            return this.selector('.e-datepicker .e-calendar .e-content .e-week-header');
        };
        datetimepickerHelper.prototype.getCellElement = function () {
            return this.selector('.e-datepicker .e-calendar .e-content .e-cell');
        };
        datetimepickerHelper.prototype.getOtherMonthCellElement = function () {
            return this.selector('.e-datepicker .e-calendar .e-content .e-cell.e-other-month');
        };
        datetimepickerHelper.prototype.getSelectedCellElement = function () {
            return this.selector('.e-datepicker .e-calendar .e-content .e-cell.e-selected');
        };
        datetimepickerHelper.prototype.getTodayElement = function () {
            return this.selector('.e-datepicker .e-calendar .e-content .e-cell.e-today');
        };
        datetimepickerHelper.prototype.getDisabledElement = function () {
            return this.selector('.e-datepicker .e-calendar .e-content .e-cell.e-disabled.e-overlay');
        };
        datetimepickerHelper.prototype.getFocusedElement = function () {
            return this.selector('.e-datepicker .e-calendar .e-content .e-cell.e-focused-date');
        };
        datetimepickerHelper.prototype.getWeenkendElement = function () {
            return this.selector('.e-datepicker .e-calendar .e-content .e-cell.e-weekend');
        };
        datetimepickerHelper.prototype.getFooterContainer = function () {
            return this.selector('.e-datepicker .e-calendar .e-footer-container');
        };
        datetimepickerHelper.prototype.getToday = function () {
            return this.selector('.e-datepicker .e-calendar .e-footer-container .e-today');
        };
        datetimepickerHelper.prototype.getWeekNumber = function () {
            return this.selector('.e-datepicker .e-calendar.e-week-number .e-content .e-cell.e-week-number');
        };
        datetimepickerHelper.prototype.getTimePopup = function () {
            return this.selector('.e-datetimepicker.e-popup');
        };
        datetimepickerHelper.prototype.getTimePopupContent = function () {
            return this.selector('.e-datetimepicker.e-popup .e-content .e-list-parent');
        };
        datetimepickerHelper.prototype.getTimePopupItem = function () {
            return this.selector('.e-datetimepicker.e-popup .e-content .e-list-parent .e-list-item');
        };
        datetimepickerHelper.prototype.getTimePopupActiveItem = function () {
            return this.selector('.e-datetimepicker.e-popup .e-content .e-list-parent .e-list-item.e-active');
        };
        datetimepickerHelper.prototype.getTimePopupHoverItem = function () {
            return this.selector('.e-datetimepicker.e-popup .e-content .e-list-parent .e-list-item.e-hover');
        };
        datetimepickerHelper.prototype.getTimePopupDisabledItem = function () {
            return this.selector('.e-datetimepicker.e-popup .e-content .e-list-parent .e-list-item.e-disabled');
        };
        return datetimepickerHelper;
    }(e2e_1.TestHelper));
    exports.datetimepickerHelper = datetimepickerHelper;
});
