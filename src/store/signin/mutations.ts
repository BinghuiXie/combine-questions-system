import { ISigninState } from './signin.interface';
import {
    IAdministratorInfo,
    ITeacherInfo,
    IBindUserInfo
} from '@/interfaces';
import { MutationTree } from 'vuex';
import * as types from './mutationTypes';

export const mutations: MutationTree<ISigninState> = {
    [types.INPUT_USER_INFO](state, payload: { newModel: IBindUserInfo }) {
        const { newModel } = payload;
        if(newModel && newModel.hasOwnProperty('teacherId')) {
            state.teacherInfo = newModel as ITeacherInfo;
        } else {
            state.administratorInfo = newModel as IAdministratorInfo;
        }
    },
    [types.AUTO_FILL_USERINFO](state, payload: { userInfo: IBindUserInfo }) {
        const { userInfo } = payload;
        if(userInfo && userInfo.hasOwnProperty('teacherId')) {
            state.teacherInfo = userInfo as ITeacherInfo;
        } else {
            state.administratorInfo = userInfo as IAdministratorInfo;
        }
    },
}