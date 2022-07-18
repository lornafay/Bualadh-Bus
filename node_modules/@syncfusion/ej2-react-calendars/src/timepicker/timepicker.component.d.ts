import * as React from 'react';
import { TimePicker, TimePickerModel } from '@syncfusion/ej2-calendars';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents the Essential JS 2 React TimePicker Component.
 * ```html
 * <TimePickerComponent value={value}></TimePickerComponent>
 * ```
 */
export declare class TimePickerComponent extends TimePicker {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<TimePickerModel & DefaultHtmlAttributes>;
    setState: any;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    private immediateRender;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<TimePickerModel & DefaultHtmlAttributes>;
    forceUpdate: (callBack?: () => any) => void;
    context: Object;
    portals: any;
    isReactComponent: Object;
    refs: {
        [key: string]: React.ReactInstance;
    };
    constructor(props: any);
    render(): any;
}
