import { Component, Prop, Emit } from 'vue-property-decorator';
import { State, Action } from 'vuex-class';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import { 
    INPUT_EMPLOYEE_ID,
    INPUT_PASSWPRD,
    REMEMBER_PASSWORD,
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH,
    MAX_EMPLOYEE_ID_LENGTH,
    LOGIN_TEACHERINFO_KEY
 } from '@/common/constants';
 import { SigninRules } from '@/components/signin/rules';
import { ITeacherInfo, IBaseInfo } from '@/interfaces';
import storage from '@/utlis/localStorage';

@Component
export default class TeacherInput extends mixins(Lang) {

    @State(state => state.signin.teacherInfo)
    teacherInfo!: ITeacherInfo;

    @Action('handleInput')
    private handleInput!: (payload: { newModel: ITeacherInfo }) => void

    @Action('autoFillUserInfo')
    private autoUpdateUserInfo!: (payload: { userInfo: ITeacherInfo }) => void

    public $refs!: {
        loginForm: Vue & {
            validate: (param?: any) => any
        };
    }

    public get model(): ITeacherInfo {
        return { ...this.teacherInfo }
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
        if(val && this.isInputValid()) {
            // 将信息存入 localStorage
            storage.set(LOGIN_TEACHERINFO_KEY, this.model);
        }
    }

    fillTeacherInfo(info: ITeacherInfo) {
        this.handleInput({ newModel: info});
    }

    /**
     *  自动填充用户名密码
     */
    autoFillUserInfo() {
        const data = storage.get(LOGIN_TEACHERINFO_KEY);
        this.autoUpdateUserInfo({ userInfo: data });
        this.fillTeacherInfo(this.teacherInfo);
    }

    mounted() {
        if(storage.get(LOGIN_TEACHERINFO_KEY)) {
            this.autoFillUserInfo();
        }
    }

    render() {
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
                    prop='employeeId'
                >
                    <el-input
                        maxlength={ MAX_EMPLOYEE_ID_LENGTH }
                        show-word-limit
                        v-model={this.model.employeeId}
                        onInput={ () => { this.handleInput({ newModel: this.model }) } }
                        placeholder={ this.t(INPUT_EMPLOYEE_ID) }
                    ></el-input>
                </el-form-item>
                <el-form-item 
                    class='login-el-form-item password__content' 
                    prop='tPassword'
                >
                    <el-input
                        type='password'
                        maxlength={MAX_PASSWORD_LENGTH}
                        minlength={MIN_PASSWORD_LENGTH}
                        show-password
                        v-model={this.model.tPassword}
                        onInput={ () => { this.handleInput({ newModel: this.model }) } }
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
                    <el-button type='primary'>
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        )
    }
}