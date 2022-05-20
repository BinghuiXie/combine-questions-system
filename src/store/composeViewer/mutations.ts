import { IKnowledgeState } from './compose.interface';
import { MutationTree } from 'vuex';
import * as types from './mutationTypes';
import {IKnowledgeItem} from "@/interfaces/compose-viewer/knowledge.interface";


export const mutations: MutationTree<IKnowledgeState> = {
   
        [types.GET_KNOWLEDGE_INFO](state, payload: {knowledgeInfo: IKnowledgeItem}) {
            const { knowledgeInfo } = payload;
            if(knowledgeInfo) {
                state.knowledgeInfo = knowledgeInfo as IKnowledgeItem;
            }
        }
}