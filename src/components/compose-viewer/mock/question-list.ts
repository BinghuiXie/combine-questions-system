import { IQuestionItem } from '@/interfaces/compose-viewer';

export const questionList: Array<IQuestionItem> = [
    {
        id: 0,
        questionTypeId: 0,
        courseId: 0,
        options: ['A 网络层次', 'B 协议内部实现细节', 'C 每一层使用协议', 'D 每层须完成的功能'],
        score: 2,
        difficulty: 1,
        knowledgeIdList: [0, 1, 2],
        capicityIdList: [1, 3, 8],
        content: '下列选项中，不属于网络体系结构中所描述的内容是',
        url: '',
        answer: 'B',
        answerUrl: '',
        status: 1,
        teacherId: '12345678',
        lastUpdateTime: 1610703327612,
        updateTimes: 0,
        lastUseTime: 1610703327612,
        userTimes: 10
    },
    {
        id: 1,
        questionTypeId: 0,
        courseId: 0,
        options: ['A 网络层', 'B 应用层', 'C 传输层', 'D 会话层'],
        score: 2,
        difficulty: 1,
        knowledgeIdList: [1, 3],
        capicityIdList: [2, 4, 7],
        content: 'OSI体系结构中，直接为表示层提供服务的是',
        url: '',
        answer: 'C',
        answerUrl: '',
        status: 1,
        teacherId: '12345678',
        lastUpdateTime: 1610703327612,
        updateTimes: 0,
        lastUseTime: 1610703327612,
        userTimes: 10
    },
]