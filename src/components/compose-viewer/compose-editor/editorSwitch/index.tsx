import { Component, Emit, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import {
     NEXT_STEP,
     LAST_STEP
} from '@/common/constants/lang';

import './style.scss';

@Component({})
export default class EditorSwitch extends mixins(Lang) {

    @Prop()
    public activeIndex!: number;

    @Prop()
    public stepLength!: number;

    @Prop()
    public rightButtonText!: string;

    /**
     * 下一步
     */
    @Emit('handleNextStep')
    public handleNextStep() {}

    /** 
     * 完成编辑
    */
    @Emit('handleFinishEdit')
    public handleFinishEdit() {}

    /**
     * 上一步
     */
    @Emit('handleLastStep')
    public handleLastStep() {}

    public get stepLengthCopy() {
        return this.stepLength;
    }

    public handeRightButtonClick() {
        if(this.activeIndex < this.stepLengthCopy - 1) {
            this.handleNextStep();
        } else {
            this.handleFinishEdit();
        }
    }

    render() {
        return (
            <div class='editor__bottom-button'>
                <el-button
                    style={{
                        display: this.activeIndex === 0 ? 'none' : 'inline-block'
                    }}
                    type='primary' 
                    class='left'
                    onclick={ this.handleLastStep }
                >{ this.t(LAST_STEP) }</el-button>
                <el-button 
                    type='primary' 
                    class='right'
                    onclick={ this.handeRightButtonClick }
                >{ this.t(this.rightButtonText) }</el-button>
            </div>
        )
    }
}