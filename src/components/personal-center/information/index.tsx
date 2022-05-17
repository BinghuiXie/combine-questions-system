import { USERINFO } from "@/common/constants";
import { ButtonType } from "@/common/constants/button";
import { 
    IInformation,
    ICourseData,
    ICourseInfo
 } from "@/interfaces";
import Lang from "@/lang/lang";
import { mixins } from "vue-class-component";
import { Component } from "vue-property-decorator";
import { Action, State } from "vuex-class";
import "./style.scss";

@Component({})
export default class information extends mixins(Lang) {
    //标签对齐位置
    private labelPosition = "right";

    @State((state) => state.personalCenter.userInfo)
    userInfo!: IInformation;

    private CourseInfo: (ICourseData)[] = [
        
    ];
 
    @Action("getUserInfo")
    private getUserInfo!: () => void;

    @Action("changeUserInfo")
    private changeUserInfo!: (userInfo: IInformation) => string;

    @Action('getCourseInfo')
    private getCourseInfo!: () => any;

    async created() {
        this.getUserInfo();
        await this.getCourseInfo().then((res: any) => {
            const data:(ICourseData)[] = Array.from(res.data)
        // this.CourseInfo.CourseInfo = res
            this.CourseInfo.push(...data)
            console.log(this.CourseInfo);
        })
        
        console.log("created");
    }
    private changeInfo() {
        const res = this.changeUserInfo(this.userInfo);
        // this.$message({
        //     type: 'success',
        //     message: '保存成功',
        //     offset: 300
        // })
    }

    renderCourse() {
        return (
            <el-form-item label={this.t(USERINFO.COURSE_NAME)}>
                            <el-select v-model={this.userInfo.courseName} filterable>
                                 {this.CourseInfo.map(item => {
                                    return (
                                        <el-option
                                        key={item.courseId}
                                        label={item.courseName}
                                        value={item.courseName}
                                        />
                                    )
                                })} 
                            </el-select>
                        </el-form-item>
        )
    }

    render() {
        return (
            <div class="information">
                {console.log('render')}       
                <div class="information_container">
                    <el-form
                        label-position={this.labelPosition}
                        label-width="80px"
                    >
                        <el-form-item label={this.t(USERINFO.USERNAME)}>
                            <el-input
                                v-model={this.userInfo.userName}
                            ></el-input>
                        </el-form-item>
                        <el-form-item label={this.t(USERINFO.IDENTIFY_ID)}>
                            <el-input
                                v-model={this.userInfo.identityId}
                                disabled
                            ></el-input>
                        </el-form-item>
                        {this.renderCourse()}
                        <el-form-item label={this.t(USERINFO.PHONE)}>
                            <el-input v-model={this.userInfo.phone}></el-input>
                        </el-form-item>  
                        <el-form-item label="">
                            <el-button
                                type={ButtonType.PRIMARY}
                                style="width:100px"
                                onclick={this.changeInfo}
                            >
                                保存
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div> 
                
            </div>
        );
    }
}
