import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import './style.scss';

@Component({})
export default class KnowledgeInput extends mixins(Lang) {
    public render() {
        return (
            <div class='knowledge-input'>
                <el-tabs>
                    <el-tab-pane label="单个录入" name="single">单个录入</el-tab-pane>
                    <el-tab-pane label="批量录入" name="batch">批量录入</el-tab-pane>
                </el-tabs>
            </div>
        )
    }
}
