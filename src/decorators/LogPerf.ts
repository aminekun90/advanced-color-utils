import { Logger } from 'tslog';
const logger = new Logger({ name: 'LogPerf' });

export function LogPerf(level: string): MethodDecorator {
    return function (_: any, propertyKey: string | symbol, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function (...args: any[]) {
            const start = performance.now();
            const result = originalMethod.apply(this, args);
            const end = performance.now();
            (logger as unknown as Record<string,Function>)[level](`${String(propertyKey)} took ${(end - start).toFixed(2)} ms to execute.`);
            return result;
        };

        return descriptor;
    };
}