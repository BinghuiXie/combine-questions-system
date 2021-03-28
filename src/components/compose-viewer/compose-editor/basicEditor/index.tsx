import { Component, Emit, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import {
    EditorIndexMap,
    BaseEditorOperations
} from '@/interfaces/compose-viewer';

import './style.scss';

@Component({
    
})
export default class BasicEditor extends mixins(Lang) {

    @Prop()
    public title!: keyof typeof EditorIndexMap;

    public baseEditInfo = {
        courseCode: '',
        courseName: '',
        paperScore: 100,
        paperDifficulty: null
    }

    render() {
        return (
            <div class='base-editor'>
                <div class='base-editor__title'>
                    { this.title }
                </div>
                <div class='base-editor__content'>
                    <el-form
                        label-position="right"
                        label-width='120px'
                        { ...{ props: { ...this.baseEditInfo } } }
                    >
                        <el-form-item label={this.t(BaseEditorOperations.COURSE_CODE_SELECT)}>
                            <el-select v-model={this.baseEditInfo.courseCode}></el-select>
                        </el-form-item>
                        <el-form-item label={this.t(BaseEditorOperations.COURSE_NAME_SELECT)}>
                            <el-select v-model={this.baseEditInfo.courseName}></el-select>
                        </el-form-item>
                        <el-form-item label={this.t(BaseEditorOperations.PAPER_SCORE_INPUT)}>
                            <el-input
                                placeholder='请输入试卷总分数'
                                v-model={this.baseEditInfo.paperScore}
                            ></el-input>
                        </el-form-item>
                        <el-form-item label={this.t(BaseEditorOperations.PAPER_DIFFICULTY_SELECT)}>
                            <el-rate v-model={this.baseEditInfo.paperDifficulty}></el-rate>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        )
    }
}