import { BaseStatusInterface } from '../../interfaces';
import { TypeService } from '../services/typeService';

export enum BaseStatusEnum {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED',
    NOT_ACTUAL = 'NOT_ACTUAL',
}

const BASE_STATUS: BaseStatusInterface = {
    ACTIVE: {
        name: 'Активно',
        value: 'ACTIVE',
    },
    DELETED: {
        name: 'Скрыто',
        value: 'DELETED',
    },
    NOT_ACTUAL: {
        name: 'Не активно',
        value: 'NOT_ACTUAL',
    },
};

export default BASE_STATUS;

export const BaseStatusEnumType = TypeService.createEnum<BaseStatusEnum>(BaseStatusEnum, 'BaseStatusEnum');
