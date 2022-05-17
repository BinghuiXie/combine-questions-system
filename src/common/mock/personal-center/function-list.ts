import { IFunctionItem } from '@/interfaces/compose-viewer/functionList.interface';
import information from '@/components/personal-center/information'
import personManage from '@/components/personal-center/personManage'
import {
    COURSE_MANAGE,
    PERSONAL_INFORMATION,
    PERSONAL_MANAGE
} from '@/common/constants/lang'
import courseManage from '@/components/personal-center/courseManage';


export const personalFunctionList: IFunctionItem[] = [
    {
        id: 0,
        func: PERSONAL_INFORMATION,
        icon: 'icon-zujuan',
        path: 'information',
        component: information,
        default: true
    },
    {
        id: 1,
        func: PERSONAL_MANAGE,
        icon: 'icon-zujuan',
        path: 'person-manage',
        component: personManage,
    },
    {
        id: 2,
        func: COURSE_MANAGE,
        icon: 'icon-zujuan',
        path:'course-manage',
        component: courseManage,
    }
]