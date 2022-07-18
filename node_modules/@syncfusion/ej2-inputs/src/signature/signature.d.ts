import { EmitType, INotifyPropertyChanged } from '@syncfusion/ej2-base';
import { SignatureBase, SignatureBeforeSaveEventArgs, SignatureChangeEventArgs } from '../common/signature-base';
import { SignatureModel } from './signature-model';
/**
 * The Signature component allows user to draw smooth signatures as vector outline of strokes using variable width bezier curve interpolation.
 * It allows to save signature as image.
 * You can use your finger, pen, or mouse on a tablet, touchscreen, etc., to draw your own signature on this Signature component.
 * Signature component is a user interface to draw the Signature or Text.
 * It provides supports for various Background color, Stroke color and Background Image.
 * ```html
 * <canvas id="signature"></canvas>
 * ```
 * ```typescript
 * <script>
 *   let signatureObj: Signature = new Signature(null , "#signature");
 * </script>
 * ```
 */
export declare class Signature extends SignatureBase implements INotifyPropertyChanged {
    /**
     * Gets or sets the background color of the component.
     * The background color of the component that accepts hex value, rgb and text (like 'red'). The default value is ''.
     *
     * @default ''
     */
    backgroundColor: string;
    /**
     * Gets or sets the background image for the component.
     * An image that used to fill the background of the component. The default value is ''.
     *
     * @default ''
     */
    backgroundImage: string;
    /**
     * Gets or sets whether to disable the signature component where the opacity is set to show disabled state.
     * True, if the signature component is disabled for user interaction. The default value is false.
     *
     * @default false
     */
    disabled: boolean;
    /**
     * Gets or sets whether to prevent the interaction in signature component.
     * True, if the signature component is read only state where the user interaction is prevented. The default value is false.
     *
     * @default false
     */
    isReadOnly: boolean;
    /**
     * Gets or sets whether to save the signature along with Background Color and background Image while saving.
     * True, if signature component to save with background. The default value is true.
     *
     * @default true
     */
    saveWithBackground: boolean;
    /**
     * Gets or sets the stroke color of the signature.
     * The color of the signature stroke that accepts hex value, rgb and text (like 'red'). The default value is "#000000".
     *
     * @default '#000000'
     */
    strokeColor: string;
    /**
     * Gets or sets the minimum stroke width for signature.
     * The signature component calculates stroke width based on Velocity, MinStrokeWidth and MaxStrokeWidth.
     * The minimum width of stroke. The default value is 0.5.
     *
     * @default 0.5
     */
    minStrokeWidth: number;
    /**
     * Gets or sets the maximum stroke width for signature.
     * The signature component calculates stroke width based on Velocity, MinStrokeWidth and MaxStrokeWidth.
     * The maximum width of stroke. The default value is 2.0.
     *
     * @default 2
     */
    maxStrokeWidth: number;
    /**
     * Gets or sets the velocity to calculate the stroke thickness based on the pressure of the contact on the digitizer surface.
     * The Signature component calculates stroke thickness based on Velocity, MinStrokeWidth and MaxStrokeWidth.
     * The default value is 0.7.
     *
     * @default 0.7
     */
    velocity: number;
    /**
     * Overrides the global culture and localization value for this component. Default global culture is 'en-US'.
     *
     * @default 'en-US'
     * @private
     */
    locale: string;
    /**
     * Specifies the Signature in RTL mode that displays the content in the right-to-left direction.
     *
     * @default false
     * @private
     */
    enableRtl: boolean;
    /**
     * Gets or sets whether to persist component's state between page reloads.
     * True, if the component's state persistence is enabled. The default value is false.
     * Component's property will be stored in browser local storage to persist component's state when page reloads.
     *
     * @default false
     */
    enablePersistence: boolean;
    /**
     * Gets or sets an event callback that is raised while saving the signature.
     * The file name and the file type can be changed using SignatureBeforeSaveEventArgs and SignatureFileType.
     * The event callback is raised only for the keyboard action (Ctrl + S).
     *
     * @event beforeSave
     */
    beforeSave: EmitType<SignatureBeforeSaveEventArgs>;
    /**
     * Gets or sets an event callback that is raised for the actions like undo, redo, clear and while user complete signing on signature component.
     *
     * @event change
     */
    change: EmitType<SignatureChangeEventArgs>;
    /**
     * Triggers once the component rendering is completed.
     *
     * @event created
     */
    created: EmitType<Event>;
    /**
     * Constructor for creating the widget.
     *
     * @param {SignatureModel} options - Specifies the Signature model.
     * @param {string | HTMLCanvasElement} element - Specifies the element.
     * @private
     */
    constructor(options?: SignatureModel, element?: string | HTMLCanvasElement);
    protected preRender(): void;
    /**
     * To Initialize the component rendering
     *
     * @private
     * @returns {void}
     */
    protected render(): void;
    initialize(): void;
    /**
     * To get component name.
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
     * Called internally if any of the property value changed.
     *
     * @param  {SignatureModel} newProp - Specifies new properties
     * @param  {SignatureModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    onPropertyChanged(newProp: SignatureModel, oldProp: SignatureModel): void;
}
