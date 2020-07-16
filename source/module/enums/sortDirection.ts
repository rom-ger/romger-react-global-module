import { ISortDirection } from '../../interfaces';
import { TypeService } from '../services/typeService';

export enum SortDirectionEnum {
    ASC = 'ASC',
    DESC = 'DESC',
}

const SORT_DIRECTION: ISortDirection = {
    ASC: {
        name: 'По-возрастанию',
        value: 'ASC',
    },
    DESC: {
        name: 'По-убыванию',
        value: 'DESC',
    },
};

export default SORT_DIRECTION;

export const SortDirectionEnumType = TypeService.createEnum<SortDirectionEnum>(SortDirectionEnum, 'SortDirectionEnum');
