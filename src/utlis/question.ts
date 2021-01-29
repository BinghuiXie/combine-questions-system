import { subjectiveList, objectiveList } from '@/common/mock/compose-viewer/question-list';
import { IQuestionTypeList, QuestionTypeMap, QuestionNameMap } from '@/interfaces/compose-viewer';

export const getQuestionTypes: () => IQuestionTypeList[] = () => {
    const res = [];
    for(let item in QuestionTypeMap) {
        const isValue = parseInt(item, 10) >= 0;
        if(isValue) {
            res.push({
                id: parseInt(item),
                name: QuestionTypeMap[item],
            })
        }
    }
    return res;
}

export const isSubjective: (id: number) => boolean = (id: number) => {
    return subjectiveList.indexOf(id) !== -1;
}

export const isObjective: (id: number) => boolean = (id: number) => {
    return objectiveList.indexOf(id) !== -1;
}

export const isSelectQues: (id: number) => boolean = (id: number) => {
    return id === QuestionNameMap.CHOICE || id === QuestionNameMap.MULTIPLE_CHOICE;
}

export const isFillQues: (id: number) => boolean = (id: number) => {
    return id === QuestionNameMap.FILL;
}

export const isJudgeQues: (id: number) => boolean = (id: number) => {
    return id === QuestionNameMap.JUDGE;
}

export const isShortQues: (id: number) => boolean = (id: number) => {
    return id === QuestionNameMap.SHORT;
}

export const isCalcQues: (id: number) => boolean = (id: number) => {
    return id === QuestionNameMap.CALCULATE;
}

export const isIntergratedQues: (id: number) => boolean = (id: number) => {
    return id === QuestionNameMap.INTEGRATED || id === QuestionNameMap.MULTIPLE_CHOICE;
}

export const isNounExplainQues: (id: number) => boolean = (id: number) => {
    return id === QuestionNameMap.NOUN_EXP || id === QuestionNameMap.MULTIPLE_CHOICE;
}