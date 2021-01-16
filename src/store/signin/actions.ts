import {
    INFINITY_TIME,
    SESSION_ID_KEY
 } from '@/common/constants';
 import {
    IRegisterData,
    IBindUserInfo,
    ILoginResponse,
    IRegisterResponseData
} from '@/interfaces';
import { deepclone } from '@/utlis/object';
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
     *  @param{Object} payload 参数
     *  @param{IBindUserInfo} data 登录信息(用户名密码)
     */
    async handleUserLogin(context, payload: { data: IBindUserInfo }) {
        const { data } = payload;
        const res = await $http.post<ILoginResponse>('/user/login', {
            identityId: data.employeeId || data.studentId,
            password: data.sPassword || data.tPassword
        });
        const { sessionId } = res.data.data;
        $storage.set(SESSION_ID_KEY, sessionId, INFINITY_TIME);
        if(res.status === HTTPCODE.SUCCESS) {
            // TODO: 处理跳转逻辑
        }
    },

    /**
     * 处理用户注册
     * @param context 
     * @param payload 注册信息
     */
    async handleInfoSubmit(context, payload: { data: IRegisterData<string> }) {
        const copy = deepclone(payload.data);
        // 去掉 data 里面为空的字段（如果是教师去除的是学生字段，反之亦然）
        Object.keys(copy).filter(key => {
            if(!copy[key]) {
                delete copy[key];
            }
        });
        return await $http.post<IRegisterResponseData>('/user/register', {
            identityId: copy.employeeId || copy.studentId,
            password: copy.password,
            phoneNumber: copy.phone,
            roleId: copy.identity === 'teacher' ? 0 : 1,
            smsCode: Number(copy.authCode)
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