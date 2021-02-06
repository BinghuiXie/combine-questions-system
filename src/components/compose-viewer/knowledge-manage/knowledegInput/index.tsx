import { Component, Watch } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { INPUT_MODULE, KNOWLEDGE_INPUT } from '@/common/constants/lang';
import { IKnowledgeItem, IChapterItem, ISectionItem, BatchKnowledgeItem } from '@/interfaces/compose-viewer';
import Lang from '@/lang/lang';
import './style.scss';
import { chapterMockData } from '@/common/mock/compose-viewer/chapter-list';
import { deepclone, valueof } from '@/utlis';
import { ButtonType, InputSize, ButtonSize, KeyCodeMap, SUBMIT } from '@/common/constants';

enum KnowledgeInputType {
    Single = 'single',
    Batch = 'batch'
}

const {
    SELECT_KNOWLEDGE_COURSE,
    SELECT_CHAPTER,
    SELECT_SECTION,
    INPUT_KNOWLEDGE_CONTENT,
} = INPUT_MODULE;

interface ICascaderOptions {
    value: number;
    label: string;
    children?: ICascaderOptions[]
}

const knowledgeTemplate: BatchKnowledgeItem = {
    knowledgeId: 0,
    content: '',
    chapterList: [],
    sectionList: [],
    importance: 1,
    isCheck: false
}

@Component({})
export default class KnowledgeInput extends mixins(Lang) {
    public activeName: string = KnowledgeInputType.Batch;

    public singleKonwledgeData: IKnowledgeItem = {
        knowledgeId: 0,
        content: '',
        chapterList: [],
        sectionList: [],
        courseId: [0],
        importance: 1,
    }

    public batchCourseId: number = 0;

    public cascaderProps = {
        multiple: true,
        expandTrigger: 'hover',
    }

    public cascaderData: number[][] = [];

    public isAddButtonActive: boolean = false;

    public batchList: BatchKnowledgeItem[] = new Array({...knowledgeTemplate});

    public batchCascaderOptions: ICascaderOptions[][] = [];

    public $refs!: {
        addIcon: HTMLElement
    }

    public get cascaderOptions(): ICascaderOptions[] {
        const { chapterList } = this.singleKonwledgeData;
        const res = chapterMockData.filter(chapter => {
            if(chapterList.indexOf(chapter.chapterId) !== -1) {
                return chapter;
            }
        });
        return this.scaleChapterKeys(res);
    }

