import {
    checkKnowledgeContent,
    checkChapterList,
    checkSectionList,
    checkCascaderData
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
    ],
    cascaderData: [
        { require: true, validator: checkCascaderData, trigger: 'change'}
    ]
}