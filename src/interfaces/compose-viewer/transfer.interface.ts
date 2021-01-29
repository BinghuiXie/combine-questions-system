import { IBaseInterface } from '../common';
import { IComposeViewerBase } from './index';

export interface ITransferDataItem {
    id: number;
    name: string;
}

export interface ITransferCardConfig extends IBaseInterface {
    title: string;
    type: number;
    batchEdit?: boolean;
}

export enum TransferType {
    SOURCE = 'source',
    TARGET = 'target'
}

export enum TransferOperation {
    ADD = '添加',
    EDIT = '编辑',
    DELETE = '删除',
    SAVE = '保存'
}

export enum TransferBatchOperation {
    BATCH_ADD = '批量添加',
    BATCH_DELETE = '批量删除',
    BATCH_EDIT = '批量编辑',
}