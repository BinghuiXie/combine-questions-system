import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { ISigninState } from './signin.interface';

const state: ISigninState = {
  // 教师登录信息
  teacherInfo: {
    teacherId: '',
    tPassword: ''
  },
  //管理员登录信息
  administratorInfo: {
    administratorId: '',
    aPassword: ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}