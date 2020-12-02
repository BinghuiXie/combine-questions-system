export * from './register.interface';
export * from './login.interface';

export interface IValidateParams {
    rule: string;       // 验证规则
    value: string;      // 实际输入值
    cb: (param?: Error) => void;     // 回调函数
}