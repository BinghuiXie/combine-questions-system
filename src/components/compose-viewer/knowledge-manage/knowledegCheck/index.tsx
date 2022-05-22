import { Component, Prop, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import CheckTable from '@/components/common/checkTable';
import Lang from '@/lang/lang';
import { ColumnTemType, ITableConfig, ISelectItem } from '@/interfaces/common';
import { INPUT_MODULE, ABILITY_INPUT, ABILITY_CHECK } from '@/common/constants';
import { IKnowledgeItem1, KnowledegTableCheck,KnowledgeTableConfig} from '@/interfaces/compose-viewer/knowledge.interface';
import { AbilityRules } from '@/common/rules/compose-viewer/ability-manage';
import { KnowledgeRules } from '@/common/rules/compose-viewer/knowledge-manage';
import { ICourseItem } from '@/interfaces/compose-viewer';
import { Action } from 'vuex-class';

const {
   
    SELECT_KNOWLEDGE_COURSE
} = INPUT_MODULE;

@Component({
    components: {
        CheckTable
    }
})
export default class KnowledgeCheck extends mixins(Lang) {

    @Prop()
    public courseId!: number;
    @Prop()
    public rowNum!: number;
    @Prop()
    public knowledgeList!:IKnowledgeItem1[];

    @Watch('courseId')
    courseChanged(newVal: number) {
     //    this.courseId = newVal
     this.changeKnowledgeTable().then(()=>{
        // this.$forceUpdate()
    
    });
     }
 
    @Action('getCourseInfo')
    private getCourseInfo!: () => any;

    @Action('getKnowledgeData')
    private getKnowledgeData!: (courseid:number) => any;
//     @Watch('courseId')
//        courseChanged(newVal: number) {
//         //    this.courseId = newVal
//         console.log("watch",newVal);
        
// }

    
    
    public KnowledgeTypeSelectList: ISelectItem[] = [];

    // public courseId: number = 0;

    public courseData:ICourseItem[]=[
 
    ];
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
            name: '知识点内容',
            
        },
        {
            type: ColumnTemType.INPUT,
            prop: 'important',
            propInit: '1',
            name: '知识点重要程度',
         
        },
        {
            type: ColumnTemType.INPUT,
            prop: 'abilityContent',
            propInit: 'hhh',
            name: '能力点内容',
      
        
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
     
    //加载知识点数据表
    public async changeKnowledgeTable(){
        // this.$forceUpdate()
        await this.getKnowledgeData(this.courseId).then((res:any) => {
    
        //    
            this.knowledgeList = Array.from(res.data)
            this.rowNum=this.knowledgeList.length;
            // this.$forceUpdate();
            // console.log("row:",this.rowNum);
            
            // console.log("k:",this.knowledgeList);
            // console.log("res.data:",res.data);
        }) 
    }

         //加载课程
         public  async created() {
     
            await this.getCourseInfo().then((res:any) => {
               
                const data:ICourseItem[] = Array.from(res.data)
                // this.CourseInfo.CourseInfo = res
                    this.courseData.push(...data)
                    // console.log(this.courseData);
                // console.log("coursedata:",res[0]);
                
            })
            
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
                                {
                            this.courseData.map((option:any,index:number)=>{
                                return(
                                    <el-option 
                                    key={index}
                                    label={option.courseName}
                                    value={option.courseId}
                                    ></el-option>
                                )
                            })
                        }
                        </el-select>
                    </el-form-item>
                </el-form>


    <check-table
                    courseId={this.courseId}
                    knowledgeList={this.knowledgeList}
                    rowNum={this.rowNum}
                    rules={KnowledgeRules}
                    tableConfig={this.tableConfig1}
                    tableTitle={KnowledgeCheck}
                    
                />
           
            </div>

        )
    }
}
