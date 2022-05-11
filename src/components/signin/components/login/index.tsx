import Lang from "@/lang/lang";
import { CreateElement } from "vue";
import Component from "vue-class-component";
import { Emit, Mixins } from "vue-property-decorator";
import IdentityInput from "./identityInput";
import "./style.scss";
import {
    ADMINISTRATOR_LOGIN,
    TEACHER_LOGIN,
    // STUDENT_LOGIN,
    FORGOT_PASSWORD,
} from "@/common/constants";

@Component({
    components: {
        IdentityInput,
    },
})
export default class LoginWrapper extends Mixins(Lang) {
	private readonly translateDis: number = 18;

	private isTeacherLogin: boolean = true;

    private switchTime: number = 0;

	private startIndex: 0 | 1 | 2 = 1;

	public $refs!: {
        scrollBox: HTMLDivElement;
    };

	public isSelectProtocol: boolean = false;

	@Emit("handleForgotPwd")
    public handleForgotPwd() {}

    /** 切换登录角色
     */
    handleSwitchIdentity(e: any) {
        this.switchTime++;
        e.target.style.transform = `rotate(${this.switchTime * 180}deg)`;
        this.handleScrollBoxTranslate(this.startIndex, this.translateDis);
        if (this.startIndex === 2) {
            this.startIndex = 1;
            setTimeout(() => {
                this.$refs.scrollBox.style.transitionProperty = "none";
                this.$refs.scrollBox.style.transform = `translate(0, 0)`;
                this.handleScrollBoxTranslate(0, 0);
            }, 300);
        } else {
            this.startIndex++;
            this.$refs.scrollBox.style.transition = "all 300ms";
        }
        this.isTeacherLogin = !this.isTeacherLogin;
    }

	handleScrollBoxTranslate(index: number, distance: number) {
        this.$refs.scrollBox.style.transform = `translate(0, -${
            index * distance
        }px)`;
    }

	handleSelectProtocol(value: boolean) {
        this.isSelectProtocol = value;
    }

	renderChildComponent(h: CreateElement) {
        return h(this.$options.components!["IdentityInput"], {
            props: {
                isSelectProtocol: this.isSelectProtocol,
                identity: this.isTeacherLogin ? 0 : 1,
            },
        });
    }


    render(h: CreateElement) {
        return (
            <div class="login-wrapper">
                <div class="login-wrapper_switch-identity">
                    <div class="switch-identity-box">
                        <ul ref="scrollBox">
                            <li class="switch-identity-item">
                                {this.t(ADMINISTRATOR_LOGIN)}
                            </li>
                            <li class="switch-identity-item">
                                {this.t(TEACHER_LOGIN)}
                            </li>
                            <li class="switch-identity-item">
                                {this.t(ADMINISTRATOR_LOGIN)}
                            </li>
                        </ul>
                    </div>
                    <i
                        class="iconfont icon-switch"
                        onclick={(e: any) => {
                            this.handleSwitchIdentity(e);
                        }}
                    />
                </div>
                {this.renderChildComponent(h)}
                <div class='login__bottom-info'>
				<div class='register-forget'>
					<span onclick={ this.handleForgotPwd }>{ this.t( FORGOT_PASSWORD ) }</span>
				</div>
				<div class='login__bottom-line'/>
				<div class='disclaimer-text'>
					<el-checkbox onchange={this.handleSelectProtocol}>
						已阅读并同意<a href="">《用户隐私协议》</a>
					</el-checkbox>
				</div>
			</div>
            </div>
        );
    }
}
