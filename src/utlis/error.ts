import { Message } from 'element-ui';

export function catchException(showAlert = false) {
    return (
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) => {
        const method = descriptor.value; // 被装饰的函数本身
        descriptor.value = (...parameters: any) => {
            try {
                console.log('parameters: ', parameters);
                const result = method.apply(target, parameters);
                if (result instanceof Promise) {
                    return result.catch((e) => {
                        const error = formatError(e, showAlert);
                        return Promise.reject(error);
                    });
                } else {
                    return result;
                }
            } catch (e) {
                const error = formatError(e, showAlert);
                throw error;
            }
        };
    };
}


export function formatError(e: any, showAlert = false) {
    if (e.response && e.response.status === 433) {
        window.location.href = e.response.data;
    }
    // 使用 ajax 返回的message
    if (e.response && e.response.data && e.response.data.message) {
        e.message = e.response.data.message;
    }

    if (showAlert) {
        Message.error(e.message);
    }

    return new Error(e);
}