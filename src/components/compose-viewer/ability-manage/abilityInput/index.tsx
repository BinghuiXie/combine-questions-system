import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import InputTable from '@/components/common/inputTable';
import Lang from '@/lang/lang';
import { ColumnTemType, ITableConfig } from '@/interfaces/common';
import { INPUT_MODULE } from '@/common/constants';
import { chapterMockData } from '@/common/mock/compose-viewer/chapter-list';
import './style.scss';

const {
    INPUT_CONETNT,
    SELECT_CHAPTER,
    SELECT_SECTION,
} = INPUT_MODULE;

@Component({
    components: {
        InputTable
    }
})
export default class AbilityInput extends mixins(Lang) {

    

    public render() {
        return (
            <div class='ability-input'>
            </div>
        )
    }
}