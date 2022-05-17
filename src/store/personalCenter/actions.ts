import { IInformation, IUserInfoResponse } from "@/interfaces";
import AJAX from "@/utlis/ajax";
import { ActionTree } from "vuex";
import { IRootState } from "../rootState.interface";
import { IUserState } from "./personCenter.interface";

const $http = new AJAX();

export const actions: ActionTree<IUserState, IRootState> = {
    /** 获取用户信息
     * 
     * @param context 
     */
    async getUserInfo(context) {
        const res = await $http.get('/user/info');
        const data = <IUserInfoResponse>res.data;
        
        context.commit("GET_USER_INFO",{
            userInfo: data.data
        });
        console.log(res.data);
        
    },
    /** 修改用户信息
     * 
     * @param context 
     */
    async changeUserInfo(context, data:IInformation) {
        const pramas = {
            userName:data.userName,
            courseName:data.courseName
        }
        const res = await $http.post('/user/update/info', pramas);
        console.log(res);
    },

    /**
     * 
     * 获取课程信息
     */
    async getCourseInfo() {
        const res = await $http.get('/course/list')
        return res.data
        
    }
}