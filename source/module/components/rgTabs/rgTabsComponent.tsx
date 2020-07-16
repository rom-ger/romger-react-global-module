import { RgReactBaseComponent, RgReactBaseComponentInterface } from '@romger/react-base-components';
import { RgTabItem } from '../../../interfaces';
import rgTabsTemplate from './rgTabsTemplate';

interface RgTabsProps {
    tabs: RgTabItem[];
    selectIndex?: number;
    selectIndexChangeCallback?: (selectIndex: number) => any;
}

interface RgTabsState {
    selectIndex: number;
    full: boolean;
}

export interface IRgTabs extends RgReactBaseComponentInterface {
    state: RgTabsState;
    props: RgTabsProps;
    headerRef: HTMLDivElement | null;
    itemsWrapRef: HTMLDivElement | null;
    arrowRightRef: HTMLDivElement | null;
    arrowLeftRef: HTMLDivElement | null;
    showFullRef: HTMLDivElement | null;
    overflowContent: boolean;
    timeout: number;
    interval: number;
    lastSaveWidth: number;
    showLeftArrow: () => boolean;
    showRightArrow: () => boolean;
    goLeft: () => any;
    goRight: () => any;
    checkFullView: () => any;
    selectTab: (index: number) => void;
}

export default class RgTabs extends RgReactBaseComponent<RgTabsProps, RgTabsState> implements IRgTabs {
    headerRef: HTMLDivElement | null = null;
    itemsWrapRef: HTMLDivElement | null = null;
    arrowRightRef: HTMLDivElement | null = null;
    arrowLeftRef: HTMLDivElement | null = null;
    showFullRef: HTMLDivElement | null = null;
    timeout: number = 300;
    interval: number = 0;
    lastSaveWidth: number = 0;

    readonly state: RgTabsState = {
        selectIndex: 0,
        full: false,
    };

    get overflowContent(): boolean {
        if (!this.headerRef || !this.itemsWrapRef) {
            return false;
        }
        return !!this.state.full || this.headerRef.clientWidth < this.itemsWrapRef.clientWidth;
    }

    componentWillUnmount() {
        if (this.interval) {
            window.clearInterval(this.interval);
        }
    }

    componentDidMount() {
        this.interval = window.setInterval(() => this.checkResize(), this.timeout);
        if (this.props.selectIndex) {
            this.setState({
                selectIndex: this.props.selectIndex >= this.props.tabs.length ? 0 : this.props.selectIndex,
            });
        }
    }

    /**
     * Реагируем на изменение ширины
     */
    checkResize = () => {
        if (this.headerRef && this.headerRef.clientWidth !== this.lastSaveWidth) {
            this.lastSaveWidth = this.headerRef.clientWidth;
            this.forceUpdate();
            this.checkFullView();
        }
    }

    /**
     * Выбрать таб
     * @param index
     */
    selectTab = (index: number): void => {
        let timeoutUpdate: boolean = this.state.full;
        if (!!this.props.selectIndexChangeCallback) {
            this.props.selectIndexChangeCallback(index);
        }
        this.setState(
            {
                selectIndex: index,
                full: false,
            },
            () => {
                if (timeoutUpdate) {
                    return this.checkFullView();
                }
                if (!this.headerRef || !this.itemsWrapRef) {
                    return;
                }
                let tab: Element | undefined = this.itemsWrapRef.children[index];
                if (!tab) {
                    return;
                }
                let domReactParent: DOMRect = this.headerRef.getBoundingClientRect();
                let domReactTab: DOMRect = tab.getBoundingClientRect();
                let halfParent: number = domReactParent.left + (domReactParent.width / 2);
                let halfTab: number = domReactTab.left + (domReactTab.width / 2);
                let currentLeft: number = this.getLeftNumber(this.itemsWrapRef.style.left);
                let newLeft: number = currentLeft - (halfTab - halfParent);
                let delta: number = this.itemsWrapRef.clientWidth - this.headerRef.clientWidth;
                this.itemsWrapRef.style.left = `${newLeft > 0 || delta < 0 ? 0 : (newLeft < delta * -1 ? delta * -1 : newLeft)}px`;
                window.setTimeout(() => this.forceUpdate(), this.timeout);
            },
        );
    }

    /**
     * Надо ли показывать левую стрелку
     */
    showLeftArrow = (): boolean => {
        if (!this.headerRef || !this.itemsWrapRef) {
            return false;
        }
        return this.getLeftNumber(this.itemsWrapRef.style.left) < 0;
    }

    /**
     * Надо ли показывать правую стрелку
     */
    showRightArrow = (): boolean => {
        if (!this.headerRef || !this.itemsWrapRef) {
            return false;
        }
        return this.getLeftNumber(this.itemsWrapRef.style.left) * -1 + this.headerRef.clientWidth < this.itemsWrapRef.clientWidth;
    }

    /**
     * Получить числовое значение значения left
     */
    getLeftNumber = (leftString: string): number => {
        return +leftString.split('px')[0];
    }

    /**
     * Скролим влево
     */
    goLeft = () => {
        if (!this.headerRef || !this.itemsWrapRef) {
            return;
        }
        let currentLeft: number = this.getLeftNumber(this.itemsWrapRef.style.left);
        let newLeft: number = currentLeft + (this.headerRef.clientWidth / 2);
        this.itemsWrapRef.style.left = `${newLeft > 0 ? 0 : newLeft}px`;
        window.setTimeout(() => this.forceUpdate(), this.timeout);
    }

    /**
     * Скролим вправо
     */
    goRight = () => {
        if (!this.headerRef || !this.itemsWrapRef) {
            return;
        }
        let currentLeft: number = this.getLeftNumber(this.itemsWrapRef.style.left);
        let newLeft: number = currentLeft - (this.headerRef.clientWidth / 2);
        this.itemsWrapRef.style.left = `${newLeft < (this.itemsWrapRef.clientWidth - this.headerRef.clientWidth) * -1 ? (this.itemsWrapRef.clientWidth - this.headerRef.clientWidth) * -1 : newLeft}px`;
        window.setTimeout(() => this.forceUpdate(), this.timeout);
    }

    /**
     * Что делать при изменении отображения
     */
    checkFullView = () => {
        this.forceUpdate();
        if (!this.headerRef || !this.showFullRef) {
            return;
        }
        this.showFullRef.style.top = `${this.headerRef.clientHeight + (this.state.full ? 3 : 2)}px`;
        if (this.state.full) {
            return;
        }
        window.setTimeout(() => this.selectTab(this.state.selectIndex), this.timeout);
    }

    render(): false | JSX.Element {
        return rgTabsTemplate(this);
    }
}
