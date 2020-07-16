import * as t from 'io-ts';
import { BaseStatusInterface, ISortDirection } from './interfaces';

declare enum BaseStatusEnum {
    ACTIVE = 'ACTIVE',
    DELETED = 'DELETED',
    NOT_ACTUAL = 'NOT_ACTUAL',
}

declare const BASE_STATUS: BaseStatusInterface;
declare const BaseStatusEnumType: t.Type<BaseStatusEnum, BaseStatusEnum, unknown>;

declare enum SortDirectionEnum {
    ASC = 'ASC',
    DESC = 'DESC',
}

declare const SORT_DIRECTION: ISortDirection;
declare const SortDirectionEnumType: t.Type<SortDirectionEnum, SortDirectionEnum, unknown>;

export {
    BaseStatusEnum, BASE_STATUS, BaseStatusEnumType,
    SORT_DIRECTION, SortDirectionEnum, SortDirectionEnumType,
};
