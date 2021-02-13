import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import { 
    INPUT_PASSWPRD,
    REMEMBER_PASSWORD,
    INPUT_STUDENT_ID,
    INPUT_EMPLOYEE_ID,
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH,
    MAX_STUDENT_ID_LENGTH,
    MAX_EMPLOYEE_ID_LENGTH,
    LOGIN_STUDENTINFO_KEY,
    LOGIN_TEACHERINFO_KEY,
    ERROR_MESSAGE,
    STUDENT_ID,
    TEACHER_ID,
    STUDENT_PASSWORD,
    TEACHER_PASSWORD,
    InputType,
    ButtonType
 } from '@/common/constants';
import { SigninRules } from '@/common/rules/signin';
import { IStudentInfo, ITeacherInfo, IBindUserInfo } from '@/interfaces';
import Storage from '@/utlis/localStorage';

const storage = new Storage();

const ComponentProp = Vue.extend({
    props: {
        isSelectProtocol: Boolean
    }
})

@Component
export default class IdentityInput extends mixins(Lang, ComponentProp) {

    @State(state => state.signin.studentInfo)
    studentInfo!: IStudentInfo;

    @State(state => state.signin.teacherInfo)
    teacherInfo!: ITeacherInfo;

    @Action('handleInput')
    private handleInput!: (payload: { newModel: IBindUserInfo }) => void

    @Action('autoFillUserInfo')
    private autoUpdateUserInfo!: (payload: { userInfo: IBindUserInfo }) => void

    @Action('handleUserLogin')
    private handleUserLogin!: (payload: { data: IBindUserInfo }) => void
    
    public $refs!: {
        loginForm: Vue & {
            validate: (param?: any) => any 
        };
    }

    @Prop()
    public isSelectProtocol: boolean = false;

    @Prop()
    public identity: 0 | 1 = 0; // 0 => 教师; 1 => 学生 

    @Watch('identity')
    onIdentityChange() {
        this.autoFillUserInfo();
    }

    public get model(): IBindUserInfo {
        return this.isTeacher ? { ...this.teacherInfo } : { ...this.studentInfo }
    }

    public get isTeacher(): boolean {
        return this.identity === 0;
    }

    public get storageKey(): string {
        return this.isTeacher ? LOGIN_TEACHERINFO_KEY : LOGIN_STUDENTINFO_KEY;
    }

    public get idLength(): number {
        return this.isTeacher ? MAX_EMPLOYEE_ID_LENGTH : MAX_STUDENT_ID_LENGTH;
    }

    public get idPlaceholder(): string {
        return this.isTeacher ? INPUT_EMPLOYEE_ID : INPUT_STUDENT_ID;
    }

    public get idName(): string {
        return this.isTeacher ? TEACHER_ID : STUDENT_ID;
    }

    public get pwdName(): string {
        return this.isTeacher ? TEACHER_PASSWORD : STUDENT_PASSWORD;
    }

    public get idInput() {
        return this.model[this.idName];
    }

    public set idInput(value) {
        this.model[this.idName] = value;
    }

    public get password(): string {
        return this.model[this.pwdName];
    }

    public set password(value) {
        this.model[this.pwdName] = value;
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

    public clickLoginButton() {
        if(this.isSelectProtocol) {
            this.handleUserLogin({ data: this.model })
        } else {
            this.$message.error(this.t(ERROR_MESSAGE.NOT_SELECT_USER_PROTOCOL));
        }
    }

    switchRememberPass(val: boolean) {
        if(val && this.isInputValid()) {
            // 将信息存入 localStorage
            storage.set(this.storageKey, this.model);
        }
    }

    /**
     *  自动填充用户名密码
     */
    autoFillUserInfo() {
        const data = storage.get(this.storageKey);
        this.autoUpdateUserInfo({ userInfo: data });
    }

    mounted() {
        if(storage.get(this.storageKey)) {
            this.autoFillUserInfo();
        }
    }

    render() {
        console.log(storage)
        return (
            <el-form
                class='login-el-form'
                rules={SigninRules}
                ref='loginForm'
                {...{ props: { model: this.model } }}
            >
                <el-form-item class='login-el-form-item'>
                    
                </el-form-item>
                <el-form-item
                    class='login-el-form-item'
                    prop={this.idName}
                >
                    <el-input
                        maxlength={ this.idLength }
                        show-word-limit
                        v-model={this.idInput}
                        onInput={ () => { this.handleInput({ newModel: this.model }) }  }
                        placeholder={ this.t(this.idPlaceholder) }
                    ></el-input>
                </el-form-item>
                <el-form-item 
                    class='login-el-form-item password__content'
                    prop={this.pwdName}
                >
                    <el-input
                        type={ InputType.PASSWORD }
                        maxlength={MAX_PASSWORD_LENGTH}
                        minlength={MIN_PASSWORD_LENGTH}
                        show-password
                        v-model={this.password}
                        onInput={ () => { this.handleInput({ newModel: this.model }) }  }
                        placeholder={ this.t(INPUT_PASSWPRD) }
                    ></el-input>
                </el-form-item>
                <el-form-item class='login-el-form-item remember-pwd'>
                    <el-checkbox
                        ref='checkbox'
                        onchange={this.switchRememberPass}
                    >{ this.t(REMEMBER_PASSWORD) }</el-checkbox>
                </el-form-item>
                <el-form-item class='login-el-form-item'>
                    <el-button type={ ButtonType.PRIMARY } onclick={ this.clickLoginButton }>
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        )
    }
}