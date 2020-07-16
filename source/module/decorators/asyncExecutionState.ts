/**
 * Декоратор метода для изменения в стейте флага, который отражает
 * состояние выполнения промиса, возвращённого из метода.
 *
 * P.S.: Метод должен быть определён в классе, который реализует
 * интерфейс React.Component.
 *
 * @param stateField - название флага
 */
export function asyncExecutionState(stateField: string) {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        let oldValue = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const context = this as React.Component;
            const setState = context.setState;
            const isPromise = (obj: any) => !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';

            if (!setState) return oldValue.apply(context, args);

            context.setState({ [stateField]: true });
            let functionResult = oldValue.apply(context, args) as Promise<any>;

            if (!isPromise(functionResult)) {
                context.setState({ [stateField]: false });
                return oldValue.apply(context, args);
            }

            return functionResult
                .then((res) => {
                    context.setState({ [stateField]: false });
                    return res;
                })
                .catch((e) => {
                    context.setState({ [stateField]: false });
                    throw e;
                });
        };

        return descriptor;
    };
}
