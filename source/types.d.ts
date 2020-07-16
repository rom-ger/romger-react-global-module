import * as t from 'io-ts';

declare const DateType: t.UnionC<[t.StringC, t.NumberC]>;

export {
    DateType,
};
