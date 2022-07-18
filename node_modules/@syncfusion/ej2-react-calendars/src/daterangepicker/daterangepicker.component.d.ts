import * as React from 'react';
import { DateRangePicker, DateRangePickerModel } from '@syncfusion/ej2-calendars';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
export interface DateRangePickerTypecast {
    start?: string | Function | any;
    end?: string | Function | any;
}
/**
 * Represents the Essential JS 2 React DateRangePicker Component.
 * ```ts
 * <DateRangePickerComponent startDate={date} endDate={date}></DateRangePickerComponent>
 * ```
 */
export declare class DateRangePickerComponent extends DateRangePicker {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<DateRangePickerModel & DefaultHtmlAttributes | DateRangePickerTypecast>;
    setState: any;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    directivekeys: {
        [key: string]: Object;
    };
    private immediateRender;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<DateRangePickerModel & DefaultHtmlAttributes | DateRangePickerTypecast>;
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
