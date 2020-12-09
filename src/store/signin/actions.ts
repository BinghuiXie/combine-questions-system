import { IRootState } from './../rootState.interface';
import { IUserInfo as IUserState, ITeacherInfo, IStudentInfo } from '@/interfaces';
import { ActionTree } from 'vuex';
import * as types from './mutationTypes';

export const actions: ActionTree<IUserState, IRootState> = {
    handleInput(context, payload: { newModel: ITeacherInfo | IStudentInfo }) {
        context.commit(types.INPUT_USER_INFO, { 
            newModel: payload.newModel 
        })
    },
    /** 针对记住密码以后自动填充用户名密码时更新 state 里面的数据
     * 
     */
    autoFillUserInfo(context, payload: { userInfo: ITeacherInfo | IStudentInfo }) {
        context.commit(types.AUTO_FILL_USERINFO, {
            userInfo: payload.userInfo
        })
    }
}