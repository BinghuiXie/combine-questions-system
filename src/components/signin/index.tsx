import { Component } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
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
    IUserInfo,
    ITeacherInfo,
    IStudentInfo
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

    render() {
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
                        ? <RegisterWrapper
                            registerData={this.registerData}
                            onBackToLogin={this.switchLoginStatus}
                            onUpdateRegisterData={this.handleUpdateRegisterData}
                        />
                        : 
                        <LoginWrapper
                            onHandleRegister={this.handleRegister}
                        />
                    }
                </div>
            </div>
        )
    }
}