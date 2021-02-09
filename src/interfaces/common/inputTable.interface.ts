import { IBaseInterface } from './index';
import { valueof } from '@/utlis/type';

export interface ITableConfig extends IBaseInterface {
    type: valueof<typeof ColumnTemType>;
    prop: string;
    propInit: any;
    name: string;
    link?: string;
    placeholder?: string;
    selectData?: ISelectItem[];
    selectOptions?: any;
    cascaderOptions?: any;
    cascaderProps?: any;
}

export type textTableConfig = Required<Pick<ITableConfig, 'type' | 'prop' | 'propInit' | 'name'>>;
export type checkboxTableConfig = Required<Pick<ITableConfig, 'type' | 'prop' | 'propInit' | 'name'>>;
export type inputTableConfig = Required<Pick<ITableConfig, 'type' | 'prop' | 'propInit' | 'name' | 'placeholder'>>;
export type selectTableConfig = Pick<ITableConfig, 'type' | 'prop' | 'propInit' | 'name' | 'placeholder' | 'selectData' | 'selectOptions'>;
export type cascaderTableConfig = Required<Pick<ITableConfig, 'type' | 'prop' | 'propInit' | 'name' | 'cascaderProps' | 'placeholder' | 'link'>>;

export enum ColumnTemType {
    TEXT = 'text',
    CHECKBOX = 'checkbox',
    INPUT = 'input',
    SELECT = 'select',
    CASCADER = 'cascader'
}

export interface ISelectItem {
    label: string;
    value: string | number;
    id?: number;
    children?: ISelectItem[];
}