import { Component, Prop, Emit } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import { 
    INPUT_PASSWPRD,
    REMEMBER_PASSWORD,
    INPUT_STUDENT_ID,
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH,
    MAX_STUDENT_ID_LENGTH
 } from '@/common/constants';
 import { SigninRules } from '@/components/signin/rules';
import { IStudentInfo } from '@/interfaces';

@Component
export default class StudentInput extends mixins(Lang) {


    @Prop()
    studentInfo!: IStudentInfo;

    @Emit('switchRememberPass')
    switchRememberPass(){}

    @Emit('input')
    handleInput(newModel: IStudentInfo){}

    public get model() {
        return { ...this.studentInfo }
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
                        onInput={  () => { this.handleInput(this.model) }  }
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
                        onInput={  () => { this.handleInput(this.model) }  }
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