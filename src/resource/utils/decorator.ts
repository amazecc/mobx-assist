type NormalFunction = (...args: any[]) => any;

// 数装饰器生成器
export const decoratorCreator = (intercept: (f: NormalFunction, ...args: any) => void) => {
    return (_target: object, _propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<NormalFunction>) => {
        const fn = descriptor.value;
        descriptor.value = function (...args: any) {
            return intercept.call(this, fn!.bind(this, ...args), ...args);
        };
    };
};
