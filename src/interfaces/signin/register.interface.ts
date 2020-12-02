/**
 * 注册身份
 */
export type IRegisterIdentity = '' | 'teacher' | 'student';

export interface IRegisterProps {
    onBackToLogin: () => void
}

export interface IRegisterData {
    employeeId: string;
    studentId: string;
    password: string;
    confirmPass: string;
    identity: IRegisterIdentity;
    phone: string;
    authCode: string;
}