import * as t from 'io-ts';
import { BaseStatusEnum } from './enums';
import { SimpleObjectInterface } from './interfaces';

declare const ObjectMinType: t.TypeC<{
    id: t.StringC;
    name: t.StringC;
}>;

declare class ObjectMin {
    id: string;
    name: string;

    constructor(params: ObjectMinDTO);
}

interface ObjectMinDTO extends t.TypeOf<typeof ObjectMinType> {
}

declare const DictionaryEntryType: t.TypeC<{
    id: t.StringC;
    name: t.StringC;
    status: t.UnionC<[t.Type<BaseStatusEnum, BaseStatusEnum, unknown>, t.UndefinedC]>;
}>;

declare class DictionaryEntry {
    id: string;
    name: string;
    status?: SimpleObjectInterface;

    constructor(params: DictionaryEntryDTO);
}

interface DictionaryEntryDTO extends t.TypeOf<typeof DictionaryEntryType> {
}

declare const OrderedValueType: t.TypeC<{
    orderNumber: t.NumberC;
    value: t.UnknownC;
}>;

declare class OrderedValue<T> {
    orderNumber: number;
    value: T;

    constructor(params: OrderedValueDTO);
}

interface OrderedValueDTO extends t.TypeOf<typeof OrderedValueType> {
}

export {
    ObjectMin, ObjectMinDTO, ObjectMinType,
    DictionaryEntry, DictionaryEntryDTO, DictionaryEntryType,
    OrderedValue, OrderedValueDTO, OrderedValueType,
};
