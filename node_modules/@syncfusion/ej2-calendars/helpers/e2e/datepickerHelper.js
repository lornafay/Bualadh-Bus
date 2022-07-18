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
    var datepickerHelper = (function (_super) {
        __extends(datepickerHelper, _super);
        function datepickerHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        datepickerHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        datepickerHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        datepickerHelper.prototype.getDateIcon = function () {
            return this.selector('.e-date-wrapper .e-date-icon');
        };
        datepickerHelper.prototype.getClearIcon = function () {
            return this.selector('.e-date-wrapper .e-clear-icon');
        };
        datepickerHelper.prototype.getCalender = function () {
            return this.selector('.e-datepicker .e-calendar.e-lib.e-keyboard');
        };
        datepickerHelper.prototype.getCalendarMonthHeader = function () {
            return this.selector('.e-datepicker .e-calendar .e-header.e-month');
        };
        datepickerHelper.prototype.getCalendarYearHeader = function () {
            return this.selector('.e-datepicker .e-calendar .e-header.e-year');
        };
        datepickerHelper.prototype.getCalendarDecadeHeader = function () {
            return this.selector('.e-datepicker .e-calendar .e-header.e-decade');
        };
        datepickerHelper.prototype.getTitleElement = function () {
            return this.selector('.e-datepicker .e-calendar .e-header.e-month .e-day.e-title');
        };
        datepickerHelper.prototype.getIconContainer = function () {
            return this.selector('.e-datepicker .e-calendar .e-header .e-icon-container');
        };
        datepickerHelper.prototype.getPreviousIcon = function () {
            return this.selector('.e-datepicker .e-calendar .e-header .e-icon-container .e-prev');
        };
        datepickerHelper.prototype.getNextIcon = function () {
            return this.selector('.e-datepicker .e-calendar .e-header .e-icon-container .e-next');
        };
        datepickerHelper.prototype.getWeekHeader = function () {
            return this.selector('.e-datepicker .e-calendar .e-content.e-month .e-week-header');
        };
        datepickerHelper.prototype.getCellElement = function () {
            return this.selector('.e-datepicker .e-calendar .e-content .e-cell');
        };
        datepickerHelper.prototype.getOtherMonthCellElement = function () {
            return this.selector('.e-datepicker .e-calendar .e-content .e-cell.e-other-month');
        };
        datepickerHelper.prototype.getSelectedCellElement = function () {
            return this.selector('.e-datepicker .e-calendar .e-content .e-cell.e-selected');
        };
        datepickerHelper.prototype.getDisabledElement = function () {
            return this.selector('.e-datepicker .e-calendar .e-content .e-cell.e-disabled.e-overlay');
        };
        datepickerHelper.prototype.getDisabledWeekEndElement = function () {
            return this.selector('.e-datepicker .e-calendar .e-content .e-cell.e-disabled.e-overlay.e-weekend');
        };
        datepickerHelper.prototype.getTodayCellElement = function () {
            return this.selector('.e-datepicker .e-calendar .e-content  .e-cell.e-today');
        };
        datepickerHelper.prototype.getWeenkendElement = function () {
            return this.selector('.e-datepicker .e-calendar .e-content .e-cell.e-weekend');
        };
        datepickerHelper.prototype.getFooterContainer = function () {
            return this.selector('.e-datepicker .e-calendar .e-footer-container');
        };
        datepickerHelper.prototype.getTodayElement = function () {
            return this.selector('.e-datepicker .e-calendar .e-footer-container .e-today');
        };
        return datepickerHelper;
    }(e2e_1.TestHelper));
    exports.datepickerHelper = datepickerHelper;
});
