define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * Base E2E Helper Function
     */
    var TestHelper = /** @class */ (function () {
        function TestHelper() {
        }
        TestHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        TestHelper.prototype.setModel = function (property, value) {
            return Mapper.setModel(this.id, this.selector.bind(this), property, value);
        };
        TestHelper.prototype.getModel = function (property) {
            return Mapper.getModel(this.id, this.selector.bind(this), property);
        };
        TestHelper.prototype.invoke = function (fName, args) {
            if (args === void 0) { args = []; }
            return Mapper.invoke(this.id, this.selector.bind(this), fName, args);
        };
        TestHelper.prototype.eventHandler = function (eventName, callback) {
            return this.selector('#' + this.id).then(function (ele) {
                var inst = ele[0].ej2_instances[0];
                return inst[eventName] = callback;
            });
        };
        return TestHelper;
    }());
    exports.TestHelper = TestHelper;
    var Mapper = /** @class */ (function () {
        function Mapper() {
        }
        Mapper.setModel = function (id, selector, property, value) {
            var result;
            if (cy) {
                result = selector('#' + id).then(function (ele) {
                    return ele[0].ej2_instances[0][property] = value;
                });
            }
            return result;
        };
        Mapper.getModel = function (id, selector, property) {
            var result;
            if (cy) {
                result = selector('#' + id).then(function (ele) {
                    return ele[0].ej2_instances[0][property];
                });
            }
            return result;
        };
        Mapper.invoke = function (id, selector, fName, args) {
            if (args === void 0) { args = []; }
            var result;
            if (cy) {
                result = selector('#' + id).then(function (ele) {
                    var inst = ele[0].ej2_instances[0];
                    return inst[fName].call(inst, args);
                });
            }
            return result;
        };
        return Mapper;
    }());
});
