import { IFunctionItem } from '@/interfaces/compose-viewer/functionList.interface';
import ComposeEditor from '@/components/compose-viewer/compose-editor';
import QuestionManage from '@/components/compose-viewer/question-manage';
import PaperManage from '@/components/compose-viewer/paper-manage';
import QuestionInput from '@/components/compose-viewer/question-input';
import {
    QUESTION_MANAGE,
    INTELLIGENT_COMPOSE_SYSTEM,
    PAPER_MANAGE,
    QUESTION_INPUT
} from '@/common/constants/lang'

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
    }
]