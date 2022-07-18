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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Property, ChildProperty } from '@syncfusion/ej2-base';
var MaskPlaceholder = /** @class */ (function (_super) {
    __extends(MaskPlaceholder, _super);
    function MaskPlaceholder() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('day')
    ], MaskPlaceholder.prototype, "day", void 0);
    __decorate([
        Property('month')
    ], MaskPlaceholder.prototype, "month", void 0);
    __decorate([
        Property('year')
    ], MaskPlaceholder.prototype, "year", void 0);
    __decorate([
        Property('day of the week')
    ], MaskPlaceholder.prototype, "dayOfTheWeek", void 0);
    __decorate([
        Property('hour')
    ], MaskPlaceholder.prototype, "hour", void 0);
    __decorate([
        Property('minute')
    ], MaskPlaceholder.prototype, "minute", void 0);
    __decorate([
        Property('second')
    ], MaskPlaceholder.prototype, "second", void 0);
    return MaskPlaceholder;
}(ChildProperty));
export { MaskPlaceholder };
