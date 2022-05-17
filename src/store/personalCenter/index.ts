import { actions } from './actions';
import { mutations } from './mutations';
import { IUserState } from './personCenter.interface';

const state: IUserState = {
  userInfo: {
    // userName, identityId, phone, courseName, roleId
    userName: null,
    identityId: '',
    phone: null,
    courseName: null,
    roleId: 1
  },
  
}

export default {
  state,
  actions,
  mutations
}