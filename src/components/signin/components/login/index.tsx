import { Component, Emit, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import TeacherInput from './teacherInput';
import StudentInput from './studentInput';
import Lang from '@/lang/lang';
import { 
    TEACHER_LOGIN,
    STUDENT_LOGIN,
    FORGOT_PASSWORD,
    REGISTER_COUNT,
    MAX_STUDENT_ID_LENGTH
 } from '@/common/constants'

import './style.scss';
import { IStudentInfo, ITeacherInfo } from '@/interfaces';
import storage from '@/utlis/localStorage';

@Component({
    components: {
        TeacherInput,
        StudentInput
    }
})
export default class LoginWrapper extends mixins(Lang) {

    private readonly translateDis: number = 18;

    private isTeacherLogin: boolean = true;

    private switchTime: number = 0;

    private startIndex: 0 | 1 | 2 = 1;

    public isRememberPass: boolean = false;

    public $refs!: {
        scrollBox: HTMLDivElement;
    }

    @Emit('handleRegister')
    public handleRegister() {}

     /** 切换登录角色
     */
    handleSwitchIdentity(e: any) {
        this.switchTime++;
        e.target.style.transform = `rotate(${this.switchTime * 180}deg)`;
        this.handleScrollBoxTranslate(this.startIndex, this.translateDis);
        if(this.startIndex === 2) {
            this.startIndex = 1;
            setTimeout(() => {
                this.$refs.scrollBox.style.transitionProperty = 'none';
                this.$refs.scrollBox.style.transform = `translate(0, 0)`;
                this.handleScrollBoxTranslate(0, 0);
            }, 300);
        } else {
            this.startIndex++;
            this.$refs.scrollBox.style.transition = 'all 300ms';
        }
        this.isTeacherLogin = !this.isTeacherLogin;
    }

    handleScrollBoxTranslate(index: number, distance: number) {
        this.$refs.scrollBox.style.transform = `translate(0, -${index * distance}px)`;
    }

    render() {
        return (
            <div class='login-wrapper'>
                <div class='login-wrapper_switch-identity'>
                    <div class='switch-identity-box'>
                        <ul ref='scrollBox'>
                            <li class='switch-identity-item'>{ this.t(TEACHER_LOGIN) }</li>
                            <li class='switch-identity-item'>{ this.t(STUDENT_LOGIN) }</li>
                            <li class='switch-identity-item'>{ this.t(TEACHER_LOGIN) }</li>
                        </ul>
                    </div>
                    <i 
                        class='iconfont icon-switch'
                        onclick={ (e: any) => { this.handleSwitchIdentity(e) } }
                    />
                </div>
                {
                    this.isTeacherLogin 
                    ? <TeacherInput
                        teacherInfo={this.teacherInfo}
                    /> 
                    : <StudentInput
                        studentInfo={this.studentInfo}
                    />
                }
                <div class='login__bottom-info'>
                    <div class='register-forget'>
                        <span onclick={ this.handleRegister }>{ this.t( REGISTER_COUNT ) }</span>
                        <span>{ this.t( FORGOT_PASSWORD ) }</span>
                    </div>
                    <div class='login__bottom-line'/>
                    <div class='disclaimer-text'>
                        <el-checkbox>
                            已阅读并同意<a href="">《XXXXXXX协议》</a>
                        </el-checkbox>
                    </div>
                </div>
                
            </div>
        )
    }
}