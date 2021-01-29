import { IBaseInterface } from '../common';

export interface IStudentInfo extends IBaseInterface {
    studentId: string;
    sPassword: string;
}

export interface ITeacherInfo extends IBaseInterface {
    employeeId: string;
    tPassword: string;
}

export interface IUserInfo {
    teacherInfo: ITeacherInfo;
    studentInfo: IStudentInfo;
}

export interface ILoginResponse{
    code: number;
    message: string;
    data: ILoginResponseData;
}

export interface ILoginResponseData {
    sessionId: string;
}

export type IBindUserInfo = ITeacherInfo | IStudentInfo;