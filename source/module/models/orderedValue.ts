import * as t from 'io-ts';

export const OrderedValueType = t.interface({
    orderNumber: t.number,
    value: t.unknown,
});

export interface OrderedValueDTO extends t.TypeOf<typeof OrderedValueType> {
}

class OrderedValue<T> {
    orderNumber: number;
    value: T;

    constructor(params: OrderedValueDTO) {
        this.orderNumber = params.orderNumber;
        this.value = params.value as T;
    }
}

export { OrderedValue };
