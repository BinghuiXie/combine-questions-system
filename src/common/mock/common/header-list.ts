import { IHeaderItem, HeaderItemType } from '@/interfaces/common';

export const headerList: IHeaderItem[] = [
    {
        id: 0,
        type: HeaderItemType.TEXT,
        name: '使用手册',
        path: '/help'
    },
    {
        id: 1,
        type: HeaderItemType.DROPDOWN,
        name: '',
        icon: 'icon-touxiang1',
        children: [
            {
                id: 0,
                type: HeaderItemType.TEXT,
                name: '个人中心',
                path: '/personal-center',
                icon: 'icon-gerenzhongxin-zhong'
            },
            {
                id: 1,
                type: HeaderItemType.TEXT,
                name: '退出登录',
                path: '/signin',
                icon: 'icon-tuichudenglu'
            },
        ]
    },
]