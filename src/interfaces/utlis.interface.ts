import { valueof } from '@/utlis/type';

export interface IPickObject {
    pick: string;
    name: string;
}
export type IPickPayload = string[] | IPickObject[];

export enum PreviewContentKey {
    MAIN = 'questionContent',
    SUB = 'questionSubContent',
    CONTENT_SUP = 'questionContentSupplement',
    ANSWER = 'questionAnswer',
    ANSWER_SUP = 'questionAnswerSupplement',
    CHOICE = 'questionContentChoice'
}

export interface IMathJax2htmlPayload {
    type: number;
    value: IMathJax2htmlObject[]
}

export type IMathJax2htmlObject = {
    key: valueof<typeof PreviewContentKey>;
    content: string | string[];
    node: Element;
}

export enum PrefixType {
    ALPHABET,
    NUMBER
}
