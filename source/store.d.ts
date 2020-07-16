import { RedirectInterface } from './interfaces';

declare class GlobalStore {
    loading: boolean;
    loadingText: string | null;
    loadingShadowBackground: boolean;
    redirect: RedirectInterface | null;
    pressKeyCode: number | null;
    location: any;
    prevLocation: any;
    KEY_CODE_CTRL: number;
    setLocation(location: any, skipRoutes?: Array<string | string[]>): any;
    startLoading(loadingText: string | null, shadowBackground: boolean): any;
    stopLoading(): any;
    clearRedirect(): any;
    handlerPressControl(): any;
    setPressKeyCode(keyCode: number | null): any;
    goToState(stateName: string, params?: any, url?: string | null): any;
    isSkipRoute(location: any, skipRoutes: Array<string | string[]>): boolean;
}
declare const globalStore: GlobalStore;

export {
    GlobalStore, globalStore,
};
