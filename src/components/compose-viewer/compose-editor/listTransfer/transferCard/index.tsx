import { Component, Prop, Emit } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import './style.scss';
import { 
    ITransferDataItem,
    ITransferCardConfig,
    TransferType,
    TransferOperation,
    TransferBatchOperation,
    QuestionTypeMap
} from '@/interfaces/compose-viewer';
import { 
    SAVE,
    EMPTY_DATA,
    BATCH_ADD,
    BATCH_DELETE,
    BATCH_EDIT,
    INPUT_SEARCH_KEYWORD,
    ButtonSize, 
    ButtonType, 
    InputSize
} from '@/common/constants';
import { valueof } from '@/utlis/type';

@Component({})
export default class TransferCard extends mixins(Lang) {

    @Prop({ default: 'source' })
    public transferType!: 'source' | 'target';

    @Prop({ default: 'Title' })
    public title!: string;

    @Prop({ default: [] })
    public dataSource!: ITransferDataItem[];

    @Prop({ default: { title: '', type: 0 } })
    public config!: ITransferCardConfig;

    @Emit('transferItemDelete')
    public handleTransferItemDelete(item: number | ITransferDataItem[]) {}

    @Emit('transferItemEdit')
    public handleTransferItemEdit(index: number) {}

    @Emit('transferItemAdd')
    public handleTransferItemAdd(item: number | ITransferDataItem[]) {}

    public get dataSourceModel() {
        return [ ...this.dataSource ]
    }

    public get searchResult() {
        return this.dataSourceModel.filter(item => {
            return item.name.match(this.keyword)
        })
    }

    public keyword: string = '';

    public isCheckAll: boolean = false;

    public checkedTransferLabels: string[] = [];

    /**
     * 处理穿梭框内每一项右侧 button 点击的操作
     */
    public handleTransferItemOperation(type: valueof<typeof TransferOperation>, index: number = 0) {
        switch (type) {
            case TransferOperation.ADD:
                this.handleTransferItemAdd(index);
                break;
            case TransferOperation.EDIT:
                this.handleTransferItemEdit(index);
                break;
            case TransferOperation.DELETE:
                this.handleTransferItemDelete(index);
                break;
            case TransferOperation.SAVE:
                this.handleTargetTransferSave()
        }
    }

    public handleTargetTransferSave() {

    }

    /**
     * 处理 批量操作
     */
    public handleTransferBatchOperation(type: valueof<typeof TransferBatchOperation>) {
        const checkedTransferItems: ITransferDataItem[] = this.checkedTransferLabels.map((label: string) => {
            return {
                name: label,
                id: QuestionTypeMap[label as keyof typeof QuestionTypeMap]
            }
        })
        switch (type) {
            case TransferBatchOperation.BATCH_ADD:
                this.handleTransferItemAdd(checkedTransferItems)
                break;
            case TransferBatchOperation.BATCH_DELETE:
                this.handleTransferItemDelete(checkedTransferItems);
                break;
            case TransferBatchOperation.BATCH_EDIT:
                break;
        }
    }

    /**
     * 处理全选
     */
    public handleCheckAll(val: boolean) {
        this.checkedTransferLabels = this.dataSource.map(item => item.name);
    }

    public renderDataList() {
        const data = this.keyword ? this.searchResult : this.dataSourceModel
        if(!data.length) {
            return <div class='data-empty'>{ this.t(EMPTY_DATA) }</div>
        }
        return data.map((item, index) => {
            return (
                <div class='data-source__item'>
                    <el-checkbox 
                        class='data-source__item-name'
                        label={ item.name }
                    />
                    <div class='data-source__item-button'>
                        {
                            this.transferType === TransferType.TARGET ? 
                            <el-button 
                                type={ ButtonType.DANGER } 
                                size={ ButtonSize.MINI }
                                onclick={ () => { this.handleTransferItemOperation(TransferOperation.DELETE, index) } }
                            >
                                { TransferOperation.DELETE }
                            </el-button>
                            : null
                        }
                        <el-button 
                            type={ ButtonType.PRIMARY }
                            size={ ButtonSize.MINI }
                            onclick={ () => {this.handleTransferItemOperation(
                                this.transferType === TransferType.SOURCE
                                ? TransferOperation.ADD
                                : TransferOperation.EDIT,
                                index
                            )}}
                        >
                            {
                                this.transferType === TransferType.SOURCE
                                ? TransferOperation.ADD
                                : TransferOperation.EDIT
                            }
                        </el-button>
                    </div>
                </div>
            )
        })
    }

    render() {
        return (
            <div class='transfer-card'>
                <div class='transfer-card__header'>
                    <el-checkbox
                        v-model={ this.isCheckAll }
                        onchange={ this.handleCheckAll }
                    >{ this.title }</el-checkbox>
                    {
                        this.transferType === TransferType.TARGET ?
                        <el-button 
                            type={ ButtonType.DANGER }
                            size={ ButtonSize.MINI }
                            onclick={ () => { this.handleTransferBatchOperation(TransferBatchOperation.BATCH_DELETE) } }
                        >
                            { TransferBatchOperation.BATCH_DELETE }
                        </el-button>
                        : null
                    }
                </div>
                <div class='transfer-card__content'>
                    <div class='transfer-card__content-form'>
                        <el-input 
                            size={ InputSize.SAMLL } 
                            placeholder={ this.t( INPUT_SEARCH_KEYWORD ) }
                            v-model={ this.keyword }
                        ></el-input>
                    </div>
                    <div 
                        class='transfer-card__content-data'
                    >
                        <el-checkbox-group
                            v-model={ this.checkedTransferLabels }
                        >
                            { this.renderDataList() }
                        </el-checkbox-group>
                    </div>
                </div>
                <div class='transfer-card__operation'>
                    {
                        this.config.batchEdit ? 
                        <el-button 
                            type={ ButtonType.PRIMARY } 
                            size={ ButtonSize.MINI }
                            onclick={ () => { this.handleTransferBatchOperation } }
                        >{ TransferBatchOperation.BATCH_EDIT }</el-button>
                        : null
                    }
                    <el-button 
                        type={ ButtonType.PRIMARY } 
                        size={ ButtonSize.MINI }
                        onclick={
                            this.transferType === TransferType.SOURCE
                            ? () => { this.handleTransferBatchOperation(TransferBatchOperation.BATCH_ADD) }
                            : () => { this.handleTransferItemOperation(TransferOperation.SAVE) }
                        }
                    >
                        {
                            this.transferType === TransferType.SOURCE 
                            ? TransferBatchOperation.BATCH_ADD 
                            : TransferOperation.SAVE 
                        }
                    </el-button>
                </div>
            </div>
        )
    }
}
