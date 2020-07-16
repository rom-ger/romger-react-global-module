import { action, observable } from 'mobx';
import { RedirectInterface } from '../../interfaces';

class GlobalStore {
    @observable loading: boolean;
    @observable loadingText: string | null;
    @observable loadingShadowBackground: boolean;
    @observable redirect: RedirectInterface | null;
    @observable pressKeyCode: number | null;
    @observable location: any;
    @observable prevLocation: any;
    KEY_CODE_CTRL: number;

    constructor() {
        this.loading = false;
        this.loadingText = null;
        this.loadingShadowBackground = false;
        this.redirect = null;
        this.pressKeyCode = null;
        this.prevLocation = null;
        this.KEY_CODE_CTRL = 17;
    }

    /**
     * Слушаем нажатие кнопки ctrl
     */
    handlerPressControl() {
        window.addEventListener('keydown', (e: KeyboardEvent) => this.setPressKeyCode(e.keyCode));
        window.addEventListener('keyup', (e: KeyboardEvent) => this.setPressKeyCode(null));
    }

    /**
     * Этот роут не надо записывать в историю
     * @param location
     * @param skipRoutes
     */
    isSkipRoute(location: any, skipRoutes: Array<string | string[]>): boolean {
        if (!location || !location.pathname) {
            return false;
        }
        return skipRoutes.some((el: string | string[]) => {
            if (typeof el === 'string') {
                return location.pathname.indexOf(el) !== -1;
            }
            return !el.some((child: string) => location.pathname.indexOf(child) === -1)
        });
    }

    @action('set location')
    setLocation(location: any, skipRoutes?: Array<string | string[]>) {
        this.prevLocation = this.location && (!skipRoutes || !skipRoutes.length || !this.isSkipRoute(this.location, skipRoutes)) ? { ...this.location } : null;
        this.location = location;
    }

    @action('set press key code')
    setPressKeyCode(keyCode: number | null) {
        this.pressKeyCode = keyCode;
    }

    @action('start loading')
    startLoading = (loadingText: string | null, shadowBackground: boolean) => {
        this.loading = true;
        this.loadingText = loadingText;
        this.loadingShadowBackground = shadowBackground;
    };

    @action('stop loading')
    stopLoading = () => {
        this.loading = false;
        this.loadingText = null;
        this.loadingShadowBackground = false;
    };

    @action('go to state')
    goToState = (stateName: string | null, params: any = null, url: string | null = null) => {
        if (this.pressKeyCode === this.KEY_CODE_CTRL) {
            if (url) {
                window.open(url, '_blank');
                return;
            }
            let paramsString = '';
            if (params) {
                paramsString = '?';
                Object.keys(params)
                    .forEach((key: string) => {
                        paramsString = `${paramsString}${key}=${params[key]}&`;
                    });
            }
            window.open(`${document.location.origin}/#${stateName}${paramsString}`, '_blank');
            return;
        }
        if (url) {
            window.location.href = url;
            return;
        }
        const scrollNode = document.getElementById('main-wrap');
        const scrollWrap = scrollNode ? scrollNode : window;
        if (scrollWrap.scrollTo) {
            scrollWrap.scrollTo(0, 0);
        } else if (!!scrollNode) {
            scrollNode.scrollTop = 0;
        }

        this.redirect = {
            pathname: stateName ? stateName : '',
            search: params ? params : null,
        };
    };

    @action('clear redirect')
    clearRedirect = () => {
        this.redirect = null;
    };
}

const globalStore = new GlobalStore();

export default globalStore;
export { GlobalStore };
