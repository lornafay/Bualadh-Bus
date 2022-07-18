import * as React from 'react';
import { DatePicker, DatePickerModel } from '@syncfusion/ej2-calendars';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents the Essential JS 2 React DatePicker Component.
 * ```ts
 * <DatePickerComponent value={date}></DatePickerComponent>
 * ```
 */
export declare class DatePickerComponent extends DatePicker {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<DatePickerModel & DefaultHtmlAttributes>;
    setState: any;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    private immediateRender;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<DatePickerModel & DefaultHtmlAttributes>;
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
