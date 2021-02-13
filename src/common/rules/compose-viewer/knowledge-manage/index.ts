import {
    checkKnowledgeContent,
    checkChapterList,
    checkSectionList
} from './rules';

export const KnowledgeRules = {
    content: [
        { require: true, validator: checkKnowledgeContent, trigger: 'blur' }
    ],
    chapterList: [
        { require: true, validator: checkChapterList, trigger: 'change'}
    ],
    sectionList: [
        { require: true, validator: checkSectionList, trigger: 'change'}
    ]
}