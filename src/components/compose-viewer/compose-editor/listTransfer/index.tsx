import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import TransferCard from './transferCard';
import './style.scss';

@Component({
    components: {
        TransferCard
    }
})
export default class ListTransfer extends mixins(Lang) {
    render() {
        return (
            <div class='list-transfer'>
                <div class='list-transfer-container'>
                    <div class='list-transfer-container__source'>
                        <TransferCard/>
                    </div>
                    <div class='list-transfer-container__target'>
                        <TransferCard/>
                    </div>
                </div>
            </div>
        )
    }
}