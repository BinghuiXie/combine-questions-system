/**
 * @description: 可修改的表格（添加数据使用）
 */
 import { Component, Prop, Emit, Watch } from 'vue-property-decorator';
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
 import { IKnowledgeItem, IKnowledgeItem1, KnowledegTableCheck } from '@/interfaces/compose-viewer';
 import { IAbilityItem, IAbilityItem1 } from '@/interfaces/compose-viewer/ability.interface';
 import { IRefValidate } from '@/interfaces/common'
 import { validateInput } from '@/utlis';
import KnowledgeCheck from '@/components/compose-viewer/knowledge-manage/knowledegCheck';
 
 @Component({})
 export default class CheckTable extends mixins(Lang) {
     @Prop()
     public courseId!: number;
     @Prop()
     public rowNum!: number;
     @Prop()
     public knowledgeList!:IKnowledgeItem1[];
     @Watch('knowledgeList')
     listchange(){
        //  console.log("know:",this.knowledgeList);
        console.log("mkjhgfd");
        this.initRowDataList()
        if(this. formDataStatus == false)
        this.formDataStatus = true;
        else{
            this.formDataStatus=false;
        }
        // this.$forceUpdate();
         
     }
     @Prop()
     public abilityList!:IAbilityItem1[];
     @Watch('abilityList')
     abilitListchange(){
        this.initRowDataList()
        //  console.log("know:",this.knowledgeList);
        // console.log("mkjhgfd");
        if(this. formDataStatus == false)
        this.formDataStatus = true;
        else{
            this.formDataStatus=false;
        }
        // this.$forceUpdate();
         
     }
//      @Watch('courseId')
//      courseChanged(newVal: number) {
//       //    this.courseId = newVal
//       console.log("watcheee",newVal);
//       console.log(this.selectProp);
      
//       if(this.selectProp==undefined){
//         this.changeKnowledgeTable().then(()=>{
    
//           });
//       }
  

//       else{
//         this.changeAbilityTable().then(()=>{
        
//           });
//       }

      
// }    

     @Prop()
     public currentIndex: number=0;

     @Prop()
     public tableConfig!: ITableConfig[];//表格数据


  
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
     public  formDataStatus = false
     //
    //
    // public rowDataList: any= [];
    //  public  templateData() {
    //     // let obj: {[key: string]: any} = {};
    //     this.tableConfig.forEach(config => {
    //         this.rowDataList[config.prop] = config.propInit;
    //     });
    //     console.log("tablecondif:",this.tableConfig);
    //     console.log("rowdata:",this.rowDataList);
        
    //     // console.log(obj);
        
    //     // return obj;
    // }
    public get templateData() {
        let obj: {[key: string]: any} = {};
        this.tableConfig.forEach(config => {
            obj[config.prop] = config.propInit;
        });
        console.log("tablecondif:",this.tableConfig);
        
        console.log(obj);
        
        return obj;
    }

    // public rowDataList: any[] = new Array({...this.templateData});
    public rowDataList: any[] =[]
    
 
     public isAddButtonActive: boolean = false;

    //  public rowDataList: any[] = new Array({...this.templateData});
     
     private KnowledgeInfo: (KnowledegTableCheck)[] = [
        
    ];


     @Action("getKnowledgeData")
     private getKnowledgeData!: () => any;
     
    @Action('getAbilityData')
    private getAbilityData!: () => any;
    public selectProp:any;
     async created() {
         //判断是能力点还是知识点
        this.selectProp = this.tableConfig.find(config => config.name === '能力点重要程度');
        console.log("类型",this.selectProp);
        // this.templateData();
        // console.log(":templateData:",this.templateData);
        // console.log(this.tableConfig);
        
        // this.rowDataList=new Array({...this.templateData});
        // console.log("rowdata:",this.rowDataList);//rowDataList里面存的是表的模板，包括表的列的名称以及初始值
        
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
 
     public handleAddIconClick() {
        
        // 推入一个深拷贝，否则会修改一个导致所有的都发生变化
        this.rowDataList.push({
            ...this.templateData,
            id: ++this.templateData.id
        });
    }

   
    //初始化rowdataList
    public initRowDataList(){
      
        this.rowDataList=[];
        this.rowDataList=new Array({...this.templateData})
        // console.log("rowList",this.rowDataList);
        

        // console.log("initrow:",this.rowNum);
        
        for(var i=0;i<this.rowNum-1;i++){
            this.handleAddIconClick()  
            
        }
    }
  
 
     public listenEnterKeyDown() {
        
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

     /**
      * 获取当前列的模板
      */
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
   

     public getColumnTemplate(config: ITableConfig, data: any, index: number,index1:number) {
         const { type, placeholder: hint, prop } = config;
        //  console.log("index1:",index1,"knowlist",this.knowledgeList[index1].knowledgeContent);
         var kcontent=0;
        
         
        if(index===0){
            return (
                
                    <el-form-item prop={prop}>
                        <el-checkbox class="item_checkbox" v-model={data[prop]}/>
                    </el-form-item>
            )
        }//接口的属性顺序要与返回的一致
        
        
        else if(index===1){
            if(this.selectProp==undefined){
                // return <div>{this.formDataStatus}</div>
              
                // console.log("return这一句的上面打印这个knowledgeContent:",this.knowledgeList[index1].knowledgeContent);
                // this.$forceUpdate()
                 return <el-form-item  prop={prop} class='row-item row-item__text'>{this.knowledgeList[index1].knowledgeContent}</el-form-item>;
            
            }
            else{
                return <el-form-item prop={prop} class='row-item row-item__text'>{this.abilityList[index1].abilityContent}</el-form-item>;
            }}
        else if(index===2){
            if(this.selectProp==undefined){
                return <el-form-item prop={prop} class='row-item row-item__text1'>{this.knowledgeList[index1].knowledgeImportance}</el-form-item>;
            }else{
                return <el-form-item prop={prop} class='row-item row-item__text1'>{this.abilityList[index1].abilityImportance}</el-form-item>;
            }
           
               
        }  
         else if(index===3){
           
            return <el-form-item prop={prop} class='row-item row-item__text2'>{this.knowledgeList[index1].knowledgeAbilityId}</el-form-item>;
           
    }  

     }
 
     public renderTableList1(){
        
        // this.$forceUpdate();
        // console.log("rowNum:",this.rowNum);
        
        //  console.log("rowdata:",this.rowDataList);
         
        // this.initRowDataList()
        return this.rowDataList.map((rowData:any, index:number) => {
           let index1=index//行
            // console.log("knowlistL",this.knowledgeList);
            
        //  console.log("index1:",index1,"knowlist:",this.knowledgeList[index1].knowledgeContent);
        //  console.log("rowdata:",this.rowDataList);
         
            
            return (
                
                <el-form
                    class='table-row__item'
                    key={index1}
                    ref='batchRuleForm'
                    rules={this.rules}
                   
                    {...{ props: { model: rowData } }}
                >
                    {
                        // console.log("list1",this.knowledgeList);
                        
                        this.tableConfig.map((columnConfig,index) => {
                            return this.getColumnTemplate(columnConfig, rowData, index,index1)
                        })
                    }
                </el-form>
               
            )
        })
     }
   
 
     public mounted() {
        //  this.listenEnterKeyDown();
        
        //  this.initRowDataList()
        // console.log("datalist:",this.rowDataList);
        
        //  console.log("cuhhhhhhhhhhhhhhhhh:",this.currnentIndex);
     }
 
     public render() {
         return (
             <div class='self-table__container'>
                 <div class='table-info'>
                   
                     
                     <div class='table-operation'>
                        
                         <el-button
                             size={ButtonSize.MINI}
                             type={ButtonType.DANGER}
                             onclick={this.deleteSelectedRows}
                         >删除所选</el-button>
                     </div>
                 </div>
                 <div class='table-body'>
                     { this.renderTableHeader() }
                     <div class='table-row_list' key={this.formDataStatus}>   
                     { 
                    
                     
                     this.renderTableList1()//渲染出表格

                     }                              
                     </div>
                 </div>
            
                
             </div>
         )
     }
 }