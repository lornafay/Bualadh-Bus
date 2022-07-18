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
import * as React from 'react';
import { DateRangePicker } from '@syncfusion/ej2-calendars';
import { ComponentBase, applyMixins } from '@syncfusion/ej2-react-base';
/**
 * Represents the Essential JS 2 React DateRangePicker Component.
 * ```ts
 * <DateRangePickerComponent startDate={date} endDate={date}></DateRangePickerComponent>
 * ```
 */
var DateRangePickerComponent = /** @class */ (function (_super) {
    __extends(DateRangePickerComponent, _super);
    function DateRangePickerComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.initRenderCalled = false;
        _this.checkInjectedModules = false;
        _this.directivekeys = { 'presets': 'preset' };
        _this.immediateRender = false;
        _this.portals = [];
        return _this;
    }
    DateRangePickerComponent.prototype.render = function () {
        if (((this.element && !this.initRenderCalled) || this.refreshing) && !this.isReactForeceUpdate) {
            _super.prototype.render.call(this);
            this.initRenderCalled = true;
        }
        else {
            return React.createElement(React.Fragment, null, [].concat(React.createElement("input", this.getDefaultAttributes()), this.portals));
        }
    };
    return DateRangePickerComponent;
}(DateRangePicker));
export { DateRangePickerComponent };
applyMixins(DateRangePickerComponent, [ComponentBase, React.Component]);
