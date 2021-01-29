import { IBaseInterface } from './index';

export interface IDialogConfig extends IBaseInterface {
    title: string;
    visible: boolean;
}

export interface IDialogDataSourceItem extends IBaseInterface {
    label: string;
    hint?: string;
    placeholder: string;
}