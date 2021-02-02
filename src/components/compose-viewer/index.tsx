import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import { teacherFunctionList } from '@/common/mock/compose-viewer/function-list';
import { COMPOSE_VIEWER_BASE_ROUTE } from '@/common/constants';

import './style.scss';
import { IFunctionItem } from '@/interfaces/compose-viewer';

@Component({

})
export default class ComposeViewer extends mixins(Lang) {


    public isFold: boolean = false;

    public activeFunctionId: number = 0;

    public handleOperateAside() {
        this.isFold = !this.isFold;
    }

    public handleSwitchFunctionItem(id: number, parentId?: number) {
        if(parentId) {
            // 点击的是子 menu
            const parentItem = teacherFunctionList.find(item => item.id === parentId);
            if(parentItem && parentItem.children) {
                const childItem = parentItem?.children.find(child => child.id === id);
                this.$router.push({
                    path: this.$route.fullPath + '/' + childItem?.path
                })
            }
        } else {
            this.activeFunctionId = id;
            const functionItem = teacherFunctionList.find(item => item.id === id);
            if(functionItem) {
                const path = COMPOSE_VIEWER_BASE_ROUTE + functionItem.path;
                if(!parentId) {
                    // 点击的不是子menu
                    this.$router.push({
                        path
                    });
                } 
            }
        }
    }

    public renderMenu() {
        return teacherFunctionList.map(functionItem => {
            return (
                functionItem.children ?
                this.renderMenuChildren(functionItem, functionItem.children)
                : <el-menu-item 
                    onclick={() => { this.handleSwitchFunctionItem(functionItem.id) }}
                    class={['function-item', this.activeFunctionId === functionItem.id ? 'function-item-active' : null]}
                    key={functionItem.id}
                >
                    <i class={['iconfont', functionItem.icon]}></i>
                    <span>{ this.t(functionItem.func) }</span>
                </el-menu-item>
            )
        })
    }

    public renderMenuChildren(parentItem: IFunctionItem, children: IFunctionItem[]) {
        return (
            <el-submenu
                class={['function-item', this.activeFunctionId === parentItem.id ? 'function-item-active' : null]} 
                index={String(parentItem.id)}
            >
                <template slot="title">
                    <div
                        onclick={() => { this.handleSwitchFunctionItem(parentItem.id) }}
                    >
                        <i class={['iconfont', parentItem.icon]}></i>
                        <span>{ this.t(parentItem.func) }</span>
                    </div>
                    
                </template>
                <el-menu-item-group>
                    {
                        children.map(child => (
                            <el-menu-item
                                onclick={ () => { this.handleSwitchFunctionItem(child.id, parentItem.id) } }
                            >
                                <i class={['iconfont', child.icon]}></i>
                                <span>{ this.t(child.func) }</span>
                            </el-menu-item>
                        ))
                    }
                </el-menu-item-group>
            </el-submenu>
        )
    }

    public mounted() {
        const activeFunc = teacherFunctionList.find(item => COMPOSE_VIEWER_BASE_ROUTE + item.path === this.$route.fullPath)
        this.activeFunctionId = activeFunc ? activeFunc.id : 0;
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
                        <el-menu class='function-list'>
                            {
                                this.renderMenu()
                            }
                        </el-menu>
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