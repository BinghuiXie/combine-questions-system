import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';

@Component({

})
export default class PaperManage extends mixins(Lang) {
    render() {
        return (
            <div>paper-manage</div>
        )
    }
}