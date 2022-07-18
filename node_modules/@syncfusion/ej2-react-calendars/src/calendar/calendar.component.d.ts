import * as React from 'react';
import { Calendar, CalendarModel } from '@syncfusion/ej2-calendars';
import { DefaultHtmlAttributes } from '@syncfusion/ej2-react-base';
/**
 * Represents the Essential JS 2 React Calendar Component.
 * ```ts
 * <CalendarComponent value={date}></CalendarComponent>
 * ```
 */
export declare class CalendarComponent extends Calendar {
    state: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<CalendarModel & DefaultHtmlAttributes>;
    setState: any;
    private getDefaultAttributes;
    initRenderCalled: boolean;
    private checkInjectedModules;
    private immediateRender;
    props: Readonly<{
        children?: React.ReactNode | React.ReactNode[];
    }> & Readonly<CalendarModel & DefaultHtmlAttributes>;
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
