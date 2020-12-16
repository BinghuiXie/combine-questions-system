/**
 * 注册身份
 */
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