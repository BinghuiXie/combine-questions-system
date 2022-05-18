import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import CheckTable from '@/components/common/checkTable';
import Lang from '@/lang/lang';
import { ColumnTemType, ITableConfig, ISelectItem } from '@/interfaces/common';
import { INPUT_MODULE, ABILITY_INPUT, ABILITY_CHECK } from '@/common/constants';
import { AbilityTableCheck, AbilityTableConfig, AbilityType } from '@/interfaces/compose-viewer/ability.interface';
import { AbilityRules } from '@/common/rules/compose-viewer/ability-manage';

const {
    INPUT_CONETNT,
    SELECT_ABILITY_TYPE,
    SELECT_ABILITY_COURSE
} = INPUT_MODULE;

@Component({
    components: {
        CheckTable
    }
})
export default class AbilityCheck extends mixins(Lang) {

    public abilityTypeSelectList: ISelectItem[] = [];

    public courseId: number = 0;

    
    public tableConfig1: AbilityTableCheck = [
        {
            type: ColumnTemType.CHECKBOX,
            prop: 'isCheck',
            propInit: false,
            name: ''
        },
        // {
        //     type: ColumnTemType.TEXT,
        //     prop: 'id',
        //     propInit: 0,
        //     name: '序号'
        // },
        {
            type: ColumnTemType.INPUT,
            prop: 'content',
            propInit: '',
            name: '能力点内容',
           
        },
        {
            type: ColumnTemType.INPUT,
            prop: 'text',
            propInit: 'hhh',
            name: '能力点重要程度',
           
        }
       
    ]

    // public tableConfig: AbilityTableConfig = [
    //     {
    //         type: ColumnTemType.CHECKBOX,
    //         prop: 'isCheck',
    //         propInit: false,
    //         name: ''
    //     },
    //     {
    //         type: ColumnTemType.TEXT,
    //         prop: 'id',
    //         propInit: '',
    //         name: '序号'
    //     },
    //     {
    //         type: ColumnTemType.INPUT,
    //         prop: 'content',
    //         propInit: '',
    //         name: '能力点内容    ',
    //         placeholder: INPUT_CONETNT,
    //     },
    //     {
    //         type: ColumnTemType.SELECT,
    //         prop: 'abilityType',
    //         propInit: '',
    //         name: '能力点类型     ',
    //         placeholder: SELECT_ABILITY_TYPE,
    //         selectOptions: {
    //             multiple: false
    //         },
    //         selectData: this.abilityTypeSelectList
    //     }
    // ]
   

//能力点类型
    public mounted() {
      
        
        // for(let item in AbilityType) {
        //     const isValue = parseInt(item, 10) >= 0;
        //     if(isValue) {
        //         this.abilityTypeSelectList.push({
        //             id: parseInt(item),
        //             label: AbilityType[item],
        //             value: parseInt(item)
        //         })
        //     }
        // }
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
                            <el-option label='计算机通信' value={1}></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                {/* <input-table
                    rules={AbilityRules}
                    tableConfig={this.tableConfig1}
                    tableTitle={ABILITY_INPUT}
                /> */}
            {/* <el-table data>
                <el-table-column
                    
                    label="能力点内容"
                    width="500">
                </el-table-column>
                <el-table-column
                    
                    label="能力点类型"
                    width="180">
                </el-table-column>  
                
            </el-table> */}
{/*          
            {this.tableData.map(item => {
					//console.log(item);
					
  					return (
                        <el-table data>
                        <el-table-column
                          
                            label={item.text}
                            width="500">
                        </el-table-column>
                        <el-table-column
                           
                            label={item.type}
                            width="180">
                        </el-table-column>  
                    </el-table>
  );
})} */}
    <check-table
                    rules={AbilityRules}
                    tableConfig={this.tableConfig1}
                    tableTitle={ABILITY_CHECK}
                />
           
            </div>

        )
    }
}
