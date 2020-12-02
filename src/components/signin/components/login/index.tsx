import { Component, Emit, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';

import { 
    INPUT_EMPLOYEE_ID,
    INPUT_PASSWPRD,
    TEACHER_LOGIN,
    STUDENT_LOGIN,
    REMEMBER_PASSWORD,
    FORGOT_PASSWORD,
    REGISTER_COUNT,
    INPUT_STUDENT_ID
 } from '@/common/constants'

import './style.scss';
import { IUserInfo } from '@/interfaces';

@Component
export default class LoginWrapper extends mixins(Lang) {

    @Prop({ default: () => ( {
        employeeId: '',
        studentId: '',
        password: ''
    } )})
    userInfo!: IUserInfo;

    private isTeacherLogin: boolean = true;

    private switchTime: number = 0;

    private startIndex: 0 | 1 | 2 = 1;

    public $refs!: {
        scrollBox: HTMLDivElement
    }

    public get model() {
        return {...this.userInfo}
    }

    public get userId() {
        return this.isTeacherLogin ? this.model.employeeId : this.model.studentId;
    }

    @Emit('handleRegister')
    public handleRegister() {}

    @Emit('updateUserInfo')
    public updateUserInfo(data: IUserInfo) {}

     /** 切换登录角色
     */
    handleSwitchIdentity(e: any) {
        this.switchTime++;
        e.target.style.transform = `rotate(${this.switchTime * 180}deg)`;
        this.$refs.scrollBox.style.transform = `translate(0, -${this.startIndex * 18}px)`;
        if(this.startIndex === 2) {
            this.startIndex = 1;
            setTimeout(() => {
                this.$refs.scrollBox.style.transitionProperty = 'none';
                this.$refs.scrollBox.style.transform = `translate(0, 0)`;
            }, 300);
        } else {
            this.startIndex++;
            this.$refs.scrollBox.style.transition = 'all 300ms';
        }
        this.isTeacherLogin = !this.isTeacherLogin;
    }

    handleInput() {
        this.updateUserInfo(this.model)
    }

    render() {
        return (
            <el-form class='login-el-form'>
                <el-form-item class='login-el-form-item'>
                    <div class='el-form-item_switch-identity'>
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
                </el-form-item>
                <el-form-item class='login-el-form-item'>
                    <el-input
                        v-model={this.userId}
                        onInput={ this.handleInput }
                        placeholder={ 
                            this.isTeacherLogin 
                            ? this.t(INPUT_EMPLOYEE_ID)
                            : this.t(INPUT_STUDENT_ID)
                        }
                    ></el-input>
                </el-form-item>
                <el-form-item class='login-el-form-item'>
                    <el-input
                        type='password'
                        v-model={this.model.password}
                        onInput={ this.handleInput }
                        placeholder={ this.t(INPUT_PASSWPRD) }
                    ></el-input>
                </el-form-item>
                <el-form-item class='login-el-form-item remember-pwd'>
                    <el-checkbox>{ this.t(REMEMBER_PASSWORD) }</el-checkbox>
                </el-form-item>
                <el-form-item class='login-el-form-item'>
                    <el-button type='primary'>
                        登录
                    </el-button>
                </el-form-item>
                <el-form-item class='login-el-form-item bottom-info'>
                    <div class='el-form_bottom-info'>
                        <span onclick={ this.handleRegister }>{ this.t( REGISTER_COUNT ) }</span>
                        <span>{ this.t( FORGOT_PASSWORD ) }</span>
                    </div>
                </el-form-item>
                <div class='login__bottom-line'/>
                <div class='disclaimer-text'>
                    <el-checkbox>
                        已阅读并同意<a href="">《XXXXXXX协议》</a>
                    </el-checkbox>
                </div>
            </el-form>
        )
    }
}