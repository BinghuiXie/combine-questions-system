import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import InputTable from '@/components/common/inputTable';
import Lang from '@/lang/lang';
import { ColumnTemType, ITableConfig, ISelectItem } from '@/interfaces/common';
import { INPUT_MODULE, ABILITY_INPUT } from '@/common/constants';
import { AbilityTableConfig, AbilityType } from '@/interfaces/compose-viewer/ability.interface';
import './style.scss';

const {
    INPUT_CONETNT,
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

    public tableConfig: AbilityTableConfig = [
        {
            type: ColumnTemType.CHECKBOX,
            prop: 'isCheck',
            propInit: false,
            name: ''
        },
        {
            type: ColumnTemType.TEXT,
            prop: 'id',
            propInit: 0,
            name: '序号'
        },
        {
            type: ColumnTemType.INPUT,
            prop: 'content',
            propInit: '',
            name: '能力点内容',
            placeholder: INPUT_CONETNT,
        },
        {
            type: ColumnTemType.SELECT,
            prop: 'abilityType',
            propInit: [],
            name: '能力点类型',
            placeholder: SELECT_ABILITY_TYPE,
            selectOptions: {
                multiple: true
            },
            selectData: this.abilityTypeSelectList
        }
    ]

    public mounted() {
        for(let item in AbilityType) {
            const isValue = parseInt(item, 10) >= 0;
            if(isValue) {
                this.abilityTypeSelectList.push({
                    id: parseInt(item),
                    label: AbilityType[item],
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
                    tableConfig={this.tableConfig}
                    tableTitle={ABILITY_INPUT}
                />
            </div>
        )
    }
}
