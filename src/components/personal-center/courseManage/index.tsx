import Lang from '@/lang/lang';
import { mixins } from 'vue-class-component';
import { Component } from 'vue-property-decorator';

@Component({})
export default class courseManage extends mixins(Lang) {
    render() {
        return (
            <div>课程管理</div>
        )
    }
}