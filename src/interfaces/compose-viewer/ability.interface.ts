import { valueof } from '@/utlis/type';

export interface IAbilityItem {
    abilityId: number;
    content: string;
    type: valueof<typeof AbilityType>;
}

export interface IBatchAbilityItem {
    courseId: number;
    abilityList: IAbilityItem[];
}

export enum AbilityType {
    '了解能力',
    '熟悉能力',
    '掌握能力',
    '应用能力',
}