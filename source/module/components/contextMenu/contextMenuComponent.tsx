import { RgReactBaseComponent, RgReactBaseComponentInterface } from '@romger/react-base-components';
import { IContextMenuItem } from '../../../interfaces';
import { UtilService } from '../../services/utilService';
import contextMenuTemplate from './contextMenuTemplate';

interface ContextMenuProps {
    items: IContextMenuItem[];
}

interface ContextMenuState {
    showMenu: boolean;
}

export interface ContextMenuInterface extends RgReactBaseComponentInterface {
    state: ContextMenuState;
    props: ContextMenuProps;
    menu: HTMLDivElement | null;
    toggleMenu(): any;
}

class ContextMenu
    extends RgReactBaseComponent<ContextMenuProps, ContextMenuState>
    implements ContextMenuInterface {
    menu: HTMLDivElement | null = null;

    readonly state: ContextMenuState = {
        showMenu: false,
    };

    /**
     * Открыть/Закрыть меню
     */
    toggleMenu() {
        this.setState({ showMenu: !this.state.showMenu }, () => {
            if (!!this.state.showMenu && !!this.menu) {
                UtilService.handlerOutsideClick(
                    [this.menu],
                    () => this.toggleMenu(),
                );
                this.checkClientRectMenu();
            } else {
                UtilService.callbackOutside = () => null;
            }
        });
    }

    /**
     * Проверяем, как наше меню поместилось в окно
     */
    checkClientRectMenu() {
        if (!this.menu) {
            return;
        }
        let offset: ClientRect | DOMRect = this.menu.getBoundingClientRect();
        let availableBottom: boolean =
            offset.top + this.menu.clientHeight <= window.innerHeight;
        let availableLeft: boolean = offset.left > 0;
        if (!availableBottom) {
            let delta: number =
                offset.top + this.menu.clientHeight - window.innerHeight;
            this.menu.style.top =
                `${(!!this.menu.style.top && +this.menu.style.top - delta < 0
                    ? 0
                    : (!!this.menu.style.top ? +this.menu.style.top : 0) -
                      delta)}px`;
        }
        if (!availableLeft) {
            this.menu.style.right =
                `${(!!this.menu.style.right
                    ? +this.menu.style.right + offset.left
                    : this.menu.style.right)}px`;
        }
    }

    render(): false | JSX.Element {
        return (contextMenuTemplate(this));
    }
}

export default ContextMenu;
