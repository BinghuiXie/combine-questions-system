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
    textTableConfig,
    inputTableConfig,
    selectTableConfig
]

export enum AbilityType {
    '了解能力',
    '熟悉能力',
    '掌握能力',
    '应用能力',
}