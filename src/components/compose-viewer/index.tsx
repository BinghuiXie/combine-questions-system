import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import { teacherFunctionList } from '../../common/mock/compose-viewer/function-list';

import './style.scss';

@Component({

})
export default class ComposeViewer extends mixins(Lang) {


    public isFold: boolean = false;

    public activeFunctionId: number = 0;

    public handleOperateAside() {
        this.isFold = !this.isFold;
    }

    public handleSwitchFunctionItem(id: number) {
        this.activeFunctionId = id;
        const functionItem = teacherFunctionList.find(item => item.id === id);
        if(functionItem) {
            const path = '/compose-viewer/' + functionItem.path;
            this.$router.push({
                path
            })
        }
    }

    render() {
        return (
            <div class='compose-viewer__container'>
                <div class='compose-viewer__container-inner'>
                    <div class={['aside-list', this.isFold ? 'aside-fold' : 'aside-spread']}>
                        <div 
                            class={['aside-operation', this.isFold ? 'aside-operation__spread' : 'aside-operation__fold']}
                            onclick={this.handleOperateAside}
                        >
                            {
                                this.isFold
                                ? <i class='iconfont icon-icon_fold icon-spread'></i>
                                : <i class='iconfont icon-icon_fold'></i>
                            }
                        </div>
                        <div class='function-list'>
                            {
                                teacherFunctionList.map(functionItem => {
                                    return (
                                        <div 
                                            onclick={() => { this.handleSwitchFunctionItem(functionItem.id) }}
                                            class={['function-item', this.activeFunctionId === functionItem.id ? 'function-item-active' : null]} 
                                            key={functionItem.id}
                                        >
                                            <i class={['iconfont', functionItem.icon]}></i>
                                            <span>{ this.t(functionItem.func) }</span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div class='main-area'>
                        <div class='main-area__function-title'>
                            { this.t(teacherFunctionList[this.activeFunctionId].func || '') }
                        </div>
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        )
    }
}