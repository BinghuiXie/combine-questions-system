import { actions } from './actions';
import { mutations } from './mutations';
import { IComposeState } from './compose.interface';

const state: IComposeState = {
 knowledgeInfo: {
  gmtCreate:null,
  gmtModified:null,
  knowledgeAbilityId:0,
  knowledgeContent:"",
  knowledgeCourseId:0,
  knowledgeId:0,
  knowledgeImportance:0,
 }
  
}

export default {
  state,
  actions,
  mutations
}