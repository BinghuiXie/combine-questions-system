import { Component } from 'vue-property-decorator';
import { Action } from 'vuex-class';
import { mixins } from 'vue-class-component';
import {
    IKnowledgeItem,
    IChapterItem,
    ISectionItem,
    KnowledgeInputType,
    KnowledgeTableConfig
} from '@/interfaces/compose-viewer';
import Lang from '@/lang/lang';
import { chapterMockData } from '@/common/mock/compose-viewer/chapter-list';
import { deepclone, validateInput } from '@/utlis';
import {
    ButtonType,
    SUBMIT,
    INPUT_MODULE,
    KNOWLEDGE_INPUT
} from '@/common/constants';
import { ColumnTemType, ITableConfig, ISelectItem } from '@/interfaces/common';
import InputTable from '@/components/common/inputTable';
import './style.scss';
import { KnowledgeRules } from '@/common/rules/compose-viewer/knowledge-manage';
import { IRefValidate } from '@/interfaces/common/validate.interface';

const {
    SELECT_KNOWLEDGE_COURSE,
    SELECT_CHAPTER,
    SELECT_SECTION,
    INPUT_KNOWLEDGE_CONTENT,
    INPUT_CONETNT,
} = INPUT_MODULE;

@Component({
    components: {
        InputTable
    }
})
export default class KnowledgeInput extends mixins(Lang) {
    @Action('submitKnowledgeData')
    public submitKnowledgeData!: (payload: { knowledgeList: Array<IKnowledgeItem> }) => Promise<boolean>;

    public activeName: string = KnowledgeInputType.Single;

    public singleKonwledgeData: IKnowledgeItem = {
        knowledgeId: 0,
        content: '',
        chapterList: [],
        sectionList: [],
        courseId: 0,
        importance: 1,
    }

    public $refs!: {
        [key: string]: any;
        singleRuleForm: IRefValidate
    }

    //课程id
    public batchCourseId: number = 0;

    public cascaderProps = {
        multiple: true,
        expandTrigger: 'hover',
    }

    public cascaderData: number[][] = [];

    public batchCascaderOptions: ISelectItem[][] = [];
    public courseData:any=[
        {
            courseName:'hh',
            id:1
        },
        {
            courseName:'hhh',
            id:2
        }
    ];//课程数据

    public tableConfig: KnowledgeTableConfig = [
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
            name: '知识点内容',
            placeholder: INPUT_CONETNT
        },
        // {
        //     type: ColumnTemType.SELECT,
        //     prop: 'chapterList',
        //     propInit: [],
        //     name: '知识点关联章',
        //     placeholder: SELECT_CHAPTER,
        //     selectData: this.scaleChapterKeys(chapterMockData),
        //     selectOptions: {
        //         multiple: true
        //     }
        // },
        // {
        //     type: ColumnTemType.CASCADER,
        //     prop: 'sectionList',
        //     propInit: [],
        //     link: 'chapterList',
        //     name: '知识点关联节',
        //     placeholder: SELECT_SECTION,
        //     cascaderProps: this.cascaderProps
        // },
        {
            type: ColumnTemType.INPUT,
            prop: 'importance',
            propInit: 1,
            name: '知识点重要程度',
            placeholder: '知识点重要程度（1-5）'
        }
    ]

    public get cascaderOptions(): ISelectItem[] {
        const { chapterList } = this.singleKonwledgeData;
        const res = chapterMockData.filter(chapter => {
            if(chapterList.indexOf(chapter.chapterId) !== -1) {
                return chapter;
            }
        });
        return this.scaleChapterKeys(res);
    }

    public scaleChapterKeys(data: IChapterItem[] | ISectionItem[]): ISelectItem[] {
        const copy = deepclone<typeof data>(data);
        if(!copy.length) {
            return [];
        }
        if('sections' in copy[0]) {
            return (copy as IChapterItem[]).map((chapter: IChapterItem) => {
                return {
                    value: chapter.chapterId,
                    label: chapter.content,
                    children: this.scaleChapterKeys(chapter.sections)
                }
            });
        } else {
            return (copy as ISectionItem[]).map((section: ISectionItem) => {
                return {
                    value: section.sectionId,
                    label: section.content,
                }
            });
        }
    }

    public async handleSubmitSingle() {
        const validateRes = await validateInput(this.singleKonwledgeData, KnowledgeRules, 0)
        if(typeof validateRes === 'object') {
            this.$message.error('输入数据有误')
        } else {
            this.submitKnowledgeData({
                knowledgeList: [this.singleKonwledgeData]
            })
        }
    }

    public getCascaderData(tableConfig: ITableConfig, rowData: any, index: number) {
        const { link } = tableConfig;
        if(link) {
            const linkData = rowData[link];
            const chapterData = chapterMockData.filter(chapter => {
                if(linkData.indexOf(chapter.chapterId) !== -1) {
                    return chapter;
                }
            });
            const res = this.scaleChapterKeys(chapterData);
            // 在 batchCascaderOptions 对应下标位置插入改变过字段的数据
            this.batchCascaderOptions.splice(index, 0, res);
        }
    }

    public render() {
        return (
            <div class='knowledge-input'>
                <el-form label-width='120px' label-position='right'>
                    <el-form-item label={this.t(SELECT_KNOWLEDGE_COURSE)}>
                        <el-select
                            v-model={this.batchCourseId}
                            placeholder={this.t(SELECT_KNOWLEDGE_COURSE)}
                        >
                            {/* <el-option label='计算机通信与网络' value={0}></el-option>
                            <el-option label='编译原理' value={1}></el-option> */}
                            {this.courseData.map((Option:any,index:number)=>{
                                return (
                                    <el-option
                                         key={index} 
                                        label={Option.courseName}
                                         value={index} >
                                    </el-option>
                                )
                            })}
                        </el-select>
                    </el-form-item>
                    <el-form-item class='table-input-container'>
                        <input-table
                            courseId={this.batchCourseId}
                            rules={KnowledgeRules}
                            tableConfig={this.tableConfig}
                            tableTitle={KNOWLEDGE_INPUT}
                            cascaderOptions={this.batchCascaderOptions}
                            onGetCascaderData={this.getCascaderData}
                        />
                    </el-form-item>
                </el-form>
                
            </div>
        )
    }
}
