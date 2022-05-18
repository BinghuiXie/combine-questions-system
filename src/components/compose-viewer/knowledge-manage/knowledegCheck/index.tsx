import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import CheckTable from '@/components/common/checkTable';
import Lang from '@/lang/lang';
import { ColumnTemType, ITableConfig, ISelectItem } from '@/interfaces/common';
import { INPUT_MODULE, ABILITY_INPUT, ABILITY_CHECK } from '@/common/constants';
import { KnowledegTableCheck,KnowledgeTableConfig} from '@/interfaces/compose-viewer/knowledge.interface';
import { AbilityRules } from '@/common/rules/compose-viewer/ability-manage';
import { KnowledgeRules } from '@/common/rules/compose-viewer/knowledge-manage';

const {
   
    SELECT_KNOWLEDGE_COURSE
} = INPUT_MODULE;

@Component({
    components: {
        CheckTable
    }
})
export default class KnowledgeCheck extends mixins(Lang) {

    public KnowledgeTypeSelectList: ISelectItem[] = [];

    public courseId: number = 0;

    
    public tableConfig1: KnowledegTableCheck = [
        {
            type: ColumnTemType.CHECKBOX,
            prop: 'isCheck',
            propInit: false,
            name: ''
        },
    
        {
            type: ColumnTemType.INPUT,
            prop: 'content',
            propInit: '',
            name: '能力点内容',
            
        },
        {
            type: ColumnTemType.INPUT,
            prop: 'text',
            propInit: '1',
            name: '能力点重要程度',
         
        },
        {
            type: ColumnTemType.INPUT,
            prop: 'text',
            propInit: 'hhh',
            name: '能力点重要程度',
      
        
        }
       
    ]

    
   

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
            
            <div class='knowledge-input'>
                <el-form
                    label-width='120px'
                    label-position='right'
                >
                    <el-form-item label={this.t(SELECT_KNOWLEDGE_COURSE)}>
                        <el-select 
                            v-model={this.courseId}
                            placeholder={this.t(SELECT_KNOWLEDGE_COURSE)}
                        >
                            <el-option label='计算机通信与网络' value={0}></el-option>
                            <el-option label='计算机通信' value={1}></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>


    <check-table
                    rules={KnowledgeRules}
                    tableConfig={this.tableConfig1}
                    tableTitle={KnowledgeCheck}
                />
           
            </div>

        )
    }
}
