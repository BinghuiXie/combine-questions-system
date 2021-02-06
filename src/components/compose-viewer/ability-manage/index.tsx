import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';

@Component({})
export default class AbilityManage extends mixins(Lang) {
    public render() {
        return (
            <div>
                ability-manage
                <router-view></router-view>
            </div>
        )
    }
}