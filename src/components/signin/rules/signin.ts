import { MAX_EMPLOYEE_ID_LENGTH } from '@/common/constants/siginin';
import RegMap from '@/common/regexp';


const checkEmployeeId = (rule: any, value: string, cb: any) => {
    console.log(rule, value, cb);
    if(!value) {
        return cb(new Error('工号不能为空'));
    }
    if(value.length < MAX_EMPLOYEE_ID_LENGTH) {
        return cb(new Error(`工号长度应为${MAX_EMPLOYEE_ID_LENGTH}位`));
    }
    const reg = RegMap.employeeId;
    if(!reg.test(value)) {
        return cb(new Error(`工号格式应为${MAX_EMPLOYEE_ID_LENGTH}位数字`));
    } else {
        cb();
    }
}

export {
    checkEmployeeId
}