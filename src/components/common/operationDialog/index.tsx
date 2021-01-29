import { Component, Prop, Emit } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import './style.scss';
import { 
    IDialogConfig,
    IDialogDataSourceItem
} from '@/interfaces/common';
import { 
    ButtonType,
    BUTTON_TEXT_CONFIRM,
    BUTTON_TEXT_CANCEL,
    ButtonSize
} from '@/common/constants';

@Component({})
export default class OperationDialog extends mixins(Lang) {

    @Prop({ default: [] })
    public dataSource!: IDialogDataSourceItem[];

    @Emit('closeDialog')
    public handleDialogClose() {}

    @Prop({ default: {} })
    public config!: IDialogConfig;

    public get model() {
        return [ ...this.dataSource ]
    }

    public cancelEdit() {
        this.handleDialogClose();
    }

    render() {
        return (
            <el-dialog 
                title={ this.config.title }
                visible={ this.config.visible }
                onclose={ this.handleDialogClose }
                width="30%"
            >
                <el-form
                    // { ...{ props: { model: this.model } } }
                >
                    {
                        this.model.map(item => {
                            return (
                                <el-form-item label={ item.label } label-width='102px'>
                                    <el-input 
                                        placeholder={ item.placeholder }
                                    ></el-input>
                                    { 
                                        item.hint ? 
                                        <el-tooltip effect="dark" content={ item.hint } placement="top-end">
                                            <i class='iconfont icon-tishi'></i>
                                        </el-tooltip>
                                        : null
                                    }
                                </el-form-item>
                            )
                        })
                    }
                </el-form>
                <div class='dialog-footer'>
                    <el-button 
                        size={ ButtonSize.SAMLL }
                        onclick={ this.cancelEdit }
                    >{ this.t(BUTTON_TEXT_CANCEL) }</el-button>
                    <el-button 
                        size={ ButtonSize.SAMLL } 
                        type={ ButtonType.PRIMARY }
                        // onclick={  }
                    >{ this.t(BUTTON_TEXT_CONFIRM) }</el-button>
                </div>
            </el-dialog>
        )
    }
}