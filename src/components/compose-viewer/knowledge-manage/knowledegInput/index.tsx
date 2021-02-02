import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';

@Component({})
export default class KnowledgeInput extends mixins(Lang) {
    public render() {
        return (
            <div>
                知识点录入
            </div>
        )
    }
}