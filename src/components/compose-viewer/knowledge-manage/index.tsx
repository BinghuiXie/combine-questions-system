import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import './style.scss';

@Component({})
export default class KnowledgeManage extends mixins(Lang) {
    public render() {
        return (
            <div class='knowledge-manage'>
                <div class='knowledge-manage__container'>
                    <router-view></router-view>
                </div>
            </div>
        )
    }
}
