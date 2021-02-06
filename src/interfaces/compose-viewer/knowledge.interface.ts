export interface IKnowledgeItem {
    knowledgeId: number;
    content: string;
    chapterList: Array<number>;
    sectionList: Array<number>;
    courseId: Array<number>;
    importance: 1 | 2 | 3 | 4 | 5;
}

export interface IBatchKnowledgeItem extends IKnowledgeItem {
    isCheck: boolean;
}

export type BatchKnowledgeItem = Omit<IBatchKnowledgeItem, 'courseId'>;