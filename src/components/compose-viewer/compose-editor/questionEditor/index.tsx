import { Component, Emit, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import { EditorIndexMap } from '@/interfaces/compose-viewer';
import ListTransfer from '../listTransfer';

import './style.scss';

@Component({
    components: {
        ListTransfer
    }
})
export default class QuestionEditor extends mixins(Lang) {

    @Prop()
    public title!: keyof typeof EditorIndexMap;

    render() {
        return (
            <div class='question-editor'>
                <div class='question-editor__title'>
                    { this.title }
                </div>
                <div class='question-editor__content'>
                    <ListTransfer/>
                </div>
            </div>
        )
    }
}