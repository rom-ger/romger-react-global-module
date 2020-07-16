import { RgReactBaseComponent, RgReactBaseComponentInterface } from '@romger/react-base-components';
import { BreadCrumbsItems } from '../../../interfaces';
import { GlobalStore } from '../../store/globalStore';
import breadCrumbsTemplate from './breadCrumbsTemplate';

interface BreadCrumbsProps {
    items: BreadCrumbsItems[];
    globalStore?: GlobalStore;
}

export interface BreadCrumbsInterface extends RgReactBaseComponentInterface {
    props: BreadCrumbsProps;
}

export class BreadCrumbs extends RgReactBaseComponent<BreadCrumbsProps, {}> implements BreadCrumbsInterface {
    render(): false | JSX.Element {
        return (breadCrumbsTemplate(this));
    }
}

export default BreadCrumbs;
