/**
 * 注册身份
 */
import { IBaseInterface } from '../common/index';

export interface IForgotPwdData<T> {
    phone: T;
    password: T;
    confirmPass: T;
    authCode: T;
}

export interface IForgotPwdResponseData extends IBaseInterface {

}
