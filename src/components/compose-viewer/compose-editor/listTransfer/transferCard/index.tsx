import { Component, Prop, Emit } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import './style.scss';
import { ITransferDataItem } from '@/interfaces/compose-viewer';
import { EMPTY_DATA, ButtonSize, ButtonType } from '@/common/constants';
import { valueof } from '@/utlis/type';

enum TransferType {
    SOURCE = 'source',
    TARGET = 'target'
}

enum TransferOperation {
    ADD = '添加',
    EDIT = '编辑',
    DELETE = '删除'
}

@Component({})
export default class TransferCard extends mixins(Lang) {

    @Prop({ default: 'source' })
    public transferType!: 'source' | 'target';

    @Prop({ default: 'Title' })
    public title!: string;

    @Prop({ default: [] })
    public dataSource!: ITransferDataItem[];

    @Emit('transferItemDelete')
    public handleTransferItemDelete(index: number) {}

    @Emit('transferItemEdit')
    public handleTransferItemEdit(index: number) {}

    @Emit('transferItemAdd')
    public handleTransferItemAdd(index: number) {}

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

    public checkedTransferItems: ITransferDataItem[] = [];

    /**
     * 处理穿梭框内每一项右侧 button 点击的操作
     */
    public handleTransferItemOperation(type: valueof<typeof TransferOperation>, index: number) {
        switch (type) {
            case TransferOperation.ADD:
                console.log('add');
                this.handleTransferItemAdd(index);
                break;
            case TransferOperation.EDIT:
                this.handleTransferItemEdit(index);
                break;
            case TransferOperation.DELETE:
                this.handleTransferItemDelete(index);
                break;
        }
    }

    /**
     * 处理全选
     */
    public handleCheckAll() {

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
                            type='danger'
                            size={ ButtonSize.MINI }
                        >
                            批量删除
                        </el-button>
                        : null
                    }
                </div>
                <div class='transfer-card__content'>
                    <div class='transfer-card__content-form'>
                        <el-input 
                            size='small' 
                            placeholder='请输入搜索内容'
                            v-model={ this.keyword }
                        ></el-input>
                    </div>
                    <div 
                        class='transfer-card__content-data'
                        style={{
                            height: this.transferType === TransferType.SOURCE ? '298px' : '258px'
                        }}
                    >
                        <el-checkbox-group
                            v-model={ this.checkedTransferItems }
                        >
                            { this.renderDataList() }
                        </el-checkbox-group>
                    </div>
                </div>
                <div class='transfer-card__operation'>
                    <el-button type={ ButtonType.PRIMARY } size={ ButtonSize.MINI }>
                        { this.transferType === TransferType.SOURCE ? '批量添加' : '保存' }
                    </el-button>
                </div>
            </div>
        )
    }
}
