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
    MAX_EMPLOYEE_ID_LENGTH,
    LOGIN_USERINFO_KEY,
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
    
    @Prop({ default: () => ( {
        employeeId: '',
        tPassword: ''
    } )})
    teacherInfo!: ITeacherInfo;

    @Prop({ default: () => ( {
        studentId: '',
        sPassword: ''
    } )})
    studentInfo!: IStudentInfo;

    private readonly translateDis: number = 18;

    private isTeacherLogin: boolean = true;

    private switchTime: number = 0;

    private startIndex: 0 | 1 | 2 = 1;

    public isRememberPass: boolean = false;

    public $refs!: {
        scrollBox: HTMLDivElement;
        loginForm: Vue & { 
            validate: (param?: any) => any 
        };
    }

    public get model(): { [key: string]: string } {
        return this.isTeacherLogin ? { ...this.teacherInfo } : { ...this.studentInfo };
    }

    public set model(newValue: { [key: string]: string }) {
        console.log('newValue: ', newValue);
        const keys = Object.keys(newValue);
        keys.forEach((key: string) => {
            this.model[key] = newValue[key];
            console.log(this.model);
        })
    }

    @Emit('handleRegister')
    public handleRegister() {}

    @Emit('updateUserInfo')
    public updateUserInfo(data: IStudentInfo | ITeacherInfo | { [key: string]: string }) {}

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

    handleInput(value: any) {
        this.model = value;
        this.updateUserInfo(this.model)
    }

    /** 检查输入是否合规(与每次输入判断不同，该方法用在整体对输入的判断上)
     * 
     */
    isInputValid(): boolean {
        // TODO: 优化返回判断输入是否符合规则的逻辑
        let res = false;
        this.$refs.loginForm.validate((valid: boolean) => {
            res = valid;
        });
        return res;
    }

    switchRememberPass(val: boolean) {
        this.isRememberPass = val;
        if(val && this.isInputValid()) {
            // 将信息存入 localStorage
            let userInfo = {
                id: this.model.studentId || this.model.employeeId,
                password: this.model.password
            }
            storage.set(LOGIN_USERINFO_KEY, userInfo);
        }
    }

    /**
     *  自动填充用户名密码
     */
    autoFillUserInfo() {
        // TODO: 自动填充分开教师和学生
        const data = storage.get(LOGIN_USERINFO_KEY);
        // 判断 localStorage 里面的信息是老师还是学生的
        this.isTeacherLogin = !(data.id.length === MAX_STUDENT_ID_LENGTH);
        this.startIndex = this.isTeacherLogin ? 0 : 1;
        const identity = this.isTeacherLogin ? 'employeeId': 'studentId';
        this.handleScrollBoxTranslate(this.startIndex, this.translateDis);
        if(data) {
            this.model[identity] = data.id;
            this.model.password = data.password;
            // 填充值到框里面
            this.updateUserInfo(this.model);
            // TODO: element-ui checkbox 选中样式
        }
    }

    mounted() {
        if(storage.get(LOGIN_USERINFO_KEY)) {
            this.autoFillUserInfo();
        }
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
                        onSwitchRememberPass={this.switchRememberPass}
                        onInput={this.handleInput}
                    /> 
                    : <StudentInput
                        studentInfo={this.studentInfo}
                        onSwitchRememberPass={this.switchRememberPass}
                        onInput={this.handleInput}
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