    public scaleChapterKeys(data: IChapterItem[] | ISectionItem[]): ICascaderOptions[] {
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

    public handleSubmitSingle() {
        this.singleKonwledgeData.sectionList = this.cascaderData.map(item => item[1]);
        // TODO: 提交单个知识点
    }

    public handleSubmitBatch() {
        console.log(this.batchList);
        console.log(this.batchCourseId);
        // TODO: 提交批量知识点
    }

    public handleAddIconClick() {
        // 推入一个深拷贝，否则会修改一个导致所有的都发生变化
        this.batchList.push({...knowledgeTemplate});
    }

    public handleBatchCascaderFocus(index: number) {
        const batchRowData = this.batchList[index];
        const chapterData = chapterMockData.filter(chapter => {
            if(batchRowData.chapterList.indexOf(chapter.chapterId) !== -1) {
                return chapter;
            }
        });
        const res = this.scaleChapterKeys(chapterData);
        this.batchCascaderOptions.splice(index, 0, res);
    }

    public handleSelectAll() {
        this.batchList.forEach(batchRowData => {
            batchRowData.isCheck = !batchRowData.isCheck;
        })
    }

    public handleDeleteSelected() {
        this.batchList = this.batchList.filter(batchRowData => {
            return batchRowData.isCheck === false;
        })
    }

    public deleteLastLine() {
        this.batchList.pop();
    }

    public listenEnterKeyDown() {
        window.addEventListener('keydown', (e: any) => {
            const el = e || window.event;
            switch(el.keyCode) {
                case KeyCodeMap.ENTER:
                    this.isAddButtonActive = true;
                    this.handleAddIconClick();
                    break;
                case KeyCodeMap.DELETE:
                    this.deleteLastLine();
                    break;
            }
        });
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

    public renderBatchInputItem() {
        return this.batchList.map((rowData, index) => {
            return (
                <li class='batch-knowledge__item' key={index}>
                    <el-checkbox v-model={rowData.isCheck}/>
                    <div class='knowledge-item knowledge-item__id'>{index}</div>
                    <div class='knowledge-item knowledge-item__content'>
                        <el-input 
                            placeholder={this.t(KNOWLEDGE_INPUT)}
                            size={InputSize.MINI}
                            v-model={rowData.content}
                        />
                    </div>
                    <div class='knowledge-item knowledge-item__chapter'>
                        <el-select 
                            placeholder={this.t(SELECT_CHAPTER)}
                            size={InputSize.MINI}
                            v-model={rowData.chapterList}
                            multiple
                            collapse-tags
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
                    </div>
                    <div class='knowledge-item knowledge-item__section'>
                        <el-cascader
                            placeholder={this.t(SELECT_SECTION)}
                            size={InputSize.MINI}
                            onFocus={() => { this.handleBatchCascaderFocus(index) }}
                            options={this.batchCascaderOptions[index]}
                            collapse-tags
                            v-model={rowData.sectionList}
                            {...{
                                props: {
                                    props: {...this.cascaderProps}
                                }
                            }}
                        ></el-cascader>
                    </div>
                    <div class='knowledge-item knowledge-item__importance'>
                        <el-input 
                            placeholder='知识点重要程度（输入1-5）'
                            size={InputSize.MINI}
                            v-model={rowData.importance}
                        />
                    </div>
                </li>
        )})
    }

    public mounted() {
        this.listenEnterKeyDown();
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
                                label={this.t(INPUT_KNOWLEDGE_CONTENT)}
                            >
                                <el-input
                                    v-model={this.singleKonwledgeData.content}
                                    placeholder={this.t(INPUT_KNOWLEDGE_CONTENT)}
                                />
                            </el-form-item>
                            <el-form-item label={this.t(SELECT_CHAPTER)}>
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
                            <el-form-item label={this.t(SELECT_SECTION)}>
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
                                    onclick={this.handleSubmitSingle}
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
                            <el-form-item
                                class='el-form-item__list'
                            >
                                <label class='batch-knowledge__label'>
                                    {this.t(KNOWLEDGE_INPUT)}
                                </label>
                                <div class='batch-knowledge__number'>
                                    { '( 0 / ' + this.batchList.length + ' )' }
                                </div>
                                <div class='batch-knowledge__operation'>
                                    <el-button size={ButtonSize.MINI} type={ButtonType.PRIMARY}>新增一行</el-button>
                                    <el-button 
                                        size={ButtonSize.MINI} 
                                        type={ButtonType.DANGER}
                                        onclick={this.deleteLastLine}
                                    >删除最后一行</el-button>
                                    <el-button
                                        size={ButtonSize.MINI}
                                        type={ButtonType.DANGER}
                                        onclick={this.handleDeleteSelected}
                                    >删除所选</el-button>
                                </div>
                                <ul class='batch-knowledge_list'>
                                    <li class='batch-knowledge__header'>
                                        <el-checkbox onChange={this.handleSelectAll}/>
                                        <span class='knowledge-id'>序号</span>
                                        <span>知识点内容</span>
                                        <span>知识点关联章</span>
                                        <span>知识点关联节</span>
                                        <span>知识点重要程度</span>
                                    </li>
                                    {
                                        this.renderBatchInputItem()
                                    }
                                </ul>
                                <div class='batch-knowledge__add'>
                                    <i
                                        ref='addIcon'
                                        class={['iconfont', 'icon-tixing', this.isAddButtonActive ? 'active' : null]} 
                                        onclick={this.handleAddIconClick}
                                    />
                                    <i class={['iconfont', 'icon-add', this.isAddButtonActive ? 'active' : null]} />
                                </div>
                            </el-form-item>
                            <el-form-item class='el-form-item__submit'>
                                <el-button
                                    type={ButtonType.PRIMARY}
                                    onclick={this.handleSubmitBatch}
                                    size={ButtonSize.MEDIUM}
                                >{this.t(SUBMIT)}</el-button>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
        )
    }
}
