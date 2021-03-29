export interface IValidateConfig {
    data: any;
    props: string[];
    rules?: any;
}

export interface IRefValidate extends Vue {
    validate: () => boolean
}

export type IValidateInputResponse = Promise<boolean | {
    result: boolean;
    message: string;
}>