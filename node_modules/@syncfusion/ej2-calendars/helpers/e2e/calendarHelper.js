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
    var calendarHelper = (function (_super) {
        __extends(calendarHelper, _super);
        function calendarHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        calendarHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        calendarHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        calendarHelper.prototype.getMonthHeaderElement = function () {
            return this.selector('#' + this.id + ' .e-header.e-month');
        };
        calendarHelper.prototype.getYearHeaderElement = function () {
            return this.selector('#' + this.id + ' .e-header.e-year');
        };
        calendarHelper.prototype.getDecadeHeaderElement = function () {
            return this.selector('#' + this.id + ' .e-header.e-decade');
        };
        calendarHelper.prototype.getMonthContentElement = function () {
            return this.selector('#' + this.id + ' .e-content.e-month');
        };
        calendarHelper.prototype.getTitleElement = function () {
            return this.selector('#' + this.id + ' .e-day.e-title');
        };
        calendarHelper.prototype.getNextIconElement = function () {
            return this.selector('#' + this.id + ' .e-icon-container .e-next');
        };
        calendarHelper.prototype.getPrevIconElement = function () {
            return this.selector('#' + this.id + ' .e-icon-container .e-prev');
        };
        calendarHelper.prototype.getWeekHeaderElement = function () {
            return this.selector('#' + this.id + ' .e-week-header');
        };
        calendarHelper.prototype.getWeekNumberElement = function () {
            return this.selector('#' + this.id + ' .e-content.e-month .e-cell.e-week-number');
        };
        calendarHelper.prototype.getCellElement = function () {
            return this.selector('#' + this.id + ' .e-cell');
        };
        calendarHelper.prototype.getOtherMonthCellElement = function () {
            return this.selector('#' + this.id + ' .e-cell.e-other-month');
        };
        calendarHelper.prototype.getSelectedCellElement = function () {
            return this.selector('#' + this.id + ' .e-cell.e-selected');
        };
        calendarHelper.prototype.getDisabledCellElement = function () {
            return this.selector('#' + this.id + ' .e-cell.e-disabled.e-overlay');
        };
        calendarHelper.prototype.getFocusedCellElement = function () {
            return this.selector('#' + this.id + ' .e-cell.e-focused-date');
        };
        calendarHelper.prototype.getTodayCellElement = function () {
            return this.selector('#' + this.id + ' .e-cell.e-today');
        };
        calendarHelper.prototype.getFooterElement = function () {
            return this.selector('#' + this.id + ' .e-footer-container');
        };
        calendarHelper.prototype.getTodatButtonElement = function () {
            return this.selector('#' + this.id + ' .e-footer-container .e-today');
        };
        return calendarHelper;
    }(e2e_1.TestHelper));
    exports.calendarHelper = calendarHelper;
});
