import { IBaseInterface } from '../common';

export interface IAdministratorInfo extends IBaseInterface {
    administratorId: string;
    aPassword: string;
}

export interface ITeacherInfo extends IBaseInterface {
    teacherId: string;
    tPassword: string;
}

export interface IUserInfo {
    teacherInfo: ITeacherInfo;
    administratorInfo: IAdministratorInfo;
}

export interface ILoginResponse{
    code: number;
    message: string;
    data: ILoginResponseData;
}

export interface ILoginResponseData {
    sessionId: string;
}

export type IBindUserInfo = ITeacherInfo | IAdministratorInfo;