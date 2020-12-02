/**
 * @description: json 相关封装
 */

export const isJsonString = (str: string) => {
    try {
        const res = JSON.parse(str);
        const type = Object.prototype.toString.call(res);
        // 排除 数字 和 数组(这两类也可以被 JSON.parse 转)
        if(type === '[object Number]' || type === '[object Array]') {
            throw Error('not json string');
        }
    } catch (e) {
        return false;
    }
    return true;
} 

export const isJsonObject = (val: any) => {
    return Object.prototype.toString.call(val) === '[object Object]';
}