import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import './style.scss';
import { 
    renderQuestionContents,
    isFillQues,
    isSelectQues,
    getQuestionTypes,
    createArray,
    isSubjective,
    valueof
} from '@/utlis';
import { 
    IQuestionItem,
    QuestionNameMap
} from '@/interfaces/compose-viewer';
import { 
    InputType,
    ButtonType,
    ButtonSize,
    choicesBaseNum,
    Alphabet,
    INPUT_MODULE
} from '@/common/constants';
import RegMap from '@/common/regexp';
import { keyRenderClass } from '@/common/regexp/editor';
import { CreateElement } from 'vue';
import { PreviewContentKey } from '@/interfaces';

const {
    SELECT_COURSE,
    SELECT_DIFFICULTY,
    SELECT_QUESTION_TYPE,
    INPUT_ANSWER,
    INPUT_CHOICE,
    INPUT_CONETNT,
    INPUT_CONTENT_IMG,
    INPUT_IMG_URL,
    INPUT_SCORE,
    PREVIEW,
    ADD_CHOICES,
    FILL_QUESTION_SCORE_TIP,
    ADD_SUB_QUESTION
} = INPUT_MODULE;

@Component({})
export default class QuestionInput extends mixins(Lang) {

    public $refs!: {
        typesetElement: HTMLDivElement
    }

    public questionData: IQuestionItem = {
        questionId: 0,
        questionTypeId: 0,
        courseId: 0,
        questionContentChoice: [],
        questionScore: 1,
        questionDifficulty: 1,
        knowledgeIdList: [],
        abilityIdList: [],
        questionContent: '',
        questionSubContent: [],
        questionContentSupplement: '',
        questionAnswer: [],
        questionAnswerSupplement: '',
        questionStatus: 1,
        questionOperatorId: 0,
        questionGmtUpdate: 0,
        questionUpdateTimes: 0,
        questionGmtLastUsed: 0,
        questionUsedTimes: 0,
    }

    public subQuestions: string[] = [];

    public choices: string[] = createArray(choicesBaseNum);

    public addChoice() {
        this.choices.push('');
    }

    public addSubQuesContent() {
        this.subQuestions.push('');
    }

    public deleteSubContents(index: number) {
        this.subQuestions.splice(index, 1);
    }

    public clearPreview() {
        Array.from(this.$refs.typesetElement.children).forEach(child => {
            child.innerHTML = '';
        })
    }

    public renderCourseType() {
        return (
            <el-form-item label={this.t(SELECT_COURSE)}>
                <el-select v-model={this.questionData.courseId}>
                    <el-option 
                                label='计算机通信与网络'
                                value='计算机通信与网络'>
                            </el-option>
                </el-select>
            </el-form-item>
        )
    }

    public renderQuestionType() {
        return (
            <el-form-item label={this.t(SELECT_QUESTION_TYPE)}>
                <el-select v-model={this.questionData.questionTypeId}>
                    {
                        [...getQuestionTypes()].map(questionTypeItem => (
                            <el-option 
                                label={questionTypeItem.name} 
                                value={questionTypeItem.id}>
                            </el-option>
                        ))
                    }
                </el-select>
            </el-form-item>
        )
    }

    public renderQuestionDifficulty() {
        return (
            <el-form-item class='question-difficulty' label={this.t(SELECT_DIFFICULTY)}>
                <el-rate v-model={this.questionData.questionDifficulty}></el-rate>
            </el-form-item>
        )
    }

    /**
     * 渲染试题内容 && 试题小问 输入框
     */
    public renderQuestionContent() {
        const { questionTypeId: type, questionSubContent: subQuestions } = this.questionData;
        return (
            <div class='content-wrapper'>
                <el-form-item class='question-flex flex-wrap' label={this.t(INPUT_CONETNT)}>
                    <el-input
                        autosize={{ minRows: 2 }}
                        type={InputType.TEXTAREA}
                        placeholder={this.t(INPUT_CONETNT)}
                        v-model={this.questionData.questionContent}
                    />
                    <el-tooltip effect="dark" placement="top-end">
                        <div slot='content'>
                            1. 题干如有公式请用Latex语法对其进行编辑，例如：X_i
                            <br/><br/>
                            2. 填空题请将空行转为中文或者英文问号格式，即 ‘？’ 或者 ‘?’
                        </div>
                        <i class='iconfont icon-tishi'></i>
                    </el-tooltip>
                </el-form-item>
                <el-form-item class='question-flex' label={this.t(INPUT_CONTENT_IMG)}>
                    <el-input
                        placeholder={this.t(INPUT_IMG_URL)}
                        v-model={this.questionData.questionContentSupplement}
                    />
                </el-form-item>
                {
                    isSubjective(type) ?
                    <el-form-item class='sub-questions'>
                        {
                            this.subQuestions.map((item, index) => (
                                <div class='fragment-flex'>
                                    <el-input
                                        placeholder={'请输入第' + (index + 1) + '小问'}
                                        v-model={subQuestions[index]}
                                    />
                                    <i 
                                        class='iconfont icon-jianhao'
                                        onclick={ () => { this.deleteSubContents(index) } }
                                    />
                                </div>
                            ))
                        }
                        <el-button 
                            type={ButtonType.PRIMARY} 
                            size={ButtonSize.MINI}
                            onclick={ () => { this.addSubQuesContent() }}
                        >添加试题小问</el-button>
                    </el-form-item>
                    : null
                }
            </div>
        )
    }

