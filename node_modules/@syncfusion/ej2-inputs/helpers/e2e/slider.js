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
     * E2E test helpers for slider to easily interact and the test the component
     */
    var SliderHelper = /** @class */ (function (_super) {
        __extends(SliderHelper, _super);
        /**
         * Initialize the Slider E2E helpers
         * @param id Element id of the slider element
         * @param wrapperFn Pass the wrapper function
         */
        function SliderHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        /**
         * Used get root element or id of the Slider component
         */
        SliderHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        /**
         * Used to get the tooltip element of slider component.
         * @param tooltipCssClass cssClass for the slider tooltip element
         * if assigned in the tooltip property of slider.
         *
         * Works only if the `tooltip` is used in the slider.
         */
        SliderHelper.prototype.getSliderTooltipElement = function (tooltipCssClass) {
            var tooltipSelector = '.e-slider-tooltip[id^="tooltip_"]';
            if (tooltipCssClass)
                tooltipSelector += "." + tooltipCssClass;
            return this.selector(tooltipSelector);
        };
        /**
         * Used to get the slider components ticks element.
         *
         * Works only if `ticks` is enabled for slider.
         */
        SliderHelper.prototype.getSliderTickElement = function () {
            return this.selector("#" + this.id + " > ul");
        };
        /**
         * Used to get the first button element of the slider component.
         *
         * Works only if `showButtons` is enabled for slider.
         */
        SliderHelper.prototype.getFirstButtonElement = function () {
            if (typeof cy !== 'undefined') {
                return this.selector("#" + this.id)
                    .parent('.e-slider-container')
                    .get('.e-slider-button.e-first-button');
            }
            if (typeof browser !== 'undefined') {
                return element(by.css("#" + this.id))
                    .element(by.xpath('..'))
                    .element(by.css('.e-slider-button.e-first-button'));
            }
        };
        /**
         * Used to get the second button element of the slider component.
         *
         * Works only if `showButtons` is enabled for slider.
         */
        SliderHelper.prototype.getSecondButtonElement = function () {
            if (typeof cy !== 'undefined') {
                return this.selector("#" + this.id)
                    .parent('.e-slider-container')
                    .get('.e-slider-button.e-second-button');
            }
            if (typeof browser !== 'undefined') {
                return element(by.css("#" + this.id))
                    .element(by.xpath('..'))
                    .element(by.css('.e-slider-button.e-second-button'));
            }
        };
        return SliderHelper;
    }(e2e_1.TestHelper));
    exports.SliderHelper = SliderHelper;
});
