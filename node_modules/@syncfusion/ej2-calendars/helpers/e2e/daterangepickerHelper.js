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
    var daterangepickerHelper = (function (_super) {
        __extends(daterangepickerHelper, _super);
        function daterangepickerHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        daterangepickerHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        daterangepickerHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        daterangepickerHelper.prototype.getRangeIcon = function () {
            return this.selector('.e-date-range-wrapper .e-range-icon');
        };
        daterangepickerHelper.prototype.getClearIcon = function () {
            return this.selector('.e-date-range-wrapper .e-clear-icon');
        };
        daterangepickerHelper.prototype.getInputFocus = function () {
            return this.selector('.e-date-range-wrapper.e-input-focus');
        };
        daterangepickerHelper.prototype.getRangeContainer = function () {
            return this.selector('.e-daterangepicker .e-date-range-container');
        };
        daterangepickerHelper.prototype.getRangeHeader = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-range-header');
        };
        daterangepickerHelper.prototype.getStartLabelElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-range-header .e-start-end .e-start-label');
        };
        daterangepickerHelper.prototype.getEndLabelElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-range-header .e-start-end .e-end-label');
        };
        daterangepickerHelper.prototype.getRangeChangeIconElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-range-header .e-start-end .e-change-icon ');
        };
        daterangepickerHelper.prototype.getCalendarContainer = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container');
        };
        daterangepickerHelper.prototype.getLeftCalendarContainer = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-left-container');
        };
        daterangepickerHelper.prototype.getRightCalendarContainer = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-right-container');
        };
        daterangepickerHelper.prototype.getLeftCalendar = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-left-container .e-left-calendar');
        };
        daterangepickerHelper.prototype.getRightCalendar = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-right-container .e-right-calendar');
        };
        daterangepickerHelper.prototype.getLeftCalendarMonthHeaderElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-left-container .e-left-calendar .e-header.e-month');
        };
        daterangepickerHelper.prototype.getLeftCalendarPrevIconElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-left-container .e-left-calendar .e-header.e-month .e-prev');
        };
        daterangepickerHelper.prototype.getLeftCalendarNextIconElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-left-container .e-left-calendar .e-header.e-month .e-next');
        };
        daterangepickerHelper.prototype.getleftCalndarWeekHeaderElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-left-container .e-left-calendar .e-content.e-month .e-week-header');
        };
        daterangepickerHelper.prototype.getleftcalendarCellElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-left-container .e-left-calendar .e-content.e-month .e-cell');
        };
        daterangepickerHelper.prototype.getleftCalendarWeekNumberElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-left-container .e-left-calendar .e-content.e-month .e-cell.e-week-number');
        };
        daterangepickerHelper.prototype.getRightCalendarMonthHeaderElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-right-container .e-right-calendar .e-header.e-month');
        };
        daterangepickerHelper.prototype.getRightCalendarPrevIconElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-right-container .e-right-calendar .e-header.e-month .e-prev');
        };
        daterangepickerHelper.prototype.getRightCalendarNextIconElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-right-container .e-right-calendar .e-header.e-month .e-next');
        };
        daterangepickerHelper.prototype.getRightCalndarWeekHeaderElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-right-container .e-right-calendar .e-content.e-month .e-week-header');
        };
        daterangepickerHelper.prototype.getRightcalendarCellElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-right-container .e-right-calendar .e-content.e-month .e-cell');
        };
        daterangepickerHelper.prototype.getRightCalendarWeekNumberElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-right-container .e-right-calendar .e-content.e-month .e-cell.e-week-number');
        };
        daterangepickerHelper.prototype.getSelectedStartDateCellElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-content.e-month .e-cell.e-selected.e-start-date');
        };
        daterangepickerHelper.prototype.getSelectedEndDateCellElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-content.e-month .e-cell.e-selected.e-end-date');
        };
        daterangepickerHelper.prototype.getFocusedCellElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-content.e-month .e-cell.e-focused-date');
        };
        daterangepickerHelper.prototype.getRangeOverCellElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-content.e-month .e-cell.e-range-hover');
        };
        daterangepickerHelper.prototype.getDisabledCellElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-content.e-month .e-cell.e-disabled.e-overlay');
        };
        daterangepickerHelper.prototype.getOtherMonthCellElement = function () {
            return this.selector('.e-daterangepicker .e-date-range-container .e-calendar-container .e-content.e-month .e-cell.e-other-month');
        };
        return daterangepickerHelper;
    }(e2e_1.TestHelper));
    exports.daterangepickerHelper = daterangepickerHelper;
});
