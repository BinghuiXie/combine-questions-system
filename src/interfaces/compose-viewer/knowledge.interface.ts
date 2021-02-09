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

export interface IBatchKnowledgeItem extends IKnowledgeItem {
    isCheck: boolean;
}

export type KnowledgeTableConfig = [
    checkboxTableConfig,
    textTableConfig,
    inputTableConfig,
    selectTableConfig,
    cascaderTableConfig,
    inputTableConfig
]

export type BatchKnowledgeItem = Omit<IBatchKnowledgeItem, 'courseId' | 'knowledgeId'>;