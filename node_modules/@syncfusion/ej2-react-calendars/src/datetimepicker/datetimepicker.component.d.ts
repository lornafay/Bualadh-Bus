import * as React from 'react';
import { DateTimePicker, DateTimePickerModel } from '@syncfusion/ej2-calendars';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents the Essential JS 2 React DateTimePicker Component.
 * ```ts
 * <DateTimePickerComponent value={dateTime}></DateTimePickerComponent>
 * ```
 */
export declare class DateTimePickerComponent extends DateTimePicker {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<DateTimePickerModel & DefaultHtmlAttributes>;
    setState: any;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    private immediateRender;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<DateTimePickerModel & DefaultHtmlAttributes>;
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
