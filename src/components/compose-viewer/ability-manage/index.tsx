import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';

@Component({})
export default class AbilityManage extends mixins(Lang) {
    public render() {
        return (
            <div class='ability-manage'>
                <div class='ability-manage__container'>
                    <router-view></router-view>
                </div>
            </div>
        )
    }
}