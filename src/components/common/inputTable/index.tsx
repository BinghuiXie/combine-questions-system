/**
 * @description: 可修改的表格（添加数据使用）
 */
import { Component, Prop, Emit } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import {
    ButtonSize,
    ButtonType,
    InputSize,
    KeyCodeMap,
    SUBMIT
} from '@/common/constants';
import { ITableConfig, ColumnTemType } from '@/interfaces/common';
import './style.scss';

@Component({})
export default class InputTable extends mixins(Lang) {
    @Prop()
    public tableConfig!: ITableConfig[];

    @Prop()
    public data!: Object;

    @Prop()
    public cascaderOptions!: any[];

    @Prop({
        default: '添加数据'
    })
    public tableTitle!: string;

    @Emit('getCascaderData')
    public getCascaderData(config: ITableConfig, rowData: any, index: number) {
        // cascader focus 的时候获取相关数据
    }

    public $refs!: {
        addIcon: HTMLElement
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

    public handleSubmitBatch() {
        console.log(this.rowDataList);
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

    // /**
    //  * 获取当前列的模板
    //  */
    public getColumnTemplate(config: ITableConfig, data: any, index: number) {
        const { type, placeholder: hint, prop } = config;
        const placeholder = hint || '';
        switch (type) {
            case ColumnTemType.TEXT:
                return <div class='row-item row-item__text'>{data[prop]}</div>;
            case ColumnTemType.CHECKBOX:
                return <el-checkbox v-model={data[prop]}/>;
            case ColumnTemType.INPUT:
                return (
                    <div class='row-item row-item__input'>
                        <el-input 
                            placeholder={this.t(placeholder)}
                            size={InputSize.MINI}
                            v-model={data[prop]}
                        />
                    </div>
                )
            case ColumnTemType.SELECT:
                return (
                    <div class='row-item row-item__select'>
                        <el-select 
                            placeholder={this.t(placeholder)}
                            size={InputSize.MINI}
                            v-model={data[prop]}
                            multiple
                            collapse-tags
                        >
                            {
                                config.selectData.map((chapter: any) => (
                                    <el-option
                                        label={chapter.content}
                                        value={chapter.chapterId}
                                        key={chapter.chapterId}
                                    />
                                ))
                            }
                        </el-select>
                    </div>
                )
            case ColumnTemType.CASCADER:
                return(
                    <div class='row-item row-item__cascader'>
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
                        ></el-cascader>
                    </div>
                )
        }
    }

    public renderTableRow() {
        return this.rowDataList.map((rowData, index) => {
            return (
                <li class='table-row__item' key={index}>
                    {
                        this.tableConfig.map(columnConfig => {
                            return this.getColumnTemplate(columnConfig, rowData, index)
                        })
                    }
                </li>
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
                        <el-button size={ButtonSize.MINI} type={ButtonType.PRIMARY}>新增一行</el-button>
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
                    <ul class='table-row_list'>
                        { this.renderTableRow() }
                    </ul>
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
                        onclick={this.handleSubmitBatch}
                        size={ButtonSize.MEDIUM}
                    >{this.t(SUBMIT)}</el-button>
                </div>
            </div>
        )
    }
}