    /**
     * 选择题渲染选项输入框
     */
    public renderQuestionChoices() {
        const { questionContentChoice } = this.questionData;
        return isSelectQues(this.questionData.questionTypeId) ?
        <el-form-item class='question-options' label={this.t(INPUT_CHOICE)}>
            {
                this.choices.map((choice, index) => (
                    <el-input
                        placeholder={`选项${Alphabet[index]}`}
                        v-model={questionContentChoice[index]}
                    />
                ))
            }
            <el-button 
                type={ButtonType.PRIMARY} 
                size={ButtonSize.MINI}
                onclick={ this.addChoice }
            >{ this.t(ADD_CHOICES) }</el-button>
        </el-form-item>
        : null
    }

    /**
     * 渲染答案框
     */
    public renderQuestionAnswers() {
        return <el-form-item label={this.t(INPUT_ANSWER)} class='question-answers'>
            <el-tooltip effect="dark" placement="top-end">
                <div slot='content'>
                    1. 填空题将每一空的答案填入对应的输入框中
                    <br/><br/>
                    2. 客观题将每一小问的答案填入输入框中
                </div>
                <i class='iconfont icon-tishi'></i>
            </el-tooltip>
            { this.answerTemplate() }
        </el-form-item>
    }

    public answerTemplate() {
        const { questionTypeId: type, questionContent: content } = this.questionData;
        // 主观题和填空题需要渲染多个答案框
        if(isSubjective(type) || isFillQues(type)) {
            const loopArr = isSubjective(type) ? [...this.subQuestions] : content.match(RegMap.fillBlankRules);
            return loopArr?.map((item, index) => (
                <el-input placeholder={this.t(INPUT_ANSWER) + (index + 1)} v-model={this.questionData.questionAnswer[index]} />
            ))
        }
        return <el-input placeholder={this.t(INPUT_ANSWER)} v-model={this.questionData.questionAnswer[0]} />
    }

    public renderQuestionScore() {
        return <el-form-item class='question-flex' label={this.t(INPUT_SCORE)}>
            <el-input 
                placeholder={this.t(INPUT_SCORE)}
                v-model={this.questionData.questionScore}
            />
            <el-tooltip 
                effect="dark" 
                placement="top-end"
                content={this.t(FILL_QUESTION_SCORE_TIP)}
            >
                <i class='iconfont icon-tishi'></i>
            </el-tooltip>
        </el-form-item>
    }

    public renderQuestion() {
        return [
            this.renderCourseType(),
            this.renderQuestionType(),
            this.renderQuestionDifficulty(),
            this.renderQuestionScore(),
            this.renderQuestionContent(),
            this.renderQuestionChoices(),
            this.renderQuestionAnswers(),
        ]
    }

    public prewViewQuestionContent() {
        this.clearPreview();
        let content = '';
        const payload: any = {};
        const { questionTypeId: type, questionContent } = this.questionData;
        if(isFillQues(type)) {
            // 填空题替换 ？ 为 _____
            content = questionContent.replace(RegMap.fillBlankRules, '\\_\\_\\_\\_\\_\\_')
        }
        const { typesetElement } = this.$refs;
        const children = Array.from(typesetElement.children)
        const nodeKeyClass = children.map(child => {
            const key = (child.getAttribute('class') as string)
            .replace(keyRenderClass, (substring: string, ...args: any[]) => {
                return args[1];
            })
            return {
                key: (key as valueof<typeof PreviewContentKey>),
                node: child,
                content: isFillQues(type) && key === 'questionContent' ? content : this.questionData[key]
            }
        });
        renderQuestionContents({
            type,
            value: nodeKeyClass
        })
    }

    render(h: CreateElement) {
        return (
            <div class='question-input'>
                <div class='question-input__container'>
                    <div class='question-input__editor'>
                        <div class='title'>
                            <span>新建试题</span>
                        </div>
                        <el-form class='editor-form'>
                            {
                                this.renderQuestion()
                            }
                        </el-form>
                        <div class='question-input__bottom'>
                            <el-button 
                                type={ButtonType.PRIMARY}
                                size={ButtonSize.MEDIUM}
                                onclick={() => { this.prewViewQuestionContent() }}
                            >{ this.t(PREVIEW) }</el-button>
                        </div>
                    </div>
                    <div class='question-input__preview'>
                        <div class='title'>
                            <span>{ this.t(PREVIEW) }</span>
                        </div>
                        <div class='preview__content' ref='typesetElement'>
                            {/* 题干 */}
                            <div class='preview__questionContent-content'></div>
                            {/* 选择题选项 */}
                            <div class='preview__questionContentChoice-content'></div>
                            {/* 小问（主观题） */}
                            <div class='preview__questionSubContent-content'></div>
                            {/* 试题内容补充（图片链接） */}
                            <div class='preview__questionContentSupplement-content'></div>
                            {/* 答案 */}
                            <div class='preview__questionAnswer-content'></div>
                            {/* 答案补充（图片链接） */}
                            <div class='preview__questionAnswerSupplement-content'></div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}