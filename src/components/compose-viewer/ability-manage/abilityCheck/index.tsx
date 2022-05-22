import { Component, Prop, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import CheckTable from '@/components/common/checkTable';
import Lang from '@/lang/lang';
import { ColumnTemType, ITableConfig, ISelectItem } from '@/interfaces/common';
import { INPUT_MODULE, ABILITY_INPUT, ABILITY_CHECK } from '@/common/constants';
import { AbilityTableCheck, AbilityTableConfig, AbilityType, IAbilityItem1 } from '@/interfaces/compose-viewer/ability.interface';
import { AbilityRules } from '@/common/rules/compose-viewer/ability-manage';
import { ICourseItem } from '@/interfaces/compose-viewer/course.interface';
import { Action } from 'vuex-class/lib/bindings';

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
    @Prop()
    public courseId!: number;
    @Prop()
    public rowNum!: number;
    @Prop()
    public abilityList!:IAbilityItem1[];

    @Watch('courseId')
    courseChanged(newVal: number) {
     //    this.courseId = newVal
     this.changeAbilityTable().then(()=>{
        this.$forceUpdate()
    
    });
     }

    @Action('getAbilityData')
     private getAbilityData!: (courseid:number) => any;
    @Action('getCourseInfo')
    private getCourseInfo!: () => any;

    public abilityTypeSelectList: ISelectItem[] = [];

    // public courseId: number = 0;

    public courseData:ICourseItem[]=[];
    public tableConfig1: AbilityTableCheck = [
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
            propInit: 'hhh',
            name: '能力点重要程度',
           
        }
       
    ]

   
       //加载课程
       public  async created() {
      
        await this.getCourseInfo().then((res:any) => {
           
            const data:ICourseItem[] = Array.from(res.data)
            // this.CourseInfo.CourseInfo = res
                this.courseData.push(...data)
                console.log(this.courseData);
            // console.log("coursedata:",res[0]);
            
        })
        
    }
     //加载能力点数据表
     public async changeAbilityTable(){
        // this.$forceUpdate()
        await this.getAbilityData(this.courseId).then((res:any) => {
    
        //    
            this.abilityList = Array.from(res.data)
            this.rowNum=this.abilityList.length;
            // this.$forceUpdate();
            console.log("row:",this.rowNum);
            
            console.log("k:",this.abilityList);
            console.log("res.data:",res.data);
        }) 
    }

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
                    courseId={this.courseId}
                    rowNum={this.rowNum}
                    abilityList={this.abilityList}
                    rules={AbilityRules}
                    tableConfig={this.tableConfig1}
                    tableTitle={ABILITY_CHECK}
                />
           
            </div>

        )
    }
}
