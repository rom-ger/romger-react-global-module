/**
 * Тротлинг для функций
 * @param timeout
 */
export function throttle(timeout?: number) {
    let timeoutCurrent: number = timeout ? timeout : 300;
    let inThrottle: any;
    return (target: any, key: string, value: any) => {
        return {
            value(...args: any[]) {
                if (!inThrottle) {
                    inThrottle = setTimeout(() => inThrottle = false, timeoutCurrent);
                    return value.value.apply(this, args);
                }
                return;
            },
        };
    };
}
