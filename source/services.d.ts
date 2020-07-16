import * as t from 'io-ts';
import * as moment from 'moment';
import { DateRange } from 'moment-range';
import { CollectionDTOInterface, IBaseSortDTO, IGridCalendar, PaginationInterface } from './interfaces';

interface UtilServiceInterface {
    phoneMask(str: string | null): string;

    addSubStr(str: string, pos: number, subStr: string): string;

    concatPersonName(profileInfo: any | null, full?: boolean): string;

    getUniqElementsByArray(array: string[]): string[];

    promiseWithLoadingTable(promise: Promise<any>, setStateCallback: (params: any) => any): any;

    handlerOutsideClick(nodes: HTMLDivElement[], callbackOutside: () => any): any;

    thousandSeparator(sourceValue: number, length: number): string;

    getDecimal(num: number, power: number): string;

    parseDate(date: Date | null, moment: any): string;

    setFirstWordToUpperCase(str: string): string;

    chunkArray<T>(array: T[], size: number): T[][];

    xor(a: any, b: any): boolean;

    _calculateStep(
        num: number,
        length: number,
        step: number,
    ): number;

    _toRequiredStringLength(
        num: number,
        reqLength: number,
    ): string;
}

declare const UtilService: UtilServiceInterface;

interface TypeServiceInterface {
    createEnum<E>(e: any, name: string): t.Type<E>;

    showConsoleError(idEntity: string, classEntity: string, result: any): void;

    checkElement<T>(entityType: any, entityClass: any, entityName: string, entity: any): T | null;

    checkElementsCollection<T>(entityType: any, entityClass: any, entityName: string, collection: CollectionDTOInterface<any>): CollectionDTOInterface<T>;

    checkElementsArray<T>(entityType: any, entityClass: any, entityName: string, array: any[]): T[];
}

declare const TypeService: TypeServiceInterface;

interface DateServiceInterface {
    getVisibleFormatByDate(date: Date | null, withTime?: boolean): string | null;

    getLocalDate(date: Date | null, withTime?: boolean): string | null;

    getValidDate(date: string | number | Date | null): Date | null;

    isNow(day: moment.Moment): boolean;

    isDayInMonth(day: moment.Moment, monthDaysRange: DateRange | null): boolean;

    getGridCalendarByDate(date: moment.Moment | Date): IGridCalendar;
}

declare const DateService: DateServiceInterface;

interface ISortService {
    sortDirection: (sort: IBaseSortDTO, fieldName: string) => boolean | null;
    sortTable: (sort: IBaseSortDTO, fieldName: string, callback: (sort: IBaseSortDTO) => any) => any;
}

declare const SortService: ISortService;

interface ISaveFilterService {
    stringifyOptions: any;
    saveScrollPositionCallbackBind: any;
    queryStringParse: (search: string) => any;
    compressParams: (params: any) => string;
    replaceHistoryState: (props: any, filterPartFromState: any, notPush?: boolean) => any;
    saveScrollPosition: (props: any) => any;
    removeScrollPosition: () => any;
    goToTopScroll: (topScroll: number) => any;
    savePaginationToUrl: (props: any, statePagination: PaginationInterface) => any;
    checkSaveFilterAsPagination: (saveFilter: any) => any;
    checkSaveFilterAsDateRange: (saveFilter: any, field: string) => any;
    checkSaveFilterAsIntRange: (saveFilter: any, field: string) => any;
    checkSaveFilterAsArray: (saveFilter: any, field: string) => any;
    checkSaveFilterAsBoolean: (saveFilter: any, field: string) => any;
    filterPartFromStateAsArray: (array: any[]) => any[];
}

declare const SaveFilterService: ISaveFilterService;

interface IRegExpService {
    readonly PASSWORD: RegExp;
    readonly EMAIL: RegExp;
    readonly FULL_NAME: RegExp;
    readonly NON_CYRILLIC_SYMBOLS: RegExp;
}

declare const RegExpService: IRegExpService;

export {
    UtilService,
    TypeService,
    DateService,
    SortService,
    SaveFilterService,
    RegExpService,
};
