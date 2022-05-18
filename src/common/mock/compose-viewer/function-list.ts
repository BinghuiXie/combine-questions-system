import { ABILITY_INPUT } from './../../constants/lang';
import { IFunctionItem } from '@/interfaces/compose-viewer/functionList.interface';
import ComposeEditor from '@/components/compose-viewer/compose-editor';
import QuestionManage from '@/components/compose-viewer/question-manage';
import PaperManage from '@/components/compose-viewer/paper-manage';
import QuestionInput from '@/components/compose-viewer/question-input';
import KnowledgeManage from '@/components/compose-viewer/knowledge-manage';
import KnowledgeInput from '@/components/compose-viewer/knowledge-manage/knowledegInput';
import KnowledgeCheck from '@/components/compose-viewer/knowledge-manage/knowledegCheck';//之前一直报错说找不到，突然就好了无语
import {
    QUESTION_MANAGE,
    INTELLIGENT_COMPOSE_SYSTEM,
    PAPER_MANAGE,
    QUESTION_INPUT,
    KNOWLEDGE_MANAGE,
    KNOWLEDGE_INPUT,
    ABILITY_MANAGE,
    KNOWLEDGE_CHECK,
    ABILITY_CHECK
} from '@/common/constants/lang'
import AbilityManage from '@/components/compose-viewer/ability-manage';
import AbilityInput from '@/components/compose-viewer/ability-manage/abilityInput';
import AbilityCheck from '@/components/compose-viewer/ability-manage/abilityCheck';

export const teacherFunctionList: IFunctionItem[] = [
    {
        id: 0,
        func: INTELLIGENT_COMPOSE_SYSTEM,
        icon: 'icon-zujuan',
        path: 'compose-editor',
        component: ComposeEditor,
        default: true
    },
    {
        id: 1,
        func: QUESTION_MANAGE,
        icon: 'icon-shitilan',
        path: 'question-manage',
        component: QuestionManage
    },
    {
        id: 2,
        func: PAPER_MANAGE,
        icon: 'icon-shijuanguanli',
        path: 'paper-manage',
        component: PaperManage
    },
    {
        id: 3,
        func: QUESTION_INPUT,
        icon: 'icon-huabi',
        path: 'question-input',
        component: QuestionInput
    },
    {
        id: 4,
        func: KNOWLEDGE_MANAGE,
        icon: 'icon-zhishidian',
        path: 'knowledge-manage',
        component: KnowledgeManage,
        children: [
            {
                id: 0,
                func: KNOWLEDGE_INPUT,
                icon: 'icon-huabi',
                path: 'knowledge-input',
                component: KnowledgeInput
            },
            {
                id: 1,
                func: KNOWLEDGE_CHECK,
                icon: 'icon-huabi',
                path: 'knowledge-check',
                component: KnowledgeCheck
            },
        ]
    },
    {
        id: 5,
        func: ABILITY_MANAGE,
        icon: 'icon-nenglidian',
        path: 'ability-manage',
        component: AbilityManage,
        children: [
            {
                id: 0,
                func: ABILITY_INPUT,
                icon: 'icon-huabi',
                path: 'ability-input',
                component: AbilityInput
            },
            {
                id:1,
                func:ABILITY_CHECK,
                icon:'icon-huabi',
                path:'ability-check',
                component:AbilityCheck
            }
        ]
    }
]