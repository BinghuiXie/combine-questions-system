import { IAbilityItem, IBatchAbilityItem } from './../../interfaces/compose-viewer/ability.interface';
import { IComposeState } from './compose.interface';
import { IKnowledgeItem } from './../../interfaces/compose-viewer/knowledge.interface';
import AJAX from '@/utlis/ajax';
import { ActionTree } from 'vuex';
import { HTTPCODE } from '@/common/constants';
import { IRootState } from './../rootState.interface';
import * as types from './mutationTypes';
import AbilityCheck from '@/components/compose-viewer/ability-manage/abilityCheck';

const $http = new AJAX();

export const actions: ActionTree<IComposeState, IRootState> = {
    async submitKnowledgeData(context, payload: { courseId: number, knowledgeList: Array<IKnowledgeItem> }) {
        // 知识点录入
        const { courseId, knowledgeList } = payload;

        const data = knowledgeList.map(knowledgeItem => (
            {
                courseId: courseId,
                knowledgeContent: knowledgeItem.content,
                // parentIdCollection: knowledgeItem.chapterList,
                // childrenIdCollection: knowledgeItem.sectionList,
                knowledgeLevel: knowledgeItem.importance
            }
        ))
        const res = await $http.post('/knowledge/save', data)
        console.log("data:",data);
        // console.log("jjjjjjjjjjjjj");
        console.log("res",res);
        
        return true;
    },
    async submitAbilityData(context, payload: { abilityItem: IAbilityItem }) {
        // 能力点录入
      
        const res = await $http.post('/ability/save',payload)
        console.log("data:",payload);
        console.log("res",res);
        return res.status
     
    },
     /**
     * 
     * 获取课程信息
     */
      async getCourseInfo() {
        const res = await $http.get('/course/list');
        console.log("rescourse:",res.data);
        
        return  res.data
        
    },
    async getKnowledgeData(){
        const  res=await $http.get('/knowledge/listByCourseId')
        console.log("knowledgedata：",res);
        
    }
}
