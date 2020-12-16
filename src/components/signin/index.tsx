import { CreateElement } from 'vue';
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Canvas from './components/canvas';
import LoginWrapper from './components/login';
import RegisterWrapper from './components/register';
import Lang from '@/lang/lang';
import {
    WELCOME_NOTE
 } from '@/common/constants'
import './style.scss';
import { 
    IRegisterData
} from '@/interfaces';

@Component({
    components: {
        Canvas,
        LoginWrapper,
        RegisterWrapper
    }
})
export default class Signin extends mixins(Lang) {

    private isRegister: boolean = false;

    public loginWrapper = 'LoginWrapper';

    public registerWrapper = 'RegisterWrapper';

    public registerData: IRegisterData<string> = {
        employeeId: '',
        studentId: '',
        password: '',
        phone: '',
        identity: 'teacher',
        authCode: '',
        confirmPass: ''
    };

    public handleRegister() {
        this.isRegister = true;
    }

    public switchLoginStatus() {
        this.isRegister = false;
    }

    public handleUpdateRegisterData(value: IRegisterData<string>) {
        this.registerData = value;
    }

    public renderRegisterComponent(h: CreateElement) {
        return h(this.$options.components![this.registerWrapper], {
            props: {
                registerData: this.registerData
            },
            on: {
                backToLogin: this.switchLoginStatus
            }
        })
    }

    public renderLoginComponent(h: CreateElement) {
        return h(this.$options.components![this.loginWrapper], {
            on: {
                handleRegister: this.handleRegister
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
                        this.isRegister 
                        ? this.renderRegisterComponent(h)
                        : this.renderLoginComponent(h)
                    }
                </div>
            </div>
        )
    }
}