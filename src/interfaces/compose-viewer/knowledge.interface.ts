import {
    checkboxTableConfig,
    textTableConfig,
    inputTableConfig,
    cascaderTableConfig,
    selectTableConfig
} from '@/interfaces/common';

export interface IKnowledgeItem {
    knowledgeId: number;
    content: string;
    chapterList: Array<number>;
    sectionList: Array<number>;
    courseId: Array<number>;
    importance: 1 | 2 | 3 | 4 | 5;
}

export enum KnowledgeInputType {
    Single = 'single',
    Batch = 'batch'
}

/**
 * 采用元组的形式对不同界面的 inputTable 的 config 进行强制的类型限制
 */
export type KnowledgeTableConfig = [
    checkboxTableConfig,
    textTableConfig,
    inputTableConfig,
    selectTableConfig,
    cascaderTableConfig,
    inputTableConfig
]
