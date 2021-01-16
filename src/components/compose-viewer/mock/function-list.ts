import { IFunctionItem } from '@/interfaces/compose-viewer/functionList.interface';
import ComposeEditor from '../compose-editor';
import QuestionManage from '../question-manage';
import PaperManage from '../paper-manage';
import {
    QUESTION_MANAGE,
    INTELLIGENT_COMPOSE_SYSTEM,
    PAPER_MANAGE
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
    }
]