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
 import { IKnowledgeItem, KnowledegTableCheck } from '@/interfaces/compose-viewer';
 import { IAbilityItem } from '@/interfaces/compose-viewer/ability.interface';
 import { IRefValidate } from '@/interfaces/common'
 import { validateInput } from '@/utlis';
import KnowledgeCheck from '@/components/compose-viewer/knowledge-manage/knowledegCheck';
 
 @Component({})
 export default class CheckTable extends mixins(Lang) {
     @Prop()
     public courseId!: number;

     @Prop()
     public currentIndex: number=0;

     @Prop()
     public rowNum: number=4;
 
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
     //

     private KnowledgeInfo: (KnowledegTableCheck)[] = [
        
    ];

     @Action("getKnowledgeInfo")
     private getKnowledgeInfo!: () => any;
     
    @Action('getAbilityInfo')
    private getAbilityInfo!: () => any;

     async created() {
        // this.getUserInfo();
        await this.getKnowledgeInfo().then((res: any) => {
            const data:(KnowledegTableCheck)[] = Array.from(res.data)
        // this.CourseInfo.CourseInfo = res
            this.KnowledgeInfo.push(...data)
            console.log(this.KnowledgeInfo);
        })
        
        console.log("created");
    }
//
 
    //  public currnentIndex:number = 0;
    //  public rowNum:number = 4;
  
    tableData:Array<any>= [{
        text:'hhhhhh',
        importance:'1',
        relatedAbility:'网络'
       
      }, {
        text:'hhhhhh',
        importance:'1',
        relatedAbility:'网络'
      }, {
        text:'hhhhhh',
        importance:'1',
        relatedAbility:'网络'
       
      }, {
        text:'hhhhhh',
        importance:'1',
        relatedAbility:'网络'
       
      }]
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
        // this.tableData.map((Data, index) => {
        // //    this.handleAddIconClick()
        // //    this.currnentIndex++
        // })
        // console.log("cuhhhhhhhhhhhhhhhhh:",this.currentIndex,this.rowNum);
        for(var i=0;i<this.rowNum-1;i++){
            this.handleAddIconClick()
           
           console.log(i);
           
          
            
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
    //   public getColumnTemplateHead(config: ITableConfig, data: any, index: number) {
    //     const { type, placeholder: hint, prop } = config;
    //    if(index===0){
    //        return (
    //            <el-form-item class="item_checkbox"prop={prop}>
    //                <el-checkbox  v-model={data[prop]}/>
    //            </el-form-item>
    //        )
    //    }
    //    else if(index===1){
       
    //             return <el-form-item prop={prop} class='row-item row-item__text'>{this.tableConfig[1][prop]}</el-form-item>;
           
    //            }
    //    else if(index===2){
          
    //            return <el-form-item prop={prop} class='row-item row-item__text1'>{}</el-form-item>;
              
    //    }  
    // }

     public getColumnTemplate(config: ITableConfig, data: any, index: number,index1:number) {
         const { type, placeholder: hint, prop } = config;
         
         
        if(index===0){
            return (
                    <el-form-item prop={prop}>
                        <el-checkbox class="item_checkbox" v-model={data[prop]}/>
                    </el-form-item>
            )
        }
        else if(index===1){
        
                 return <el-form-item prop={prop} class='row-item row-item__text'>{this.tableData[index1].text}</el-form-item>;
            
                }
        else if(index===2){
           
                return <el-form-item prop={prop} class='row-item row-item__text1'>{this.tableData[index1].importance}</el-form-item>;
               
        }  
         else if(index===3){
           
            return <el-form-item prop={prop} class='row-item row-item__text2'>{this.tableData[index1].relatedAbility}</el-form-item>;
           
    }  

     }
 
     public renderTableList1(){
         
         
        // this.initRowDataList()
        return this.rowDataList.map((rowData, index) => {
           let index1=index
            
         console.log(index1);
            
            return (
                <el-form
                    class='table-row__item'
                    key={index1}
                    ref='batchRuleForm'
                    rules={this.rules}
                    {...{ props: { model: rowData } }}
                >
                    {
                        this.tableConfig.map((columnConfig,index) => {
                            return this.getColumnTemplate(columnConfig, rowData, index,index1)
                        })
                    }
                </el-form>
            )
        })
     }
     public renderTableList(index1:number) {
      
        return this.rowDataList.map((rowData, index) => {
            let index2=index
            console.log(index);
            
            return (
                <el-form
                    class='table-row__item'
                    key={index}
                    ref='batchRuleForm'
                    rules={this.rules}
                    {...{ props: { model: rowData } }}
                >
                    {
                        this.tableConfig.map((columnConfig,index) => {
                            return this.getColumnTemplate(columnConfig, rowData, index,index1)
                        })
                    }
                </el-form>
            )
        })
            // return (
            //     <el-form
            //         class='table-row__item'
            //         key={index1}
            //         ref='batchRuleForm'
            //         rules={this.rules}
                   
            //     >
            //         {
            //             this.tableConfig.map((columnConfig,index) => {
            //                 return this.getColumnTemplate(columnConfig, '', index,index1)
            //             })
            //         }
            //     </el-form>
            // )
       
    }
 
     public mounted() {
        //  this.listenEnterKeyDown();
        
         this.initRowDataList()
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
                     <div class='table-row_list'>   
                     { 
                    
                     
                     this.renderTableList1()

                     }                              
            {/* {this.tableData.map((item,index) => {
					//console.log(item);
					
  					return (
                        this.renderTableList(index)
                       
  );
})}  */}
                         {/* { this.renderTableRow() } */}
                     </div>
                 </div>
            
                
             </div>
         )
     }
 }