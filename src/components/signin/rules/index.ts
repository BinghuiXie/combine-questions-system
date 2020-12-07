import { 
    checkEmployeeId,
    checkPassword,
    checkConfirmPassword,
    checkPhoneNumber,
    checkAuthCode,
    checkStudentId
 } from './signin';

const SigninRules: any = {
    employeeId: [
        { validator: checkEmployeeId, trigger: 'change' }
    ],
    studentId: [
        { validator: checkStudentId, trigger: 'change' }
    ],
    tPassword: [
        { validator: checkPassword, trigger: 'change' }
    ],
    sPassword: [
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