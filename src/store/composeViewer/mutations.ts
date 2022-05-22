import { IComposeState } from './compose.interface';
import { MutationTree } from 'vuex';
import * as types from './mutationTypes';
import {IKnowledgeItem1} from "@/interfaces/compose-viewer/knowledge.interface";


export const mutations: MutationTree<IComposeState> = {
   
        [types.GET_KNOWLEDGE_INFO](state, payload: {knowledgeInfo: IKnowledgeItem1}) {
            const { knowledgeInfo } = payload;
            if(knowledgeInfo) {
                state.knowledgeInfo = knowledgeInfo as IKnowledgeItem1;
            }
        },
}