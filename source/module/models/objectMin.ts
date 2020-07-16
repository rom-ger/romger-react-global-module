import * as t from 'io-ts';

export const ObjectMinType = t.interface({
    id: t.string,
    name: t.string,
});

export interface ObjectMinDTO extends t.TypeOf<typeof ObjectMinType> {}

export class ObjectMin {
    id: string;
    name: string;

    constructor(params: ObjectMinDTO) {
        this.id = params.id;
        this.name = params.name;
    }
}
