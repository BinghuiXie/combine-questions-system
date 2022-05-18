import KnowledgeEditor from '@/components/compose-viewer/compose-editor/knowledgeEditor';
import {
    checkboxTableConfig,
    textTableConfig,
    inputTableConfig,
    cascaderTableConfig,
    selectTableConfig
} from '@/interfaces/common';
import { valueof } from '@/utlis/type';

export interface IAbilityItem {
    abilityId: number;
    content: string;
    abilityType: valueof<typeof AbilityType>;
}

export interface IBatchAbilityItem {
    courseId: number;
    abilityList: IAbilityItem[];
}

export type AbilityTableConfig = [
    checkboxTableConfig,
    // textTableConfig,//序号
    inputTableConfig,//内容
    selectTableConfig,//选择知识的
    inputTableConfig//重要程度
]
export interface KnowType{
    KnowledgeId:number,
    content:string,
}//之前用type一直报错
//
export type AbilityTableCheck=[
    checkboxTableConfig,
    // textTableConfig,//序号
    textTableConfig,
    textTableConfig
]
export enum AbilityType {
    '了解能力',
    '熟悉能力',
    '掌握能力',
    '应用能力',
}