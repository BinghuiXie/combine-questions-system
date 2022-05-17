import { ISigninState } from './signin/signin.interface';
import { IUserState } from './personalCenter/personCenter.interface';

export interface IRootState {
    signin: ISigninState;
    userInfo: IUserState;
}