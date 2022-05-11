import { 
    checkPassword,
    checkConfirmPassword,
    checkPhoneNumber,
    checkAuthCode,
 } from './rules';

const SigninRules: any = {
    //管理员登录账号
    administratorId: [
        { validator: checkPhoneNumber, trigger: 'change' }
    ],
    //教师登录账号
    tercherId: [
        { validator: checkPhoneNumber, trigger: 'change' }
    ],
    // 教师登录密码
    tPassword: [
        { validator: checkPassword, trigger: 'change' }
    ],
    // 学生登录密码
    aPassword: [
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