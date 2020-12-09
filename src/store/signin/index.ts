import { IUserInfo as IUserState } from '@/interfaces';
import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';

const state: IUserState = {
  teacherInfo: {
    employeeId: '',
    tPassword: ''
  },
  studentInfo: {
    studentId: '',
    sPassword: ''
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}