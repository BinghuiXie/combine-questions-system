/**
 * @description 能力点录入相关字段查询规则
 */

export const checkAbilityContent = (rule: any, value: string, cb: any) => {
    if(!value) {
        return cb(new Error('内容不能为空'));
    }
    cb();
}
