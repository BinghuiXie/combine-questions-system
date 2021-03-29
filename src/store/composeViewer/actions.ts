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

        // 对于节的数据，只需要取对应节的 id 即可，也就是 item[1]
        for(let knowledgeItem of knowledgeList) {
            let sectionList = knowledgeItem.sectionList;
            if(Array.isArray(sectionList[0])) {
                knowledgeItem.sectionList = (sectionList as []).map((item: number[]) => item[1]);
            }
        }

        const data = knowledgeList.map(knowledgeItem => (
            {
                courseId: courseId,
                knowledgeContent: knowledgeItem.content,
                parentIdCollection: knowledgeItem.chapterList,
                childrenIdCollection: knowledgeItem.sectionList,
                knowledgeLevel: knowledgeItem.importance
            }
        ))
        const res = await $http.post('/knowledge/insert', data)
        return true;
    },
    async submitAbilityData(context, payload: { abilityList: Array<IAbilityItem> }) {
        // 能力点录入

    }
}
