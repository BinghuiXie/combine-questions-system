import { ISigninState } from './signin.interface';
import {
    ITeacherInfo, 
    IStudentInfo,
    IRegisterData,
    IBindUserInfo
} from '@/interfaces';
import { MutationTree } from 'vuex';
import * as types from './mutationTypes';

export const mutations: MutationTree<ISigninState> = {
    [types.INPUT_USER_INFO](state, payload: { newModel: IBindUserInfo }) {
        const { newModel } = payload;
        console.log(newModel)
        if(newModel && newModel.hasOwnProperty('employeeId')) {
            state.teacherInfo = newModel as ITeacherInfo;
        } else {
            state.studentInfo = newModel as IStudentInfo;
        }
    },
    [types.AUTO_FILL_USERINFO](state, payload: { userInfo: IBindUserInfo }) {
        const { userInfo } = payload;
        if(userInfo && userInfo.hasOwnProperty('employeeId')) {
            state.teacherInfo = userInfo as ITeacherInfo;
        } else {
            state.studentInfo = userInfo as IStudentInfo;
        }
    },
    [types.UPDATE_REGISTER_DATA](state, payload: { registerData: IRegisterData<string> }) {
        state.registerData = payload.registerData;
    }
}