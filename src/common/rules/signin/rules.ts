import { 
    MIN_PASSWORD_LENGTH,
    MAX_PASSWORD_LENGTH
 } from '@/common/constants/siginin';
import RegMap from '@/common/regexp';

/**
 * 
 * @param {object} rule 规则
 * @param value 实际输入值
 * @param cb 回调用函数
 */
let pass = '';

export const checkPassword = (rule: any, value: string, cb: any) => {
    if(!value) {
        return cb(new Error('密码不能为空'));
    }
    const reg = RegMap.password;
    if(value.length < MIN_PASSWORD_LENGTH || value.length > MAX_PASSWORD_LENGTH) {
        return cb(new Error(`密码长度应为${MIN_PASSWORD_LENGTH}-${MAX_PASSWORD_LENGTH}位`));
    } else if(!reg.test(value)) {
        return cb(new Error('密码应由数字 + 至少一位大写字母 + 小写字母组成'))
    } else {
        pass = value;
        cb();
    }
}

export const checkConfirmPassword = (rule: any, value: string, cb: any) => {
    if(!value) {
        return cb(new Error('输入不能为空'));
    }
    if(value !== pass) {
        return cb(new Error('两次输入密码不一致'))
    } else {
        cb();
    }
}

export const checkPhoneNumber = (rule: any, value: string, cb: any) => {
    if(!value) {
        return cb(new Error('手机号码不能为空'));
    }
    if(value.length < 11) {
        return new cb(new Error('手机号长度应为11位'))
    }
    const reg = RegMap.phone;
    if(!reg.test(value)) {
        return new cb(new Error('手机号码格式不正确'))
    } else {
        cb();
    }
}

export const checkAuthCode = (rule: any, value: string, cb: any) => {
    if(!value) {
        return cb(new Error('验证码不能为空'));
    }
    const reg = RegMap.authCode;
    if(!reg.test(value)) {
        return new cb(new Error('验证码格式不正确，应为6位数字'))
    } else {
        cb();
    }
}