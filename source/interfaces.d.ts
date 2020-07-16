import * as moment from 'moment';
import { DateRange } from 'moment-range';

interface BaseListDictionaryParamsInterface {
    pageNo?: number;
    pageSize?: number;
    orderBy?: string;
    orderByDirection?: string;
    status?: string | null;
    searchString?: string | null;
}

interface CollectionDTOInterface<T> {
    items: T[];
    totalCount: number;
}

interface PaginationInterface {
    pageNo: number;
    pageSize: number;
    totalCount: number;
}

interface SimpleObjectInterface {
    name: string;
    value: string;
}

interface ISimpleValue<T> {
    value: T;
}

interface RedirectInterface {
    pathname: string;
    search: any;
}

interface BaseStatusInterface {
    [value: string]: SimpleObjectInterface;

    ACTIVE: SimpleObjectInterface;
    DELETED: SimpleObjectInterface;
    NOT_ACTUAL: SimpleObjectInterface;
}

interface ISortDirection {
    [value: string]: SimpleObjectInterface;

    ASC: SimpleObjectInterface;
    DESC: SimpleObjectInterface;
}

interface IGridCalendar {
    selectedYear: number;
    selectedMonth: number;
    gridDaysByWeek: moment.Moment[][];
    monthDaysRange: DateRange;
}

interface IBaseActionConfig {
    url?: string;
    testApiUrl?: string;
    method?: string | null;
    queryParams?: any | null;
    bodyParams?: any | null;
    headers?: any | null;
    withoutToast?: boolean | null;
    modelType?: any;
    config?: any;
    model?: any;
    testApi?: boolean;
}

interface IBaseSortDTO {
    direction: string;
    field: string;
}

interface BreadCrumbsItems {
    title: string;
    state?: string;
    hide?: boolean;
}

interface IContextMenuItem {
    title: string;
    icon?: string;
    hide?: boolean;
    onClick?(): any;
}

interface RgTabItem {
    title: string;
    classItem?: string;
    body: JSX.Element;
    hide?: boolean;
}

export {
    BaseListDictionaryParamsInterface,
    CollectionDTOInterface,
    PaginationInterface,
    BaseStatusInterface,
    RedirectInterface,
    SimpleObjectInterface,
    ISimpleValue,
    ISortDirection,
    IGridCalendar,
    IBaseActionConfig,
    IBaseSortDTO,
    BreadCrumbsItems,
    IContextMenuItem,
    RgTabItem,
};
