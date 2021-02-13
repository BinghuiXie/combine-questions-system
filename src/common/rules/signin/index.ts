import { 
    checkEmployeeId,
    checkPassword,
    checkConfirmPassword,
    checkPhoneNumber,
    checkAuthCode,
    checkStudentId
 } from './rules';

const SigninRules: any = {
    employeeId: [
        { validator: checkEmployeeId, trigger: 'change' }
    ],
    studentId: [
        { validator: checkStudentId, trigger: 'change' }
    ],
    // 教师登录密码
    tPassword: [
        { validator: checkPassword, trigger: 'change' }
    ],
    // 学生登录密码
    sPassword: [
        { validator: checkPassword, trigger: 'change' }
    ],
    // 注册密码
    password: [
        { validator: checkPassword, trigger: 'change' }
    ],
    confirmPass: [
        { validator: checkConfirmPassword, trigger: 'change' }
    ],
    phone: [
        { validator: checkPhoneNumber , trigger: 'change' }
    ],
    authCode: [
        { validator: checkAuthCode, trigger: 'change' }
    ]
}

export {
    SigninRules
};