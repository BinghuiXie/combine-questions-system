import { Component, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import './style.scss';

@Component({})
export default class TransferCard extends mixins(Lang) {

    @Prop({ default: 'source' })
    public transferType!: 'source' | 'target';

    @Prop({ default: 'Source' })
    public sourceTitle!: string;

    @Prop({ default: 'Target' })
    public targetTitle!: string;

    render() {
        return (
            <div class='transfer-card'>
                <div class='transfer-card__header'>
                    { this.transferType === 'source' ? this.sourceTitle : this.targetTitle }
                </div>
                <div class='transfer-card__content'>aa</div>
            </div>
        )
    }
}
