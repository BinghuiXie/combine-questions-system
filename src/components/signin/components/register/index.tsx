import { Component, Emit, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import {
    SELECT_REGISTER_IDENTITY,
    INPUT_EMPLOYEE_ID,
    INPUT_PASSWPRD,
    CONFIRM_PASSWORD,
    INPUT_PHONE_NUMER,
    INPUT_AUTH_CODE,
    SEND_AUTH_CODE,
    REGISTER_NOW,
    INPUT_STUDENT_ID,
    BACK_TO_LOGIN,
    TEACHER,
    STUDENT,
    MAX_EMPLOYEE_ID_LENGTH,
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH,
    MAX_STUDENT_ID_LENGTH
} from '@/common/constants';
import { 
    IRegisterIdentity, 
    IRegisterData
} from '@/interfaces';
import Lang from '@/lang/lang';

import './style.scss';
import { SigninRules } from '../../rules';

@Component
export default class RegisterWrapper extends mixins(Lang) {

    @Prop({ default: () => { return {
        employeeId: '',
        studentId: '',
        password: '',
        authCode: '',
        phone: '',
        identity: TEACHER,
        confirmPass: ''
    } } })
    registerData!: IRegisterData<string>;

    public get model(): IRegisterData<string> {
        return {...this.registerData}
    }

    public get userId() {
        return this.registerIdentity === STUDENT ? this.model.studentId : this.model.employeeId;
    }

    public set userId(newValue) {
        if(this.registerIdentity === STUDENT) {
            this.model.studentId = newValue;
        } else {
            this.model.employeeId = newValue;
        }
    }

    private registerIdentity: IRegisterIdentity = '';

    public isSendCode: boolean = false;

    public $refs!: {
        registerForm: Vue & { 
            validate: (param?: any) => boolean 
        }
    }

    @Emit('backToLogin')
    public backToLogin() {}

    @Emit('updateRegisterData')
    public updateRegisterData(newValue: IRegisterData<string>) {}

    handleInput() {
        this.updateRegisterData(this.model);
    }

    sendAuthCode(e: MouseEvent) {
        const button = e.target as HTMLButtonElement;
        let time = 60;
        this.isSendCode = true;
        button.innerText = `重新发送(${String(time)}s)`;
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

    handleRegister(name: string) {
        this.$refs.registerForm.validate((valid: boolean) => {
            if(valid) {
                // TODO: register logic
                console.log('submit')
            } else {
                return false;
            }
        })
    }

    render() {

        const refName = 'registerForm'

        return (
            <div class='register-wrapper'>
                <el-form 
                    {...{ props: { model: this.model } }}
                    rules={SigninRules}
                    ref={refName}
                >
                    <el-form-item>
                        <el-select
                            class='register__select-identity'
                            placeholder={ this.t(SELECT_REGISTER_IDENTITY) }
                            v-model={this.registerIdentity}
                        >
                            <el-option label='教师' value={TEACHER}></el-option>
                            <el-option label='学生' value={STUDENT}></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item prop={ this.registerIdentity === STUDENT ? 'studentId': 'employeeId' }>
                        <el-input
                            maxlength={ this.registerIdentity === STUDENT ? MAX_STUDENT_ID_LENGTH : MAX_EMPLOYEE_ID_LENGTH}
                            show-word-limit
                            v-model={this.userId}
                            onInput={this.handleInput}
                            placeholder={ 
                                this.registerIdentity === STUDENT 
                                ? this.t( INPUT_STUDENT_ID )
                                : this.t( INPUT_EMPLOYEE_ID ) 
                            }
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop='password'>
                        <el-input 
                            maxlength={MAX_PASSWORD_LENGTH}
                            minlength={MIN_PASSWORD_LENGTH}
                            show-password
                            onInput={this.handleInput}
                            v-model={this.model.password}
                            placeholder={ this.t( INPUT_PASSWPRD ) }
                            type='password'
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop='confirmPass'>
                        <el-input
                            maxlength={MAX_PASSWORD_LENGTH}
                            minlength={MIN_PASSWORD_LENGTH}
                            onInput={this.handleInput}
                            v-model={this.model.confirmPass}
                            show-password
                            type='password'
                            placeholder={ this.t( CONFIRM_PASSWORD ) }
                        ></el-input>
                    </el-form-item>
                    <el-form-item prop='phone'>
                        <el-input
                            onInput={this.handleInput}
                            v-model={this.model.phone}
                            placeholder={ this.t( INPUT_PHONE_NUMER ) }
                        ></el-input>
                    </el-form-item>
                    <el-form-item class='el-form-item__code' prop='authCode'>
                        <el-input
                            onInput={this.handleInput}
                            v-model={this.model.authCode}
                            placeholder={ this.t( INPUT_AUTH_CODE ) } 
                            class='register-item__input'
                        ></el-input>
                        <el-button 
                            type='primary' 
                            class='register-item__send-code'
                            onclick={this.sendAuthCode}
                            disabled={this.isSendCode}
                        >
                            { this.t( SEND_AUTH_CODE ) }
                        </el-button>
                    </el-form-item>
                    <el-form-item class='el-form-item__button'>
                        <el-button 
                            type='primary'
                            onclick={ () => { this.handleRegister(refName) }}
                        >{ this.t( REGISTER_NOW ) }</el-button>
                    </el-form-item>
                    <div class='back-login' onclick={ this.backToLogin }>
                        <i class='iconfont icon-fenxiang'></i>
                        <span class='back-login__content'>{ this.t(BACK_TO_LOGIN) }</span>
                    </div>
                </el-form>
            </div>
        )
    }
}