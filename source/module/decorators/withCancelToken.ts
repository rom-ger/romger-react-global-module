
import Axios, { CancelTokenSource } from 'axios';

/**
 * Закрывать предыдущий вызов api, при новом вызове
 */
export function withCancelToken() {
    let cancelToken: CancelTokenSource | null = null;
    return (target: any, key: string, value: any) => {
        return {
            value(...args: any[]) {
                if (!!cancelToken && !!cancelToken.cancel) {
                    cancelToken.cancel();
                    cancelToken = null;
                }
                cancelToken = Axios.CancelToken.source();
                args.push(cancelToken ? cancelToken.token : null);
                return value.value.apply(this, args);
            },
        };
    };
}
