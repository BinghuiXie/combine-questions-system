/**
 * @description: 可修改的表格（添加数据使用）
 */
import { Component, Prop, Emit } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { Action } from 'vuex-class';
import Lang from '@/lang/lang';
import {
    ButtonSize,
    ButtonType,
    InputSize,
    KeyCodeMap,
    SUBMIT
} from '@/common/constants';
import { ITableConfig, ColumnTemType, ISelectItem } from '@/interfaces/common';
import './style.scss';
import { IKnowledgeItem } from '@/interfaces/compose-viewer';
import { IAbilityItem } from '@/interfaces/compose-viewer/ability.interface';
import { IRefValidate } from '@/interfaces/common'
import { validateInput } from '@/utlis';

@Component({})
export default class InputTable extends mixins(Lang) {
    @Prop()
    public courseId!: number;

    @Prop()
    public tableConfig!: ITableConfig[];

    @Prop()
    public rules!: any;

    @Prop()
    public data!: Object;

    @Prop()
    public cascaderOptions!: any[];

    @Prop({
        default: '添加数据'
    })
    public tableTitle!: string;

    @Prop({ default: false })
    public showOperation!: boolean;

    @Emit('getCascaderData')
    public getCascaderData(config: ITableConfig, rowData: any, index: number) {
        // cascader focus 的时候获取相关数据
    }

    @Action('submitKnowledgeData')
    public submitBatchKnowledgeData!: (payload: { courseId: number, knowledgeList: Array<IKnowledgeItem> }) => Promise<boolean>

    @Action('submitAbilityData')
    public submitBathcAbilityData!: (payload: { courseId: number, abilityList: Array<IAbilityItem> }) => Promise<boolean>

    public $refs!: {
        [key: string]: any;
        addIcon: HTMLElement,
        batchRuleForm: IRefValidate
    }

    public get templateData() {
        let obj: {[key: string]: any} = {};
        this.tableConfig.forEach(config => {
            obj[config.prop] = config.propInit;
        });
        return obj;
    }

    public isAddButtonActive: boolean = false;

    public rowDataList: any[] = new Array({...this.templateData});

    public handleAddIconClick() {
        // 推入一个深拷贝，否则会修改一个导致所有的都发生变化
        this.rowDataList.push({
            ...this.templateData,
            id: ++this.templateData.id
        });
    }

    public deleteLastLine() {
        this.rowDataList.pop();
    }

    public deleteSelectedRows() {
        this.rowDataList = this.rowDataList.filter(rowData => {
            return rowData.isCheck === false;
        })
    }

    public handleSelectAll() {
        this.rowDataList.forEach(rowData => {
            rowData.isCheck = !rowData.isCheck;
        })
    }

    /**
     * inputTable 提交数据
     */
    public async handleSubmitBatch() {
        const cascaderProp = this.tableConfig.find(config => config.type === ColumnTemType.CASCADER);
        const validateRes = await validateInput(this.rowDataList, this.rules, 0);
        if(typeof validateRes === 'object') {
            // 验证不通过返回一个对象
            this.$message.error(validateRes.message);
        } else {
            // 验证通过
            if(cascaderProp) {
                // 知识点
                // 对于极联选择器，只需要保留最终选择出来 array 的下标为 1 的数
                // 例如：[[0, 3], [1, 9]] => [3, 9] 
                const { prop } = cascaderProp;
                this.rowDataList.forEach(rowData => {
                    rowData[prop].forEach((item: number[], index: number) => {
                        rowData[prop][index] = item[1];
                    })
                });
                this.submitBatchKnowledgeData({
                    courseId: this.courseId,
                    knowledgeList: this.rowDataList
                })
            } else {
                // 能力点
                this.submitBathcAbilityData({
                    courseId: this.courseId,
                    abilityList: this.rowDataList
                })
            }
        }
    }

    public addNewLine() {
       this.handleAddIconClick();
    }

    public listenEnterKeyDown() {
        window.addEventListener('keydown', (e: any) => {
            const el = e || window.event;
            switch(el.keyCode) {
                case KeyCodeMap.ENTER:
                    this.isAddButtonActive = true;
                    this.handleAddIconClick();
                    break;
                case KeyCodeMap.DELETE:
                    this.deleteLastLine();
                    break;
            }
        });
        window.addEventListener('keyup', (e: any) => {
            const el = e || window.event;
            switch(el.keyCode) {
                case KeyCodeMap.ENTER:
                    this.isAddButtonActive = false;
                    break;
            }
        });
        const { addIcon } = this.$refs;
        addIcon.addEventListener('mousedown', () => {
            this.isAddButtonActive = true;
        });
        addIcon.addEventListener('mouseup', () => {
            this.isAddButtonActive = false;
        });
    }

