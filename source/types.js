import * as t from 'io-ts';

let DateType = t.union([t.string, t.number]);

export {
    DateType
};
