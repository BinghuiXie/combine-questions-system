import { CreateElement } from 'vue';
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Canvas from './components/canvas';
import LoginWrapper from './components/login';
import ForgotPwdWrapper from './components/forgotPwd';
import Lang from '@/lang/lang';
import {
  WELCOME_NOTE
} from '@/common/constants'
import './style.scss';
import { 
  IForgotPwdData
} from '@/interfaces';

@Component({
  components: {
      Canvas,
      LoginWrapper,
      ForgotPwdWrapper
  }
})
export default class Signin extends mixins(Lang) {

  private isForgotPwd: boolean = false;

  public loginWrapper = 'LoginWrapper';

  public forgotPwdWrapper = 'ForgotPwdWrapper';

  public forgotPwdData: IForgotPwdData<string> = {
      password: '',
      phone: '',
      authCode: '',
      confirmPass: ''
  };

  public handleForgotPwd() {
      this.isForgotPwd = true;
  }

  public switchLoginStatus() {
      this.isForgotPwd = false;
  }

  public handleUpdateforgotPwdData(value: IForgotPwdData<string>) {
      this.forgotPwdData = value;
  }

  public renderforgotPwdComponent(h: CreateElement) {
      return h(this.$options.components![this.forgotPwdWrapper], {
          props: {
              forgotPwdData: this.forgotPwdData
          },
          on: {
              backToLogin: this.switchLoginStatus
          }
      })
  }

  public renderLoginComponent(h: CreateElement) {
      return h(this.$options.components![this.loginWrapper], {
          on: {
              handleForgotPwd: this.handleForgotPwd
          }
      })
  }

  render(h: CreateElement) {
      return (
          <div class='signin-wrapper'>
              <Canvas/>
              <div class="signin__background"></div>
              <div class='signin-el-form__wrapper'>
                  <div class='platform__logo'>
                      <i class='iconfont icon-icon_xinyong_xianxing_jijin-'></i>
                  </div>
                  <div class="signin__title">
                      { this.t( WELCOME_NOTE ) }
                  </div>
                  {
                      this.isForgotPwd 
                      ? this.renderforgotPwdComponent(h)
                      : this.renderLoginComponent(h)
                  }
              </div>
          </div>
      )
  }
}