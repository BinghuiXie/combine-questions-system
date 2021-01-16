/**
 * @param { number } id 试题主键 id
 * @param { QuestionTypeMap } questionTypeId 试题类型id
 * @param { number } courseId 课程id
 * @param { Array<string> } options 试题选项（选择题）
 * @param { number } score 试题分值
 * @param { number } difficulty 试题难度等级
 * @param { Array<number> } knowledgeIdList 知识点 id 列表
 * @param { Array<number> } capicityIdList 能力点 id 列表
 * @param { string } content 试题内容
 * @param { string } url 试题补充内容链接（图片链接）
 * @param { string } answer 试题答案
 * @param { string } answerUrl 试题答案补充内容链接（图片链接）
 * @param { number } status 试题状态（0 停用， 1 启用）
 * @param { string } teacherId 编辑试题教师 id
 * @param { number } lastUpdateTime 上次更新时间
 * @param { number } updateTimes 试题更新次数
 * @param { number } lastUseTime 试题上次使用时间
 * @param { number } userTimes 试题使用次数
 */
export interface IQuestionItem {
    id: number;
    questionTypeId: number;
    courseId: number;
    options: Array<string>;
    score: number;
    difficulty: 1 | 2 | 3 | 4 | 5;
    knowledgeIdList: Array<number>;
    capicityIdList: Array<number>;
    content: string;
    url: string;
    answer: string;
    answerUrl: string;
    status: 0 | 1;
    teacherId: string;
    lastUpdateTime: number;
    updateTimes: number;
    lastUseTime: number;
    userTimes: number;
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
    '名词解释',
    '简答题',
    '设计题',
    '计算题'
}
