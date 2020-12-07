import { Component, Prop, Emit } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import { 
    INPUT_PASSWPRD,
    REMEMBER_PASSWORD,
    INPUT_STUDENT_ID,
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH,
    MAX_STUDENT_ID_LENGTH,
    LOGIN_STUDENTINFO_KEY
 } from '@/common/constants';
import { SigninRules } from '@/components/signin/rules';
import { IStudentInfo } from '@/interfaces';
import storage from '@/utlis/localStorage';

@Component
export default class StudentInput extends mixins(Lang) {


    @Prop()
    studentInfo!: IStudentInfo;

    @Emit('input')
    handleInput(newModel: IStudentInfo){}

    public $refs!: {
        loginForm: Vue & {
            validate: (param?: any) => any 
        };
    }

    public get model(): IStudentInfo {
        return { ...this.studentInfo }
    }

    public set model(newValue: IStudentInfo) {
        const keys = Object.keys(newValue);
        keys.forEach((key: string) => {
            this.model[key] = newValue[key];
        })
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
            storage.set(LOGIN_STUDENTINFO_KEY, this.model);
        }
    }

    fillStudentInfo(info: IStudentInfo) {
        this.handleInput(info);
    }

    /**
     *  自动填充用户名密码
     */
    autoFillUserInfo() {
        const data = storage.get(LOGIN_STUDENTINFO_KEY);
        this.model = data;
        this.fillStudentInfo(this.model);
    }

    mounted() {
        if(storage.get(LOGIN_STUDENTINFO_KEY)) {
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
                    prop='studentId'
                >
                    <el-input
                        maxlength={ MAX_STUDENT_ID_LENGTH }
                        show-word-limit
                        v-model={this.model.studentId}
                        onInput={ () => { this.handleInput(this.model) }  }
                        placeholder={ this.t(INPUT_STUDENT_ID) }
                    ></el-input>
                </el-form-item>
                <el-form-item 
                    class='login-el-form-item password__content' 
                    prop='sPassword'
                >
                    <el-input
                        type='password'
                        maxlength={MAX_PASSWORD_LENGTH}
                        minlength={MIN_PASSWORD_LENGTH}
                        show-password
                        v-model={this.model.sPassword}
                        onInput={ () => { this.handleInput(this.model) }  }
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