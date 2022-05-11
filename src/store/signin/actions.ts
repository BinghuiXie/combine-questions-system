import {
    INFINITY_TIME,
    SESSION_ID_KEY
 } from '@/common/constants';
 import {
    IBindUserInfo,
    ILoginResponse,
    IForgotPwdData,
    IForgotPwdResponseData
} from '@/interfaces';
import Storage from '@/utlis/localStorage';
import AJAX from '@/utlis/ajax';
import { HTTPCODE } from '@/common/constants';
import { ISigninState } from './signin.interface';
import { IRootState } from './../rootState.interface';
import { ActionTree } from 'vuex';
import * as types from './mutationTypes';

const $http = new AJAX();
const $storage = new Storage();

export const actions: ActionTree<ISigninState, IRootState> = {
    handleInput(context, payload: { newModel: IBindUserInfo }) {
        context.commit(types.INPUT_USER_INFO, { 
            newModel: payload.newModel 
        })
    },

    /** 针对记住密码以后自动填充用户名密码时更新 state 里面的数据
     * 
     */
    autoFillUserInfo(context, payload: { userInfo: IBindUserInfo }) {
        context.commit(types.AUTO_FILL_USERINFO, {
            userInfo: payload.userInfo
        })
    },

    /** 处理登录
     *  @param {Object} payload 参数
     *  @param {IBindUserInfo} data 登录信息(用户名密码)
     */
    async handleUserLogin(context, payload: { data: IBindUserInfo }) {
        const { data } = payload;
        const res = await $http.post<ILoginResponse>('/user/login', {
            identityId: data.teacherId || data.administratorId,
            password: data.aPassword || data.tPassword
        });
        const { sessionId } = res.data.data;
        $storage.set(SESSION_ID_KEY, sessionId, INFINITY_TIME);
        if(res.status === HTTPCODE.SUCCESS) {
            // TODO: 处理跳转逻辑
        }
    },

    /**
     * 处理用户修改密码
     * @param context 
     * @param payload 账号信息
     */
    async handleInfoSubmit(context, data: IForgotPwdData<string>) {
        return await $http.post<IForgotPwdResponseData>('/user/register', {
            password: data.password,
            phoneNumber: data.phone,
            smsCode: Number(data.authCode)
        });
    },

    /**
     * 发送短信验证码
     * @param context 
     * @param payload 参数对象，需要手机号
     */
    async handleSendCode(context, payload: { phoneNumber: string }) {
        const { phoneNumber } = payload;
        const res = await $http.post('/user/sms', {
            phoneNumber
        });
    }
}