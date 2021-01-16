import { CreateElement } from 'vue'
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import BaseEditor from './basicEditor';
import KnowledgeEditor from './knowledgeEditor';
import CapacityEditor from './capacityEditor';
import QuestionEditor from './questionEditor';
import EditorSwitch from './editorSwitch';
import {
    EditorIndexMap,
    EditorNameMap
} from '@/interfaces/compose-viewer';

import './style.scss'
import { editorSteps } from './mock/editor-steps';
import {
    NEXT_STEP,
    FINISH_EDIT
} from '@/common/constants/lang';

@Component({
    components: {
        BaseEditor,
        KnowledgeEditor,
        CapacityEditor,
        QuestionEditor,
        EditorSwitch
    }
})
export default class ComposeEditor extends mixins(Lang) {

    public activeStep: number = 1;

    public readonly stepLength: number = 4;

    public get rightButtonText() {
        return this.activeStep === this.stepLength - 1 ? FINISH_EDIT : NEXT_STEP
    }

    public renderStepComponents(h: CreateElement) {
        const componentName: keyof typeof EditorIndexMap = (EditorIndexMap[this.activeStep] as keyof typeof EditorIndexMap);
        console.log(EditorNameMap[componentName]);
        return h(this.$options.components![componentName], {
            props: {
                title: EditorNameMap[componentName]
            },
            on: {

            }
        })
    }

    public handleNextStep() {
        this.activeStep++;
    }

    public handleLastStep() {
        this.activeStep--;
    }

    public handleFinishEdit() {
        console.log('完成编辑');
        this.activeStep = this.stepLength;
    }

    public renderEditorSwitchComponent(h: CreateElement) {
        return h(this.$options.components!['EditorSwitch'], {
            props: {
                activeIndex: this.activeStep,
                stepLength: this.stepLength,
                rightButtonText: this.rightButtonText
            },
            on: {
                handleNextStep: this.handleNextStep,
                handleFinishEdit: this.handleFinishEdit,
                handleLastStep: this.handleLastStep
            }
        })
    }

    public renderEditResult() {
        console.log('renderEditResult');
    }

    render(h: CreateElement) {
        return (
            <div class='compose-editor'>
                <div class='compose-editor__container'>
                    <div class='editor-steps'>
                        <div class='el-step__height-container'>
                            <el-steps 
                                direction="vertical" 
                                active={this.activeStep}
                                finish-status="success"
                            >
                                {
                                    editorSteps.map(step => {
                                        return (
                                            <el-step></el-step>
                                        )
                                    })
                                }
                            </el-steps>
                        </div>
                    </div>
                    <div class='editor-content'>
                        { this.renderStepComponents(h) }
                        {
                            this.activeStep !== this.stepLength
                            ? this.renderEditorSwitchComponent(h)
                            : this.renderEditResult()
                        }
                    </div>
                </div>
            </div>
        )
    }
}