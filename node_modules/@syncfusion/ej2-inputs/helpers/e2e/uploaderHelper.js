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
    var uploaderHelper = /** @class */ (function (_super) {
        __extends(uploaderHelper, _super);
        function uploaderHelper(id, wrapperFn) {
            var _this = _super.call(this) || this;
            _this.id = id;
            if (wrapperFn !== undefined) {
                _this.wrapperFn = wrapperFn;
            }
            return _this;
        }
        uploaderHelper.prototype.selector = function (arg) {
            return (this.wrapperFn ? this.wrapperFn(arg) : arg);
        };
        uploaderHelper.prototype.getElement = function () {
            return this.selector('#' + this.id);
        };
        uploaderHelper.prototype.getWrapperElement = function () {
            return this.selector('.e-upload.e-lib');
        };
        uploaderHelper.prototype.getSelectWrapperElement = function () {
            return this.selector('.e-upload.e-lib .e-file-select-wrap');
        };
        uploaderHelper.prototype.getButtonElement = function () {
            return this.selector('.e-upload.e-lib .e-file-select-wrap .e-css.e-btn');
        };
        uploaderHelper.prototype.getFileWrapperElement = function () {
            return this.selector('.e-upload.e-lib .e-file-select-wrap .e-file-select');
        };
        uploaderHelper.prototype.getInputElement = function () {
            return this.selector('.e-upload.e-lib .e-file-select-wrap .e-file-select .e-control.e-uploader.e-lib');
        };
        uploaderHelper.prototype.getDropElement = function () {
            return this.selector('.e-upload.e-lib .e-file-select-wrap .e-file-drop');
        };
        /* Auto upload*/
        uploaderHelper.prototype.getUploadedContainer = function () {
            return this.selector('.e-upload.e-lib .e-upload-files');
        };
        uploaderHelper.prototype.getUploadedSuccessElement = function () {
            return this.selector('.e-upload.e-lib .e-upload-files .e-upload-file-list.e-upload-success');
        };
        uploaderHelper.prototype.getFileContainerElement = function () {
            return this.selector('.e-upload.e-lib .e-upload-files .e-upload-file-list .e-file-container');
        };
        uploaderHelper.prototype.getFileNameElement = function () {
            return this.selector('.e-upload.e-lib .e-upload-files .e-upload-file-list .e-file-container .e-file-name');
        };
        uploaderHelper.prototype.getFileTypeElement = function () {
            return this.selector('.e-upload.e-lib .e-upload-files .e-upload-file-list .e-file-container .e-file-type');
        };
        uploaderHelper.prototype.getFileSizeElement = function () {
            return this.selector('.e-upload.e-lib .e-upload-files .e-upload-file-list .e-file-container .e-file-size');
        };
        uploaderHelper.prototype.getFileStatusElement = function () {
            return this.selector('.e-upload.e-lib .e-upload-files .e-upload-file-list .e-file-container .e-file-status');
        };
        uploaderHelper.prototype.getDeleteIcon = function () {
            return this.selector('.e-upload.e-lib .e-upload-files .e-upload-file-list .e-icons.e-file-delete-btn');
        };
        /*sequence upload */
        uploaderHelper.prototype.getUploadFileElement = function () {
            return this.selector('.e-upload.e-lib .e-upload-files .e-upload-file-list');
        };
        uploaderHelper.prototype.getFileRemoveIcon = function () {
            return this.selector('.e-upload.e-lib .e-upload-files .e-upload-file-list .e-icons.e-file-remove-btn');
        };
        uploaderHelper.prototype.getActionElements = function () {
            return this.selector('.e-upload.e-lib .e-upload-actions');
        };
        uploaderHelper.prototype.getClearActionElement = function () {
            return this.selector('.e-upload.e-lib .e-upload-actions .e-file-clear-btn');
        };
        uploaderHelper.prototype.getUploadActionElement = function () {
            return this.selector('.e-upload.e-lib .e-upload-actions .e-file-upload-btn');
        };
        uploaderHelper.prototype.getPlayActionElement = function () {
            return this.selector('.e-upload.e-lib .e-upload-files .e-upload-file-list .e-icons.e-file-play-btn');
        };
        uploaderHelper.prototype.getPauseActionElement = function () {
            return this.selector('.e-upload.e-lib .e-upload-files .e-upload-file-list .e-icons.e-file-pause-btn');
        };
        uploaderHelper.prototype.getFileAbortIcon = function () {
            return this.selector('.e-upload.e-lib .e-upload-files .e-upload-file-list .e-icons.e-file-abort-btn');
        };
        uploaderHelper.prototype.getFileReloadIcon = function () {
            return this.selector('.e-upload.e-lib .e-upload-files .e-upload-file-list .e-icons.e-file-reload-btn');
        };
        return uploaderHelper;
    }(e2e_1.TestHelper));
    exports.uploaderHelper = uploaderHelper;
});
