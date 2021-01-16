import { Component, Prop } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';

@Component({})
export default class OperationDialog extends mixins(Lang) {

    @Prop({ default: '标题' })
    public title!: string;

    @Prop({ default: false })
    public dialogVisible!: boolean;

    @Prop({ default: [] })
    public dataSource!: any[];

    @Prop({ default: {} }) // TODO 补充 config
    public config!: { [ key: string ]: any }

    public get model() {
        return [ ...this.dataSource ]
    }

    render() {
        return (
            <el-dialog 
                title={ this.title }
                visible={ this.dialogVisible }
            >
                <el-form
                    { ...{ props: { model: this.model } } }
                >
                    {
                        this.model.map(item => {
                            return (
                                <el-form-item label={ item.label }>

                                </el-form-item>
                            )
                        })
                    }
                </el-form>
            </el-dialog>
        )
    }
}