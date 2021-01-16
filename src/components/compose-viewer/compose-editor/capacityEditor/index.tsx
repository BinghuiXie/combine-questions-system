import { Component, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import { EditorIndexMap } from '@/interfaces/compose-viewer';

@Component({

})
export default class CapacityEditor extends mixins(Lang) {


    @Prop()
    public title!: keyof typeof EditorIndexMap;

    render() {
        return (
            <div class='capacity-editor'>
                <div class='capacity-editor__title'>
                    { this.title }
                </div>
            </div>
        )
    }
}