import * as queryString from 'qs';
import { PaginationInterface } from '../../interfaces';
import { debounce } from '../decorators/debounce';
import { LZString } from './lz-string';

export class SaveFilterService {
    public static stringifyOptions: any = {
        arrayFormat: 'bracket',
    };

    public static saveScrollPositionCallbackBind: any = null;

    /**
     * Распарсить фильтры из url
     */
    public static queryStringParse = (search: string): any => {
        return queryString.parse(LZString.decompressFromEncodedURIComponent(search.replace('?', '')), SaveFilterService.stringifyOptions);
    }

    /**
     * Сжимаем объект в строку
     */
    public static compressParams = (params: any): string => {
        return LZString.compressToEncodedURIComponent(queryString.stringify(params, SaveFilterService.stringifyOptions));
    }

    /**
     * Заменить в истории текущий стейт
     */
    public static replaceHistoryState = (props: any, filterPartFromState: any, notPush?: boolean): any => {
        if (props.location.search.replace('?', '') === SaveFilterService.compressParams(filterPartFromState)) {
            return;
        }
        let saveFilter: any = SaveFilterService.queryStringParse(props.location.search);
        if (!saveFilter) {
            saveFilter = {};
        }
        let stateQueryString = SaveFilterService.compressParams({ ...saveFilter, ...filterPartFromState });
        if (notPush) {
            return props.history.replace(`${props.location.pathname}?${stateQueryString}`);
        }
        props.history.push(`${props.location.pathname}?${stateQueryString}`);
    }

    /**
     * Сохраняем позицию скрола
     */
    public static saveScrollPosition = (props: any) => {
        let element: HTMLElement | null = document.getElementById('main-wrap');
        if (!element) {
            return;
        }
        SaveFilterService.saveScrollPositionCallbackBind = (ev: any) => SaveFilterService._saveScrollPositionCallback(ev, props);
        element.addEventListener('scroll', SaveFilterService.saveScrollPositionCallbackBind);
    }

    /**
     * Удаляем прослушивание события сохранения позиции скрола
     */
    public static removeScrollPosition = () => {
        let element: HTMLElement | null = document.getElementById('main-wrap');
        if (!element) {
            return;
        }
        element.removeEventListener('scroll', SaveFilterService.saveScrollPositionCallbackBind);
        SaveFilterService.saveScrollPositionCallbackBind = () => null;
    }

    /**
     * Скролим страницу до нужного места
     */
    public static goToTopScroll = (topScroll: number) => {
        let element: HTMLElement | null = document.getElementById('main-wrap');
        if (!element || !element.scrollTo) {
            return;
        }
        element.scrollTo({ top: topScroll });
    }

    /**
     * Сохранить данные пейджинации в url
     */
    public static savePaginationToUrl = (props: any, statePagination: PaginationInterface) => {
        let saveFilter: any = SaveFilterService.queryStringParse(props.location.search);
        if (!saveFilter) {
            saveFilter = {};
        }
        saveFilter.pagination = statePagination;
        SaveFilterService.replaceHistoryState(props, saveFilter);
    }

    /**
     * чекаем параметр из сохранённых фильтров с типом пейджинация
     */
    public static checkSaveFilterAsPagination = (saveFilter: any): any => {
        if (saveFilter.pagination) {
            saveFilter.pagination = {
                pageNo: +saveFilter.pagination.pageNo,
                pageSize: +saveFilter.pagination.pageSize,
                totalCount: +saveFilter.pagination.totalCount,
            };
        }
        return saveFilter;
    }

    /**
     * чекаем параметр из сохранённых фильтров с типом диапазон дат
     */
    public static checkSaveFilterAsDateRange = (saveFilter: any, field: string): any => {
        if (saveFilter[field]) {
            saveFilter[field].from = saveFilter[field].from ? new Date(saveFilter[field].from) : null;
            saveFilter[field].to = saveFilter[field].to ? new Date(saveFilter[field].to) : null;
        }
        return saveFilter;
    }

    /**
     * чекаем параметр из сохранённых фильтров с типом диапазон чисел
     */
    public static checkSaveFilterAsIntRange = (saveFilter: any, field: string): any => {
        if (saveFilter[field]) {
            saveFilter[field].from = saveFilter[field].from !== null && saveFilter[field].from !== '' ? +saveFilter[field].from : null;
            saveFilter[field].to = saveFilter[field].to !== null && saveFilter[field].to !== '' ? +saveFilter[field].to : null;
        }
        return saveFilter;
    }

    /**
     * чекаем параметр из сохранённых фильтров с типом диапазон чисел
     */
    public static checkSaveFilterAsArray = (saveFilter: any, field: string): any => {
        if (saveFilter[field]) {
            saveFilter[field] = saveFilter[field].map((el: string) => JSON.parse(el));
        }
        return saveFilter;
    }

    /**
     * чекаем параметр из сохранённых фильтров с типом boolean
     */
    public static checkSaveFilterAsBoolean = (saveFilter: any, field: string): any => {
        saveFilter[field] = saveFilter[field] === 'true' ? true : (saveFilter[field] === 'false' ? false : null);
        return saveFilter;
    }

    /**
     * Парсим массив для сохранения фильтров
     */
    public static filterPartFromStateAsArray = (array: any[]): any[] => {
        return array ? array.map(el => JSON.stringify(el)) : [];
    }

    /**
     * Сохраняем позицию скрола
     */
    @debounce(300)
    public static _saveScrollPositionCallback(ev: any, props: any) {
        let saveFilter: any = SaveFilterService.queryStringParse(props.location.search);
        if (ev.srcElement) {
            saveFilter.topScroll = ev.srcElement.scrollTop;
        }
        SaveFilterService.replaceHistoryState(props, saveFilter, true);
    }
}
