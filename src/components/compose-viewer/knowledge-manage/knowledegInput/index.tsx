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
import { deepclone } from '@/utlis';
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

    public batchCourseId: number = 0;

    public cascaderProps = {
        multiple: true,
        expandTrigger: 'hover',
    }

    public cascaderData: number[][] = [];

    public batchCascaderOptions: ISelectItem[][] = [];

    public tableConfig: KnowledgeTableConfig = [
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
            name: '知识点内容',
            placeholder: INPUT_CONETNT
        },
        {
            type: ColumnTemType.SELECT,
            prop: 'chapterList',
            propInit: [],
            name: '知识点关联章',
            placeholder: SELECT_CHAPTER,
            selectData: this.scaleChapterKeys(chapterMockData),
            selectOptions: {
                multiple: true
            }
        },
        {
            type: ColumnTemType.CASCADER,
            prop: 'sectionList',
            propInit: [],
            link: 'chapterList',
            name: '知识点关联节',
            placeholder: SELECT_SECTION,
            cascaderProps: this.cascaderProps
        },
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

    public handleSubmitSingle(formName: string) {
        this.singleKonwledgeData.sectionList = this.cascaderData.map(item => item[1]);
        this.$refs[formName].validate((valid: boolean) => {
            if(valid) {
                this.submitKnowledgeData({
                    knowledgeList: [this.singleKonwledgeData]
                })
            } else {
                return false;
            }
        })
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
                <el-tabs v-model={this.activeName}>
                    <el-tab-pane
                        label="单个录入"
                        class='single-input-pane'
                        name={ KnowledgeInputType.Single }
                    >
                        <el-form
                            {...{
                                props: {
                                    model: { 
                                        ...this.singleKonwledgeData,
                                        cascaderData: this.cascaderData
                                    }
                                }
                            }}
                            ref='singleRuleForm'
                            rules={KnowledgeRules}
                            label-width='120px'
                            label-position='right'
                        >
                            <el-form-item 
                                label={this.t(SELECT_KNOWLEDGE_COURSE)}
                            >
                                <el-select
                                    v-model={this.singleKonwledgeData.courseId}
                                    placeholder={this.t(SELECT_KNOWLEDGE_COURSE)}
                                >
                                    <el-option label='计算机通信与网络' value={0}></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item
                                prop="content"
                                label={this.t(INPUT_KNOWLEDGE_CONTENT)}
                            >
                                <el-input
                                    v-model={this.singleKonwledgeData.content}
                                    placeholder={this.t(INPUT_KNOWLEDGE_CONTENT)}
                                />
                            </el-form-item>
                            <el-form-item prop="chapterList" label={this.t(SELECT_CHAPTER)}>
                                <el-select
                                    class='multiple-select'
                                    v-model={this.singleKonwledgeData.chapterList}
                                    multiple
                                >
                                    {
                                        chapterMockData.map(chapter => (
                                            <el-option
                                                label={chapter.content}
                                                value={chapter.chapterId}
                                                key={chapter.chapterId}
                                            />
                                        ))
                                    }
                                </el-select>
                            </el-form-item>
                            <el-form-item prop="cascaderData" label={this.t(SELECT_SECTION)}>
                                <el-cascader
                                    v-model={this.cascaderData}
                                    options={this.cascaderOptions}
                                    {...{
                                        props: {
                                            props: {...this.cascaderProps}
                                        }
                                    }}
                                    clearable
                                ></el-cascader>
                            </el-form-item>
                            <el-form-item class='el-form-item__rate' label='知识点重要程度'>
                                <el-rate v-model={this.singleKonwledgeData.importance}></el-rate>
                                <el-tooltip effect="dark" content='默认重要程度为1颗星' placement="top-end">
                                    <i class='iconfont icon-tishi'></i>
                                </el-tooltip>
                            </el-form-item>
                            <el-form-item class='el-form-item__button'>
                                <el-button 
                                    onclick={() => { this.handleSubmitSingle('singleRuleForm') }}
                                    type={ButtonType.PRIMARY}
                                >{this.t(SUBMIT)}</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                    <el-tab-pane
                        class='batch-input-pane'
                        label="批量录入"
                        name={ KnowledgeInputType.Batch }
                    >
                        <el-form label-width='120px' label-position='right'>
                            <el-form-item label={this.t(SELECT_KNOWLEDGE_COURSE)}>
                                <el-select
                                    v-model={this.batchCourseId}
                                    placeholder={this.t(SELECT_KNOWLEDGE_COURSE)}
                                >
                                    <el-option label='计算机通信与网络' value={0}></el-option>
                                    <el-option label='编译原理' value={1}></el-option>
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
                    </el-tab-pane>
                </el-tabs>
            </div>
        )
    }
}
