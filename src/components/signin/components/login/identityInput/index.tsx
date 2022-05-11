import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import Lang from "@/lang/lang";
import { State, Action } from "vuex-class";
import Storage from "@/utlis/localStorage";
import { validateInput } from "@/utlis";
import { SigninRules } from "@/common/rules/signin";
import { IAdministratorInfo, ITeacherInfo, IBindUserInfo } from "@/interfaces";
import { 
    PHONE_LENGTH,
    ADMINISTRATOR_ID,
    TEACHER_ID,
    INPUT_PHONE_ID,
    ADMINISTRATOR_PASSWORD,
    TEACHER_PASSWORD,
    InputType,
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH,
    INPUT_PASSWPRD,
    LOGIN_ADMINISTRATORINFO_KEY,
    LOGIN_TEACHERINFO_KEY,
    REMEMBER_PASSWORD,
    ButtonType,
    ERROR_MESSAGE
} from '@/common/constants';

const storage = new Storage();

const ComponentProp = Vue.extend({
    props: {
        isSelectProtocol: Boolean,
    },
});

@Component
export default class IdentityInput extends mixins(Lang, ComponentProp) {
    @State((state) => state.signin.administratorInfo)
    administratorInfo!: IAdministratorInfo;

    @State((state) => state.signin.teacherInfo)
    teacherInfo!: ITeacherInfo;

    @Action('handleInput')
    private handleInput!: (payload: { newModel: IBindUserInfo }) => void

    @Action('autoFillUserInfo')
    private autoUpdateUserInfo!: (payload: { userInfo: IBindUserInfo }) => void

    @Action('handleUserLogin')
    private handleUserLogin!: (payload: { data: IBindUserInfo }) => void

    public $refs!: {
        loginForm: Vue & {
            validate: (param?: any) => any;
        };
    };

    @Prop()
    public isSelectProtocol: boolean = false;

    @Prop()
    public identity: 0 | 1 = 0; // 0 => 管理员; 1 => 教师 

    public get model(): IBindUserInfo {
        return this.isAdministrator
            ? { ...this.administratorInfo }
            : { ...this.teacherInfo };
    }

    public get isAdministrator(): boolean {
        return this.identity === 0;
    }

    public get storageKey(): string {
        return this.isAdministrator ? LOGIN_ADMINISTRATORINFO_KEY : LOGIN_TEACHERINFO_KEY;
    }

    public get pwdName(): string {
        return this.isAdministrator ? ADMINISTRATOR_PASSWORD : TEACHER_PASSWORD;
    }

    public get idName(): string {
        return this.isAdministrator ? ADMINISTRATOR_ID : TEACHER_ID;
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
     public async isInputValid(): Promise<boolean> {
        const validateRes = await validateInput(this.model, SigninRules, 0);
        console.log(typeof validateRes === 'object');
        console.log(validateRes);
        return !(typeof validateRes === 'object');
    }

    public clickLoginButton() {
        if(this.isSelectProtocol) {
            this.handleUserLogin({ data: this.model })
        } else {
            this.$message.error(this.t(ERROR_MESSAGE.NOT_SELECT_USER_PROTOCOL));
        }
    }

    public async switchRememberPass(val: boolean) {
        if(val && await this.isInputValid()) {
            console.log(333);
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
        return (
            <el-form
                class="login-el-form"
                rules={SigninRules}
                ref="loginForm"
                {...{ props: { model: this.model } }}
            >
                <el-form-item class="login-el-form-item"></el-form-item>
                <el-form-item class="login-el-form-item" prop={this.idName}>
                    <el-input
                        maxlength={PHONE_LENGTH}
                        show-word-limit
                        v-model={this.idInput}
                        onInput={() => {
                            this.handleInput({ newModel: this.model });
                        }}
                        placeholder={this.t(INPUT_PHONE_ID)}
                    ></el-input>
                </el-form-item>
                <el-form-item
                    class="login-el-form-item password__content"
                    prop={this.pwdName}
                >
                    <el-input
                        type={InputType.PASSWORD}
                        maxlength={MAX_PASSWORD_LENGTH}
                        minlength={MIN_PASSWORD_LENGTH}
                        show-password
                        v-model={this.password}
                        onInput={() => {
                            this.handleInput({ newModel: this.model });
                        }}
                        placeholder={this.t(INPUT_PASSWPRD)}
                    ></el-input>
                </el-form-item>
                <el-form-item class="login-el-form-item remember-pwd">
                    <el-checkbox
                        ref="checkbox"
                        onchange={this.switchRememberPass}
                    >
                        {this.t(REMEMBER_PASSWORD)}
                    </el-checkbox>
                </el-form-item>
                <el-form-item class="login-el-form-item">
                    <el-button
                        type={ButtonType.PRIMARY}
                        onclick={this.clickLoginButton}
                    >
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        );
    }
}
