/**
 * Дебаунс для методов
 * @param timeout
 */
export function debounce(timeout?: number) {
    let timeoutSave: number | null = null;
    let timeoutCurrent: number = timeout ? timeout : 500;
    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        let oldValue = descriptor.value;
        descriptor.value = function (...args: any[]) {
            if (timeoutSave) {
                window.clearTimeout(timeoutSave);
            }
            timeoutSave = window.setTimeout(
                () => oldValue.apply(this, args),
                timeoutCurrent,
            );
        };
        return descriptor;
    };
}
