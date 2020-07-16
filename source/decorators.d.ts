declare const withCancelToken: () => ((target: any, key: string, value: any) => {
    value(...args: any[]): any;
});

declare const debounce: (timeout?: number | undefined) => ((target: any, key: string, value: any) => {
    value(...args: any[]): any;
});

declare const throttle: (timeout?: number | undefined) => ((target: any, key: string, value: any) => {
    value(...args: any[]): any;
});

declare const asyncExecutionState: (stateField: string) => ((target: any, propertyKey: string, descriptor: PropertyDescriptor) => PropertyDescriptor);

export {
    withCancelToken,
    debounce,
    throttle,
    asyncExecutionState,
};
