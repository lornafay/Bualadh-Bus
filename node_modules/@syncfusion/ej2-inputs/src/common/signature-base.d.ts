import { BlazorDotnetObject, Component } from '@syncfusion/ej2-base';
export declare abstract class SignatureBase extends Component<HTMLCanvasElement> {
    private pointX;
    private pointY;
    private time;
    private startPoint;
    private controlPoint1;
    private controlPoint2;
    private endPoint;
    private pointColl;
    private canvasContext;
    private lastVelocity;
    private lastWidth;
    private incStep;
    private snapColl;
    private minDistance;
    private previous;
    private interval;
    private timeout;
    private storedArgs;
    private isSignatureEmpty;
    private backgroundLoaded;
    private fileType;
    private fileName;
    private clearArray;
    private isBlazor;
    private isResponsive;
    private dotnetRef;
    /**
     * Gets or sets the background color of the component.
     *
     */
    backgroundColor: string;
    /**
     * Gets or sets the background image for the component.
     *
     */
    backgroundImage: string;
    /**
     * Gets or sets whether to disable the signature component where the opacity is set to show disabled state.
     *
     */
    disabled: boolean;
    /**
     * Gets or sets whether to prevent the interaction in signature component.
     *
     */
    isReadOnly: boolean;
    /**
     *  Gets or sets whether to save the signature along with Background Color and background Image while saving.
     *
     */
    saveWithBackground: boolean;
    /**
     * Gets or sets the stroke color of the signature.
     *
     */
    strokeColor: string;
    /**
     * Gets or sets the minimum stroke width for signature.
     *
     */
    minStrokeWidth: number;
    /**
     * Gets or sets the maximum stroke width for signature.
     *
     */
    maxStrokeWidth: number;
    /**
     * Gets or sets the velocity to calculate the stroke thickness based on the pressure of the contact on the digitizer surface.
     *
     */
    velocity: number;
    /**
     * Gets or sets the last signature url to maintain the persist state.
     *
     */
    signatureValue: string;
    /**
     * To Initialize the component rendering
     *
     * @private
     * @param {HTMLCanvasElement} element - Specifies the canvas element.
     * @param {BlazorDotnetObject} dotnetRef - Specifies for blazor client to server communication.
     * @returns {void}
     */
    initialize(element: HTMLCanvasElement, dotnetRef?: BlazorDotnetObject): void;
    private wireEvents;
    private unwireEvents;
    private setHTMLProperties;
    private mouseDownHandler;
    private mouseMoveHandler;
    private mouseUpHandler;
    private keyboardHandler;
    private resizeHandler;
    private beginStroke;
    private updateStroke;
    private updateStrokeWithThrottle;
    private delay;
    private createPoint;
    private point;
    private addPoint;
    private startDraw;
    private endDraw;
    private curveDraw;
    private strokeDraw;
    private arcDraw;
    private calculateCurveControlPoints;
    private bezierLengthCalc;
    private bezierPointCalc;
    private pointVelocityCalc;
    private distanceTo;
    private isRead;
    private enableOrDisable;
    private reDraw;
    private updateSnapCollection;
    private setBackgroundImage;
    private setBackgroundColor;
    protected loadPersistedSignature(): void;
    /**
     * To get the signature as Blob.
     *
     * @param {string} url - specify the url/base 64 string to get blob of the signature.
     * @returns {Blob}.
     */
    getBlob(url: string): Blob;
    private download;
    /**
     * To refresh the signature.
     *
     * @private
     * @returns {void}.
     */
    refresh(): void;
    /**
     * Erases all the signature strokes signed by user.
     *
     * @returns {void}.
     */
    clear(): void;
    /**
     * Undo the last user action.
     *
     * @returns {void}.
     */
    undo(): void;
    /**
     * Redo the last user action.
     *
     * @returns {void}.
     */
    redo(): void;
    private isClear;
    /**
     * To check whether the signature is empty or not.
     *
     * @returns {boolean}.
     */
    isEmpty(): boolean;
    /**
     * To check whether the undo collection is empty or not.
     *
     * @returns {boolean}.
     */
    canUndo(): boolean;
    /**
     * To check whether the redo collection is empty or not.
     *
     * @returns {boolean}.
     */
    canRedo(): boolean;
    /**
     * To draw the signature based on the given text, with the font family and font size.
     *
     * @param {string} text - specify text to be drawn as signature.
     * @param {string} fontFamily - specify font family of a signature.
     * @param {number} fontSize - specify font size of a signature.
     *
     * @returns {void}.
     */
    draw(text: string, fontFamily?: string, fontSize?: number): void;
    /**
     * To load the signature with the given base 64 string, height and width.
     *
     * @param {string} signature - specify the url/base 64 string to be drawn as signature.
     * @param {number} width - specify the width of the loaded signature image.
     * @param {number} height - specify the height of the loaded signature image.
     * @returns {void}.
     */
    load(signature: string, width?: number, height?: number): void;
    private saveBackground;
    /**
     * To save the signature with the given file type and file name.
     *
     * @param {SignatureFileType} type - specify type of the file to be saved a signature.
     * @param {string} fileName - specify name of the file to be saved a signature.
     *
     * @returns {void}.
     */
    save(type?: SignatureFileType, fileName?: string): void;
    private resetSnap;
    private toJPEG;
    private toSVG;
    /**
     * To save the signature as Blob.
     *
     * @returns {Blob}.
     */
    saveAsBlob(): Blob;
    /**
     * To get the signature as Base 64.
     *
     * @private
     * @param {SignatureFileType} type - Specifies the type of the image format.
     * @returns {string}.
     */
    getSignature(type?: SignatureFileType): string;
    /**
     * Get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    protected getModuleName(): string;
    /**
     * To get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    protected getPersistData(): string;
    /**
     * Removes the component from the DOM and detaches all its related event handlers.
     * Also it maintains the initial input element from the DOM.
     *
     * @method destroy
     * @returns {void}
     */
    destroy(): void;
    /**
     * Modified onPropertyChanged method for both blazor and EJ2 signature component.
     *
     * @private
     * @param {string} key - Specifies the property, which changed.
     * @param {string} value - Specifies the property value changed.
     * @returns {void}
     */
    propertyChanged(key: string, value: string | boolean | number): void;
}
/**
 * Defines the signature file type.
 */
export declare type SignatureFileType = 'Png' | 'Jpeg' | 'Svg';
/**
 * Interface for before save the canvas as image.
 */
export interface SignatureBeforeSaveEventArgs {
    /**
     * Gets or sets whether to cancel the save action. You can cancel and perform save operation programmatically.
     */
    cancel?: boolean;
    /**
     * Gets or sets the file name to be saved.
     */
    fileName?: string;
    /**
     * Gets or sets the file type to be saved.
     */
    type?: SignatureFileType;
}
/**
 * Interface for changes occur in the signature.
 */
export interface SignatureChangeEventArgs {
    /**
     * Gets or sets the action name of the signature.
     */
    actionName: string;
}
