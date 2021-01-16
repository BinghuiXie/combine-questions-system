import { getters } from './getters';
import { actions } from './actions';
import { mutations } from './mutations';
import { ISigninState } from './signin.interface';

const state: ISigninState = {
  // 教师登录信息
  teacherInfo: {
    employeeId: '',
    tPassword: ''
  },
  // 学生登录信息
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