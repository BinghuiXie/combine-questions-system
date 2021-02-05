import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import { INPUT_MODULE, KNOWLEDGE_INPUT } from '@/common/constants/lang';
import { IKnowledgeItem, IChapterItem, ISectionItem, BatchKnowledgeItem } from '@/interfaces/compose-viewer';
import Lang from '@/lang/lang';
import './style.scss';
import { chapterMockData } from '@/common/mock/compose-viewer/chapter-list';
import { deepclone } from '@/utlis';
import { ButtonType } from '@/common/constants';

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

    public batchKnowledgeData: {
        courseId: number;
        knowledgeList: BatchKnowledgeItem[];
    } = {
        courseId: 0,
        knowledgeList: []
    }

    public cascaderData: number[][] = [];

    public isAddButtonActive: boolean = false;

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

    public handleAddIconClick() {
        
    }

    public listenEnterKeyDown() {
        window.addEventListener('keydown', (e: any) => {
            const el = e || window.event;
            if(el.keyCode === 13) {
                this.isAddButtonActive = true;
                this.handleAddIconClick();
            }
        });
        window.addEventListener('keyup', (e: any) => {
            const el = e || window.event;
            if(el.keyCode === 13) {
                this.isAddButtonActive = false;
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
                                            props: {
                                                multiple: true,
                                                expandTrigger: 'hover',
                                            }
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
                                >提交</el-button>
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
                                    v-model={this.singleKonwledgeData.courseId}
                                    placeholder={this.t(SELECT_KNOWLEDGE_COURSE)}
                                >
                                    <el-option label='计算机通信与网络' value={0}></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item 
                                label={this.t(KNOWLEDGE_INPUT)}
                                class='el-form-item__list'
                            >
                                <ul class='batch-knowledge_list'>
                                    <li class='batch-knowledge__header'></li>
                                    <li class='batch-knowledge__item'></li>
                                    <div class='batch-knowledge__add'>
                                        <i
                                            ref='addIcon'
                                            class={['iconfont', 'icon-tixing', this.isAddButtonActive ? 'active' : null]} 
                                            onclick={this.handleAddIconClick}
                                        ></i>
                                        <i class={['iconfont', 'icon-add', this.isAddButtonActive ? 'active' : null]}></i>
                                    </div>
                                </ul>
                            </el-form-item>
                        </el-form>
                    </el-tab-pane>
                </el-tabs>
            </div>
        )
    }
}
