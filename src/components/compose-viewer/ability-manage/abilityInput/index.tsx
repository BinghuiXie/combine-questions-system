import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import InputTable from '@/components/common/inputTable';
import Lang from '@/lang/lang';
import { ColumnTemType, ITableConfig, ISelectItem } from '@/interfaces/common';
import { INPUT_MODULE, ABILITY_INPUT } from '@/common/constants';
import { AbilityTableConfig, AbilityType, KnowType } from '@/interfaces/compose-viewer/ability.interface';
import './style.scss';
import { AbilityRules } from '@/common/rules/compose-viewer/ability-manage';

const {
    INPUT_ABILITY,
    RELATED_KNOWLEDGE,
    SELECT_ABILITY_TYPE,
    SELECT_ABILITY_COURSE
} = INPUT_MODULE;

@Component({
    components: {
        InputTable
    }
})
export default class AbilityInput extends mixins(Lang) {

    public abilityTypeSelectList: ISelectItem[] = [];

    public courseId: number = 0;
    // public knowList:KnowType[]=[];///
    //知识点数组，应在mount函数中初始化
    public knowList:KnowType[]=[{
        KnowledgeId:1,
        content:'123',
    },{
        KnowledgeId:1,
        content:'123',
    }]

    public tableConfig: AbilityTableConfig = [
        {
            type: ColumnTemType.CHECKBOX,
            prop: 'isCheck',
            propInit: false,
            name: ''
        },
        // {
        //     type: ColumnTemType.TEXT,
        //     prop: 'id',
        //     propInit: 1,
        //     name: '序号'
        // },
        {
            type: ColumnTemType.INPUT,
            prop: 'content',
            propInit: '',
            name: '能力点内容',
            placeholder: INPUT_ABILITY,
        },
        {
            type: ColumnTemType.SELECT,
            prop: 'abilityType',
            propInit: [],//可多选
            name: '关联知识点',
            placeholder: RELATED_KNOWLEDGE,
            selectOptions: {
                multiple: false
            },
            selectData: this.abilityTypeSelectList
        },
        {
            type: ColumnTemType.INPUT,
            prop: 'importance',
            propInit: '',
            name: '能力点重要程度',
            placeholder: '',
        }
    ]

    public mounted() {
        for(let item in this.knowList) {
            const isValue = parseInt(item, 10) >= 0;
            if(isValue) {
                this.abilityTypeSelectList.push({
                    id: parseInt(item),
                    label: this.knowList[item].content,
                    value: parseInt(item)
                })
            }
        }
    }

    public render() {
        return (
            <div class='ability-input'>
                <el-form
                    label-width='120px'
                    label-position='right'
                >
                    <el-form-item label={this.t(SELECT_ABILITY_COURSE)}>
                        <el-select 
                            v-model={this.courseId}
                            placeholder={this.t(SELECT_ABILITY_COURSE)}
                        >
                            <el-option label='计算机通信与网络' value={0}></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <input-table
                    rules={AbilityRules}
                    tableConfig={this.tableConfig}
                    tableTitle={ABILITY_INPUT}
                />
            </div>
        )
    }
}
