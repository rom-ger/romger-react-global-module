import { RgReactBaseService } from '@romger/react-base-components';
import axios, { AxiosInstance } from 'axios';
import { CollectionDTOInterface, IBaseActionConfig } from '../../interfaces';
import { TypeService } from '../services/typeService';

export class BaseActions {
    static DEFAULT_URL: string = '';
    static api: AxiosInstance = axios;

    static API_RESOURCE(url: string, method: string = RgReactBaseService.GET_METHOD, params: any = {}, config: any = {}, withoutToast: boolean = false, testApi: boolean = false): Promise<any> {
        if (method === RgReactBaseService.GET_METHOD) {
            let configForGet: any = RgReactBaseService.parseParamsAndConfig(method, params, config).config;
            configForGet.params = params;
            return RgReactBaseService.doPromise(this.api.get(`${testApi ? 'assets/testApi/' : this.DEFAULT_URL}${url}`, configForGet), withoutToast);
        }
        return RgReactBaseService.doPromise(this.api.post(`${testApi ? 'assets/testApi/' : this.DEFAULT_URL}${url}`, RgReactBaseService.parseParamsAndConfig(method, params, config).params, RgReactBaseService.parseParamsAndConfig(method, params, config).config), withoutToast);
    }

    /**
     * Получить с бэка одну сущность, прогнать её через тайп сервис и вернуть
     * @param config
     */
    static MODEL_API_RESOURCE<DTO, Model>(config: IBaseActionConfig): Promise<Model | null> {
        return this.API_RESOURCE(
            config.testApi ? (config.testApiUrl ? config.testApiUrl : '') : (config.url ? config.url : ''),
            config.method ? config.method : RgReactBaseService.GET_METHOD,
            !config.method || config.method === RgReactBaseService.GET_METHOD ? config.queryParams : {},
            this.getAxiosConfigByBaseActionConfig(config),
            !!config.withoutToast,
            !!config.testApi,
        )
            .then((dto: DTO | null) => config.modelType && dto
                                        ?
                                            TypeService.checkElement<Model>(config.modelType, config.model, config.model && config.model.name ? config.model.name : 'Неизвестная модель', dto)
                                        :
                                            (dto ? new config.model(dto) : null),
            );
    }

    /**
     * Получить с бэка массив сущностей, прогнать их через тайп сервис и вернуть
     * @param config
     */
    static ARRAY_API_RESOURCE<DTO, Model>(config: IBaseActionConfig): Promise<Model[]> {
        return this.API_RESOURCE(
            config.testApi ? (config.testApiUrl ? config.testApiUrl : '') : (config.url ? config.url : ''),
            config.method ? config.method : RgReactBaseService.GET_METHOD,
            !config.method || config.method === RgReactBaseService.GET_METHOD ? config.queryParams : {},
            this.getAxiosConfigByBaseActionConfig(config),
            !!config.withoutToast,
            !!config.testApi,
        )
            .then((dto: DTO[]) => config.modelType
                                        ?
                                            TypeService.checkElementsArray<Model>(config.modelType, config.model, config.model && config.model.name ? config.model.name : 'Неизвестная модель', dto)
                                        :
                                            dto.map(el => new config.model(el)),
            );
    }

    /**
     * Получить с бэка коллекцию сущностей, прогнать их через тайп сервис и вернуть
     * @param config
     */
    static COLLECTION_API_RESOURCE<DTO, Model>(config: IBaseActionConfig): Promise<CollectionDTOInterface<Model>> {
        return this.API_RESOURCE(
            config.testApi ? (config.testApiUrl ? config.testApiUrl : '') : (config.url ? config.url : ''),
            config.method ? config.method : RgReactBaseService.GET_METHOD,
            !config.method || config.method === RgReactBaseService.GET_METHOD ? config.queryParams : {},
            this.getAxiosConfigByBaseActionConfig(config),
            !!config.withoutToast,
            !!config.testApi,
        )
            .then((dto: CollectionDTOInterface<DTO>) => config.modelType
                                                                ?
                                                                    TypeService.checkElementsCollection<Model>(config.modelType, config.model, config.model && config.model.name ? config.model.name : 'Неизвестная модель', dto)
                                                                :
                                                                    ({
                                                                        items: dto.items.map(el => new config.model(el)),
                                                                        totalCount: dto.totalCount,
                                                                    }),
            );
    }

    /**
     * Мапим конфиги для axios
     * @param config
     */
    private static getAxiosConfigByBaseActionConfig(config: IBaseActionConfig): any {
        let result: any = {};
        if (config.config) {
            result = config.config;
        }
        if (config.bodyParams || config.headers || (config.queryParams && config.method === RgReactBaseService.POST_METHOD)) {
            result.params = config.queryParams ? config.queryParams : {};
            result.data = config.bodyParams ? config.bodyParams : {};
            result.headers = config.headers ? config.headers : (config.config && config.config.headers ? config.config.headers : {});
        }
        return result;
    }
}
