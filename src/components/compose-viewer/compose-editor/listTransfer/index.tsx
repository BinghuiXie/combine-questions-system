import { CreateElement } from 'vue';
import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import TransferCard from './transferCard';
import './style.scss';
import {
    QuestionTypeMap,
    ITransferDataItem
} from '@/interfaces/compose-viewer';

@Component({
    components: {
        TransferCard
    }
})
export default class ListTransfer extends mixins(Lang) {

    public transferSourceData: ITransferDataItem[] = [];

    public transferTargetData: ITransferDataItem[] = [];

    public renderTransferCard(h: CreateElement, config: any) {
        return h(this.$options.components!['TransferCard'], {
            props: {
                transferType: config.type,
                title: config.title,
                dataSource: config.type === 'source' ? this.transferSourceData : this.transferTargetData
            },
            on: {
                transferItemDelete: this.deleteTransferItem,
                transferItemAdd: this.addTransferItem,
                transferItemEdit: this.editTransferItem,
            }
        })
    }

    public renderEditQuestionDialog(questionType: number) {
        console.log(questionType);
    }

    public deleteTransferItem(index: number) {
        this.transferTargetData.splice(index, 1);
    }

    public addTransferItem(index: number) {
        this.transferTargetData.push(this.transferSourceData[index]);
    }

    public editTransferItem(index: number) {
        // TODO：TransferItem 编辑
        const transferQuestion = this.transferTargetData[index];
        this.renderEditQuestionDialog(transferQuestion.type);
    }

    mounted() {
        for(let type in QuestionTypeMap) {
            const isValue = parseInt(type, 10) >= 0;
            if(isValue) {
                this.transferSourceData.push({
                    type: parseInt(type),
                    name: QuestionTypeMap[type]
                })
            }
        }
    }

    render(h: CreateElement) {
        return (
            <div class='list-transfer'>
                <div class='list-transfer-container'>
                    <div class='list-transfer-container__source'>
                        {
                            this.renderTransferCard(h, {
                                    type: 'source',
                                    title: '试题类型列表'
                                }
                            )
                        }
                    </div>
                    <div class='list-transfer-container__target'>
                        {
                            this.renderTransferCard( h, {
                                    type: 'target',
                                    title: '目标试题类型'
                                }
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}