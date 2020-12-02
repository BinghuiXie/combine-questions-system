import { 
    checkEmployeeId,
    checkPassword,
    checkConfirmPassword,
    checkPhoneNumber,
    checkAuthCode,
    checkStudentId
 } from './signin';
import { IRegisterData } from '@/interfaces';

const SigninRules: Partial<IRegisterData<Array<{}>>> = {
    employeeId: [
        { validator: checkEmployeeId, trigger: 'change' }
    ],
    studentId: [
        { validator: checkStudentId, trigger: 'change' }
    ],
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