    public renderTableHeader() {
        return (
            <div class='table-row__header'>
                {
                    this.tableConfig.map(propConfig => (
                        propConfig.type === ColumnTemType.CHECKBOX
                        ? <el-checkbox onChange={this.handleSelectAll}/>
                        : <span class={propConfig.prop === 'id' ? 'row-id': null}>{ propConfig.name }</span>
                    ))
                }
            </div>
        )
    }

    /**
     * 获取当前列的模板
     */
    public getColumnTemplate(config: ITableConfig, data: any, index: number) {
        const { type, placeholder: hint, prop } = config;
        const placeholder = hint || '';
        switch (type) {
            case ColumnTemType.TEXT:
                return <el-form-item prop={prop} class='row-item row-item__text'>{data[prop]}</el-form-item>;
            case ColumnTemType.CHECKBOX:
                return (
                    <el-form-item prop={prop}>
                        <el-checkbox  v-model={data[prop]}/>
                    </el-form-item>
                )
            case ColumnTemType.INPUT:
                return (
                    <el-form-item prop={prop} class='row-item row-item__input'>
                        <el-input
                            placeholder={this.t(placeholder)}
                            size={InputSize.MINI}
                            v-model={data[prop]}
                        />
                    </el-form-item>
                )
            case ColumnTemType.SELECT:
                const options = config.selectOptions || {};
                return (
                    <el-form-item prop={prop} class='row-item row-item__select'>
                        <el-select
                            placeholder={this.t(placeholder)}
                            size={InputSize.MINI}
                            v-model={data[prop]}
                            multiple={ options.multiple }
                            collapse-tags
                        >
                            {
                                config.selectData && config.selectData.map((selectItem: ISelectItem) => (
                                    <el-option
                                        label={selectItem.label}
                                        value={selectItem.value}
                                        key={selectItem.value}
                                    />
                                ))
                            }
                        </el-select>
                    </el-form-item>
                )
            case ColumnTemType.CASCADER:
                return(
                    <el-form-item prop={prop} class='row-item row-item__cascader'>
                        <el-cascader
                            placeholder={this.t(placeholder)}
                            size={InputSize.MINI}
                            onFocus={() => { this.getCascaderData(config, data, index) }}
                            options={this.cascaderOptions[index]}
                            collapse-tags
                            v-model={data[prop]}
                            {...{
                                props: {
                                    props: {...config.cascaderProps}
                                }
                            }}
                        />
                    </el-form-item>
                )
        }
    }

    public renderTableRow() {
        return this.rowDataList.map((rowData, index) => {
            return (
                <el-form
                    class='table-row__item'
                    key={index}
                    ref='batchRuleForm'
                    rules={this.rules}
                    {...{ props: { model: rowData } }}
                >
                    {
                        this.tableConfig.map(columnConfig => {
                            return this.getColumnTemplate(columnConfig, rowData, index)
                        })
                    }
                </el-form>
            )
        })
    }

    public mounted() {
        this.listenEnterKeyDown();
    }

    public render() {
        return (
            <div class='self-table__container'>
                <div class='table-info'>
                    <label class='table-title'>
                        {this.t(this.tableTitle)}
                    </label>
                    <div class='table-row__number'>
                        { '( 0 / ' + this.rowDataList.length + ' )' }
                    </div>
                    <div class='table-operation'>
                        <el-button 
                            size={ButtonSize.MINI}
                            type={ButtonType.PRIMARY}
                            onclick={this.addNewLine}
                        >新增一行</el-button>
                        <el-button 
                            size={ButtonSize.MINI} 
                            type={ButtonType.DANGER}
                            onclick={this.deleteLastLine}
                        >删除最后一行</el-button>
                        <el-button
                            size={ButtonSize.MINI}
                            type={ButtonType.DANGER}
                            onclick={this.deleteSelectedRows}
                        >删除所选</el-button>
                    </div>
                </div>
                <div class='table-body'>
                    { this.renderTableHeader() }
                    <div class='table-row_list'>
                        { this.renderTableRow() }
                    </div>
                </div>
                <div class='table-row__add'>
                    <i
                        ref='addIcon'
                        class={['iconfont', 'icon-tixing', this.isAddButtonActive ? 'active' : null]} 
                        onclick={this.handleAddIconClick}
                    />
                    <i class={['iconfont', 'icon-add', this.isAddButtonActive ? 'active' : null]} />
                </div>
                <div class='table-sbumit'>
                    <el-button
                        type={ButtonType.PRIMARY}
                        onclick={ () => { this.handleSubmitBatch() }}
                        size={ButtonSize.MEDIUM}
                    >{this.t(SUBMIT)}</el-button>
                </div>
            </div>
        )
    }
}