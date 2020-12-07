import { Component, Prop, Emit } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import { 
    INPUT_EMPLOYEE_ID,
    INPUT_PASSWPRD,
    REMEMBER_PASSWORD,
    MAX_PASSWORD_LENGTH,
    MIN_PASSWORD_LENGTH,
    MAX_EMPLOYEE_ID_LENGTH
 } from '@/common/constants';
 import { SigninRules } from '@/components/signin/rules';
import { ITeacherInfo } from '@/interfaces';

@Component
export default class TeacherInput extends mixins(Lang) {

    @Prop({ default: () => ( {
        employeeId: '',
        tPassword: ''
    } )})
    teacherInfo!: ITeacherInfo;

    @Emit('switchRememberPass')
    switchRememberPass(){}

    @Emit('input')
    handleInput(newModel: ITeacherInfo){
    }

    public get model() {
        return { ...this.teacherInfo }
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
                        onInput={ () => { this.handleInput(this.model) } }
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
                        onInput={ () => { this.handleInput(this.model) } }
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