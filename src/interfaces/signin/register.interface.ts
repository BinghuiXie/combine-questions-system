/**
 * 注册身份
 */

import { IBaseInterface } from './index';

export type IRegisterIdentity = '' | 'teacher' | 'student' | Array<any>;

export interface IRegisterData<T> {
    employeeId: T;
    studentId: T;
    password: T;
    confirmPass: T;
    identity: IRegisterIdentity;
    phone: T;
    authCode: T;
}

export interface IRegisterResponseData extends IBaseInterface {
    
}
