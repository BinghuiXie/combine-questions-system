import { valueof } from '@/utlis/type';

export interface IHeaderItem {
    id: number;
    type: valueof<typeof HeaderItemType>;
    name: string;
    path?: string;
    children?: IHeaderItem[];
    icon?: string;
}

export enum HeaderItemType {
    TEXT = 'text',
    DROPDOWN = 'dropdown'
}