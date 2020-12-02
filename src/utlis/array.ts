export const isArrayString = (val: string) => {
    // 类似 '[1,2,3]'
    try {
        const res = JSON.parse(val);
        const type = Object.prototype.toString.call(res);
        // 排除 数字 和 数组(这两类也可以被 JSON.parse 转)
        if(type === '[object Number]' || type === '[object Object]') {
            throw Error('not json string');
        }
    } catch (e) {
        return false;
    }
    return true;
}

export const isArray = (val: any) => {
    return Object.prototype.toString.call(val) === '[object Array]';
}