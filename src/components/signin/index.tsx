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

    public studentInfo: IStudentInfo = {
        studentId: '',
        sPassword: ''
    }

    public teacherInfo: ITeacherInfo = {
        employeeId: '',
        tPassword: ''
    }

    public handleRegister() {
        this.isRegister = true;
    }

    public switchLoginStatus() {
        this.isRegister = false;
    }

    public handleUpdateRegisterData(value: IRegisterData<string>) {
        this.registerData = value;
    }

    public handleUpdateUserInfo(value: any) {
        if(value.hasOwnProperty('studentId')) {
            this.studentInfo = value;
        } else {
            this.teacherInfo = value;
        }
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
                            teacherInfo={this.teacherInfo}
                            studentInfo={this.studentInfo}
                            onUpdateUserInfo={this.handleUpdateUserInfo}
                            onHandleRegister={this.handleRegister}
                        />
                    }
                </div>
            </div>
        )
    }
}