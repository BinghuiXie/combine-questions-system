import { checkEmployeeId } from './signin';

const SigninRules = {
    employeeId: [
        { validator: checkEmployeeId, trigger: 'change' }
    ]
}

export {
    SigninRules
};