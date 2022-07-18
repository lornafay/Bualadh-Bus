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
     * E2E test helpers for Tooltip to easily interact and the test the component
     */
    var TooltipHelper = /** @class */ (function (_super) {
        __extends(TooltipHelper, _super);
        /**
         * Initialize the Tooltip E2E helpers
         * @param id Element id of the tooltip element
         * @param wrapperFn Pass the wrapper function
         */
        function TooltipHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        /**
         * Used to get root element of the Tooltip component
         */
        TooltipHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        /**
         * Used to get the opened tooltip popup element
         */
        TooltipHelper.prototype.getTooltipPopup = function () {
            return this.selector("[id^=\"" + this.id + "_\"]");
        };
        /**
         * Used to get the opened tooltip close button.
         * Works only when `isSticky` is enabled
         */
        TooltipHelper.prototype.getTooltipPopupCloseButton = function () {
            return this.selector("[id^=\"" + this.id + "_\"] > div.e-icons.e-tooltip-close");
        };
        return TooltipHelper;
    }(e2e_1.TestHelper));
    exports.TooltipHelper = TooltipHelper;
});
