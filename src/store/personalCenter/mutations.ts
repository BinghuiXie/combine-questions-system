import { MutationTree } from "vuex";
import { IUserState } from "./personCenter.interface";
import * as types from "./mutationTypes"
import { IInformation } from "@/interfaces";

export const mutations: MutationTree<IUserState> = {
    [types.GET_USER_INFO](state, payload: {userInfo: IInformation}) {
        const { userInfo } = payload;
        if(userInfo) {
            state.userInfo = userInfo as IInformation;
        }
    }
}