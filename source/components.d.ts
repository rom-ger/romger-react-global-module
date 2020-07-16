import * as moment from 'moment';
import * as React from 'react';
import { BreadCrumbsItems, IContextMenuItem, RgTabItem } from './interfaces';
import { GlobalStore } from './store';

interface IDynamicImportProps {
    load: () => any;
    propsParent?: any;
}

declare class DynamicImport extends React.Component<IDynamicImportProps, any> {
}

interface IBreadCrumbsProps {
    items: BreadCrumbsItems[];
    globalStore?: GlobalStore;
}

declare class BreadCrumbs extends React.Component<IBreadCrumbsProps, any> {
}

interface IContextMenuProps {
    items: IContextMenuItem[];
}

declare class ContextMenu extends React.Component<IContextMenuProps, any> {
}

interface IRgTabsProps {
    tabs: RgTabItem[];
    selectIndex?: number;
    selectIndexChangeCallback?: (selectIndex: number) => any;
}

declare class RgTabs extends React.Component<IRgTabsProps, any> {
}

interface IMonthViewProps {
    globalStore?: GlobalStore;
    year: number;
    month: number;
    withoutYearTitle?: boolean;
    stepByMonthCallback?: (back?: boolean) => any;
    defaultStepByMonthCallback?: (year: number, month: number) => any;
    selectedDays?: moment.Moment[];
    nowDay?: moment.Moment;
    onClickDayCallback?: (day: moment.Moment) => any;
}

declare class MonthView extends React.Component<IMonthViewProps, any> {
}

export {
    DynamicImport,
    BreadCrumbs,
    ContextMenu,
    RgTabs,
    MonthView,
};
