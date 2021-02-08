import { IBaseInterface } from './index';
import { valueof } from '@/utlis/type';

export interface ITableConfig extends IBaseInterface {
    type: valueof<typeof ColumnTemType>;
    prop: string;
    propInit: any;
    name: string;
    link?: string;
    placeholder?: string;
    selectData?: any;
    cascaderOptions?: any;
    cascaderProps?: any;
}

export enum ColumnTemType {
    TEXT = 'text',
    CHECKBOX = 'checkbox',
    INPUT = 'input',
    SELECT = 'select',
    CASCADER = 'cascader'
}