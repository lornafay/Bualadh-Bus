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
import { ComplexBase } from '@syncfusion/ej2-react-base';
/**
 * `PresetsDirective` represent a presets of the react daterangepicker.
 * It must be contained in a daterangepicker component(`DateRangePickerComponent`).
 * ```tsx
 * <DateRangePickerComponent id='range'>
 * <PresetsDirective>
 * <PresetDirective label='Last Week' start={new Date('06/07/2018')} end= {new Date('06/01/2018')}></PresetDirective>
 * <PresetDirective label='Last Month' start={new Date('06/07/2018')} end= {new Date('05/07/2018')]></PresetDirective>
 * </PresetsDirective>
 * </DateRangePickerComponent>
 * ```
 */
var PresetDirective = /** @class */ (function (_super) {
    __extends(PresetDirective, _super);
    function PresetDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PresetDirective.moduleName = 'preset';
    return PresetDirective;
}(ComplexBase));
export { PresetDirective };
var PresetsDirective = /** @class */ (function (_super) {
    __extends(PresetsDirective, _super);
    function PresetsDirective() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PresetsDirective.propertyName = 'presets';
    PresetsDirective.moduleName = 'presets';
    return PresetsDirective;
}(ComplexBase));
export { PresetsDirective };
