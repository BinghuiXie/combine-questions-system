/**
 * 是否是纯字符串(不是类似 'true', '[1,2,3]', '{}' 这样的)
 * @param str 
 */
export const isPureString = (str: string) => {
    try {
        JSON.parse(str);
    } catch {
        return true;
    }
    return false;
}