
export interface IUserInfo {
    employeeId: string;
    studentId: string;
    password: string;
}

export interface IBaseInfo {
    [key: string]: string;
}

export interface IStudentInfo extends IBaseInfo {
    studentId: string;
    sPassword: string;
}

export interface ITeacherInfo extends IBaseInfo {
    employeeId: string;
    tPassword: string;
}