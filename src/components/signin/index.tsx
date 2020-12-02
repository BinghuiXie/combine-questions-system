import { Component, Vue } from 'vue-property-decorator';
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
    IRegisterData, 
    IUserInfo 
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

    public registerData: IRegisterData = {
        employeeId: '',
        studentId: '',
        password: '',
        phone: '',
        identity: 'teacher',
        authCode: '',
        confirmPass: ''
    };

    public userInfo: IUserInfo = {
        studentId: '',
        employeeId: '',
        password: ''
    }

    public handleRegister() {
        this.isRegister = true;
    }

    public switchLoginStatus() {
        this.isRegister = false;
    }

    public handleUpdateRegisterData(value: IRegisterData) {
        this.registerData = value;
    }

    public handleUpdateUserInfo(value: IUserInfo) {
        this.userInfo = value;
    }

    render() {
        return (
            <div class='login-wrapper'>
                <Canvas/>
                <div class="login__background"></div>
                <div class='login-el-form__wrapper'>
                    <div class='platform__logo'>
                        <i class='iconfont icon-icon_xinyong_xianxing_jijin-'></i>
                    </div>
                    <div class="login__title">
                        { this.t( WELCOME_NOTE ) }
                    </div>
                    {
                        this.isRegister 
                        ? <RegisterWrapper
                            registerData={this.registerData}
                            onBackToLogin={this.switchLoginStatus}
                            onUpdateRegisterData={this.handleUpdateRegisterData}
                        />
                        : 
                        <LoginWrapper
                            userInfo={this.userInfo}
                            onUpdateUserInfo={this.handleUpdateUserInfo}
                            onHandleRegister={this.handleRegister}
                        />
                    }
                </div>
            </div>
        )
    }
}