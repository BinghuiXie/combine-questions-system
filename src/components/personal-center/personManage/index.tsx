import Lang from '@/lang/lang';
import { mixins } from 'vue-class-component';
import { Component } from 'vue-property-decorator';

@Component({})
export default class personManage extends mixins(Lang) {
    render() {
        return (
            <div>管理</div>
        )
    }
}