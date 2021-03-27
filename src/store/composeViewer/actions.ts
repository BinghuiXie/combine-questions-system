import { IAbilityItem } from './../../interfaces/compose-viewer/ability.interface';
import { IComposeState } from './compose.interface';
import { IKnowledgeItem } from './../../interfaces/compose-viewer/knowledge.interface';
import AJAX from '@/utlis/ajax';
import { ActionTree } from 'vuex';
import { HTTPCODE } from '@/common/constants';
import { IRootState } from './../rootState.interface';
import * as types from './mutationTypes';

const $http = new AJAX();

export const actions: ActionTree<IComposeState, IRootState> = {
    async submitKnowledgeData(context, payload: { courseId: number, knowledgeList: Array<IKnowledgeItem> }) {
        // 知识点录入
        const { courseId, knowledgeList } = payload;
        console.log(knowledgeList);
        const data = knowledgeList.map(knowledgeItem => (
            {
                courseId: courseId,
                knowledgeContent: knowledgeItem.content,
                parentIdCollection: knowledgeItem.chapterList,
                childrenIdCollection: knowledgeItem.sectionList,
                knowledgeLevel: knowledgeItem.importance
            }
        ))
        console.log(data)
        const res = await $http.post('/knowledge/insert', data)
        console.log(res);
        return true;
    },
    async submitAbilityData(context, payload: { abilityList: Array<IAbilityItem> }) {
        // 能力点录入

    }
}
