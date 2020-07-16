import * as t from 'io-ts';
import { SimpleObjectInterface } from '../../interfaces';
import BASE_STATUS, { BaseStatusEnumType } from '../enums/baseStatus';

export const DictionaryEntryType = t.interface({
    id: t.string,
    name: t.string,
    status: t.union([BaseStatusEnumType, t.undefined]),
});

export interface DictionaryEntryDTO extends t.TypeOf<typeof DictionaryEntryType> {}

class DictionaryEntry {
    id: string;
    name: string;
    status?: SimpleObjectInterface;

    constructor(params: DictionaryEntryDTO) {
        this.id = params.id;
        this.name = params.name;
        if (params.status) {
            this.status = BASE_STATUS[params.status];
        }
    }
}

export { DictionaryEntry };
