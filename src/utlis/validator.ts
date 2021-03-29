import { IValidateInputResponse } from './../interfaces/common/validate.interface';
import Schema from 'async-validator';

export const validateInput: (
    data: Object | Object[], 
    rules: any, 
    index: number
) => IValidateInputResponse = async function (data: Object | Object[], rules: any, index: number = 0) {
    console.log(rules, data);
    let res: any = true;
    const validator = new Schema(rules);
    if(Array.isArray(data)) {
        for(let i = 0; i < data.length; i++) {
            res = await validateInput(data[i], rules, i);
            if(typeof res === 'object') {
                break;
            }
        }
    } else {
        try {
            await validator.validate(data);
        } catch {
            return {
                result: false,
                message: `第${index + 1}行数据输入有误`
            };
        }
    }

    return res;
}