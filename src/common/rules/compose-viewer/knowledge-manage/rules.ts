/**
 * @description 检查知识点管理模块的相关规则
 */

export const checkKnowledgeContent = (rule: any, value: string, cb: any) => {
    if(!value) {
        return cb(new Error('内容不能为空'));
    }
    cb();
}

export const checkChapterList = (rule: any, value: string, cb: any) => {
    if(!value.length) {
        return cb(new Error('知识点关联章不能为空'));
    }
    cb();
}

export const checkSectionList = (rule: any, value: string, cb: any) => {
    console.log(value)
    if(!value.length) {
        return cb(new Error('知识点关联节不能为空'));
    }
    cb();
}

export const checkCascaderData = (rule: any, value: string, cb: any) => {
    if(!value.length) {
        return cb(new Error('知识点关联节不能为空'));
    }
    cb();
}