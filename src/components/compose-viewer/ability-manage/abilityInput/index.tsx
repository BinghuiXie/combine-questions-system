import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';

@Component({})
export default class AbilityInput extends mixins(Lang) {
    public render() {
        return (
            <div>ability-input</div>
        )
    }
}