import { AxiosInstance } from 'axios';
import { CollectionDTOInterface, IBaseActionConfig } from './interfaces';

declare class BaseActions {
    static DEFAULT_URL: string;
    static api: AxiosInstance;
    static API_RESOURCE(url: string, method?: string, params?: any, config?: any, withoutToast?: boolean, testApi?: boolean): Promise<any>;
    static MODEL_API_RESOURCE<DTO, Model>(config: IBaseActionConfig): Promise<Model | null>;
    static ARRAY_API_RESOURCE<DTO, Model>(config: IBaseActionConfig): Promise<Model[]>;
    static COLLECTION_API_RESOURCE<DTO, Model>(config: IBaseActionConfig): Promise<CollectionDTOInterface<Model>>;
    constructor();
}

export {
    BaseActions,
};
