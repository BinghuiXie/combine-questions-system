import { ISigninState } from './signin.interface';
import { SUCCESS_CODE } from '@/common/constants/code';
import { IRootState } from './../rootState.interface';
import {
    IRegisterData,
    IBindUserInfo
} from '@/interfaces';
import { ActionTree } from 'vuex';
import * as types from './mutationTypes';
import AJAX from '@/utlis/ajax';
import axios from 'axios'

const $http = new AJAX();

export const actions: ActionTree<ISigninState, IRootState> = {
    handleInput(context, payload: { newModel: IBindUserInfo }) {
        console.log('handleInput: ', payload.newModel)
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
        let res;
        try {
            res = await $http.post('/user/login', payload.data);
        } catch (error) {
            // TODO: 封装错误类
            throw Error(`request Error: ${error}`);
        }
        if(res.status === SUCCESS_CODE) {
            // TODO: 处理跳转逻辑
        }
    },

    async handleInfoSubmit(context, payload: { data: IRegisterData<string> }) {
        // TODO: deep clone 封装在一个 utli 里面
        const copy = JSON.parse(JSON.stringify(payload.data));
        Object.keys(copy).filter(key => {
            if(!copy[key]) {
                delete copy[key];
            }
        });
        let res;
        try {
            res = await $http.post('/user/register', {
                identityId: copy.employeeId || copy.studentId,
                password: copy.password,
                phoneNumber: copy.phone,
                roleId: copy.identity === 'teacher' ? 0 : 1,
                smsCode: Number(copy.authCode)
            });
            console.log(res);
        } catch (error) {
            throw Error(`request Error: ${error}`);
        }
        if(res.status === SUCCESS_CODE) {
            // TODO: 注册成功跳转逻辑
        }
    },

    updateRegisterData(context, payload: { registerData: IRegisterData<string> }) {
        context.commit(types.UPDATE_REGISTER_DATA, {
            registerData: payload.registerData
        })
    },

    async handleSendCode(context, payload: { phoneNumber: string }) {
        const { phoneNumber } = payload;
        try {
            const res = await $http.post('/user/sms', {
                phoneNumber
            });
        } catch (error) {
            
        }
    }
}