import { Component, Emit } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { State, Action } from "vuex-class";
import Lang from "@/lang/lang";
import { SigninRules } from "@/common/rules/signin";
import "./style.scss";
import { 
    INPUT_PHONE_NUMER,
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH,
    INPUT_PASSWPRD,
    InputType,
    CONFIRM_PASSWORD,
    INPUT_AUTH_CODE,
    ButtonType,
    SEND_AUTH_CODE,
    CHANGE_NOW,
    BACK_TO_LOGIN,
    ERROR_MESSAGE,
    HTTPCODE
} from "@/common/constants";
import {
    IForgotPwdData, 
    IForgotPwdResponseData 
} from "@/interfaces";
import { validateInput } from "@/utlis";
import { AxiosResponse } from "axios";

@Component
export default class ForgotPwdWrapper extends mixins(Lang) {
    public model: IForgotPwdData<string> = {
        password: "",
        confirmPass: "",
        phone: "",
        authCode: "",
    };

    public isSendCode: boolean = false;

    public $refs!: {
        forgotPwdForm: Vue & { 
            validate: (param?: any) => boolean 
        }
    }

    @Emit('backToLogin')
    public backToLogin() {}

    @Action('handleInfoSubmit')
    handleInfoSubmit!: (payload: { data: IForgotPwdData<string>}) => Promise<AxiosResponse<IForgotPwdResponseData>>

    @Action('handleSendCode')
    handleSendCode!: (payload: { phoneNumber: string }) => void

    sendAuthCode(e: MouseEvent) {
        const button = e.target as HTMLButtonElement;
        let time = 60;
        if(!this.model.phone) {
            this.$message.error(this.t(ERROR_MESSAGE.NOT_INPUT_PHONE_NUMER))
        } else {
            this.isSendCode = true;
            button.innerText = `重新发送(${String(time)}s)`;
            this.handleSendCode({ phoneNumber: this.model.phone });
            if(button) {
                const timer = setInterval(() => {
                    time--;
                    button.innerText = `重新发送(${String(time)}s)`;
                    if(+time <= 0) {
                        clearInterval(timer);
                        this.isSendCode = false;
                        button.innerText = this.t(SEND_AUTH_CODE);
                    }
                }, 1000);
            }
        }
    }

    public async handleforgotPwd() {
        const validateRes = await validateInput(this.model, SigninRules, 0);
        if(typeof validateRes === 'object') {
            this.$message.error('注册信息输入格式不正确')
        } else {
            const res = await this.handleInfoSubmit({ data: this.model});
            if(res.status === HTTPCODE.SUCCESS) {
                // 注册成功，跳转登录页面
                this.backToLogin();
            }
        }
    }


    render() {
        return (
            <div class="register-wrapper">
                <el-form
                    {...{ props: { model: this.model } }}
                    rules={SigninRules}
                    ref="forgotPwdForm"
                >
                    <el-form-item prop="phone">
                        <el-input
                            v-model={this.model.phone}
                            placeholder={this.t(INPUT_PHONE_NUMER)}
                        ></el-input>
                    </el-form-item>
                     <el-form-item prop="password">
                        <el-input
                            maxlength={MAX_PASSWORD_LENGTH}
                            minlength={MIN_PASSWORD_LENGTH}
                            show-password
                            v-model={this.model.password}
                            placeholder={this.t(INPUT_PASSWPRD)}
                            type={InputType.PASSWORD}
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop="confirmPass">
                        <el-input
                            maxlength={MAX_PASSWORD_LENGTH}
                            minlength={MIN_PASSWORD_LENGTH}
                            v-model={this.model.confirmPass}
                            show-password
                            type={InputType.PASSWORD}
                            placeholder={this.t(CONFIRM_PASSWORD)}
                        ></el-input>
                    </el-form-item>

                    <el-form-item class="el-form-item__code" prop="authCode">
                        <el-input
                            v-model={this.model.authCode}
                            placeholder={this.t(INPUT_AUTH_CODE)}
                            class="register-item__input"
                        ></el-input>
                        <el-button
                            type={ButtonType.PRIMARY}
                            class="register-item__send-code"
                            onclick={this.sendAuthCode}
                            disabled={this.isSendCode}
                        >
                            {this.t(SEND_AUTH_CODE)}
                        </el-button>
                    </el-form-item>
                    <el-form-item class="el-form-item__button">
                        <el-button
                            type={ButtonType.PRIMARY}
                            onclick={() => {
                                this.handleforgotPwd();
                            }}
                        >
                            {this.t(CHANGE_NOW)}
                        </el-button>
                    </el-form-item>
                    <div
                     class="back-login"
                      onclick={this.backToLogin}
                      >
                        <i class="iconfont icon-fenxiang"></i>
                        <span class="back-login__content">
                            {this.t(BACK_TO_LOGIN)}
                        </span>
                    </div>
                </el-form>
            </div>
        );
    }
}
