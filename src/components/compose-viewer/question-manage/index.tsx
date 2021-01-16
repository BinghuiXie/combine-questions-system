import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';

@Component({

})
export default class QuestionManage extends mixins(Lang) {
    render() {
        return (
            <div>question-manage</div>
        )
    }
}