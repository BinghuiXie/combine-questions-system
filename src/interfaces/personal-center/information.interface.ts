export interface IInformation {
    userName: string | null,
    identityId: string,
    phone: string | null,
    courseName: string | null,
    roleId: 0 | 1
}

export interface ICourseData {
    courseId: number,
    courseName: string,
    gmtCreate: string | null,
    gmtModified: string | null
}

export interface ICourseInfo {
    courseInfo?: ICourseData
}

export interface IUserInformation {
    userInfo: IInformation
}

export interface IUserInfoResponse {
    code: number,
    msg: string,
    data: IInformation
}