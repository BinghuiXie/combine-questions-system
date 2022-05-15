/**
 * @param { number } questionId 试题主键 id
 * @param { QuestionTypeMap } questionTypeId 试题类型id
 * @param { number } courseId 课程id
 * @param { Array<string> } questionContentChoice 试题选项（选择题）
 * @param { number } questionScore 试题分值
 * @param { number } questionDifficulty 试题难度等级
 * @param { Array<number> } knowledgeIdList 知识点 id 列表
 * @param { Array<number> } abilityIdList 能力点 id 列表
 * @param { string } questionContent 试题内容
 * @param { Array<string> } questionSubContent 客观题的小问
 * @param { string } questionContentSupplement 试题补充内容链接（图片链接）
 * @param { string | Array<string> } questionAnswer 试题答案
 * @param { string } questionAnswerSupplement 试题答案补充内容链接（图片链接）
 * @param { number } questionStatus 试题状态（0 停用， 1 启用）
 * @param { number } questionOperatorId 编辑试题教师 id
 * @param { number } questionGmtUpdate 上次更新时间
 * @param { number } questionUpdateTimes 试题更新次数
 * @param { number } questionGmtLastUsed 试题上次使用时间
 * @param { number } questionUsedTimes 试题使用次数
 */
export interface IQuestionItem {
    [key: string]: any;
    questionId: number;
    questionTypeId: number;
    courseId: number;
    questionContentChoice: Array<string>;
    questionScore: number;
    questionDifficulty: 1 | 2 | 3 | 4 | 5;
    knowledgeIdList: Array<number>;
    abilityIdList: Array<number>;
    questionContent: string;
    questionSubContent: Array<string>,
    questionContentSupplement: string;
    questionAnswer: string | Array<string>;
    questionAnswerSupplement: string;
    questionStatus: 0 | 1;
    questionOperatorId: number;
    questionGmtUpdate: number;
    questionUpdateTimes: number;
    questionGmtLastUsed: number;
    questionUsedTimes: number;
}

export interface IQuestionTypeList {
    id: number;
    name: string;
}

export enum QuestionStatusMap {
    '停用', // 0
    '启用'  // 1
}

export enum QuestionTypeMap {
    '单项选择题',
    '多项选择题',
    '填空题',
    '判断题',
    '简答题',
    '分析题',
    '计算题',
    '综合应用题'
}

export enum QuestionNameMap {
    CHOICE,
    MULTIPLE_CHOICE,
    FILL,
    JUDGE,
    NOUN_EXP,
    SHORT,
    DESIGN,
    CALCULATE,
    INTEGRATED
}