import Vue, { ComponentOptions, AsyncComponent } from 'vue';

export interface IFunctionItem {
    id: number;
    component?: ComponentOptions<Vue> | typeof Vue | AsyncComponent;
    func: string;
    path: string;
    icon: string;
    default?: boolean;
}