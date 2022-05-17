import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import { personalFunctionList } from '@/common/mock/personal-center/function-list';
import { PERSONAL_CENTER_BASE_ROUTE } from '@/common/constants';
import { IFunctionItem } from '@/interfaces/compose-viewer';

import './style.scss';

@Component({

})
export default class personalViewer extends mixins(Lang) {


    public isFold: boolean = false;

    public activeFunctionId: number = 0;

    public activeSubFuncId: number = -1;

    public handleOperateAside() {
        this.isFold = !this.isFold;
    }

    public handleSwitchFunctionItem(id: number, parentId?: number) {
        if(parentId) {
            // 点击的是子 menu
            this.activeSubFuncId = id;
            const parentItem = personalFunctionList.find(item => item.id === parentId);
            if(parentItem && parentItem.children) {
                const childItem = parentItem?.children.find(child => child.id === id);
                const path = PERSONAL_CENTER_BASE_ROUTE + parentItem.path + '/' + childItem?.path;
                this.$router.push({
                    path
                })
            }
        } else {
            this.activeSubFuncId = -1;
            this.activeFunctionId = id;
            const functionItem = personalFunctionList.find(item => item.id === id);
            if(functionItem) {
                const path = PERSONAL_CENTER_BASE_ROUTE + functionItem.path;
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
        return personalFunctionList.map(functionItem => {
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
                                class={this.activeSubFuncId === child.id ? 'sub-function-active' : null}
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

    public renderFunctionTitle() {
        const functionItem = personalFunctionList[this.activeFunctionId];
        let subTitle = '';
        if(functionItem.children && this.activeSubFuncId !== -1) {
            const activeChild = functionItem.children.find(child => child.id === this.activeSubFuncId)
            if(activeChild) {
                subTitle = activeChild.func;
            }
        }
        return [
            <el-breadcrumb-item>
                { this.t(functionItem.func) }
            </el-breadcrumb-item>,
            subTitle ?
            <el-breadcrumb-item>
                { this.t(subTitle) }
            </el-breadcrumb-item>
            : null
        ];
    }

    public mounted() {
        const { fullPath } = this.$route;
        let pathArr = fullPath.split('/');
        // 根据 / 分割后去掉数组最开始的空值
        pathArr.shift();
        const activeFunc = personalFunctionList.find(item => item.path === pathArr[1])
        if(pathArr.length === 3 && activeFunc?.children) {
            // 当前路由定位在子功能
            const subFunc = activeFunc?.children.find(child => child.path === pathArr[2])
            this.activeSubFuncId = subFunc ? subFunc.id : -1;
        }
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
                        <el-breadcrumb 
                            class='main-area__function-title'
                            separator='/'
                        >
                            { this.renderFunctionTitle }
                        </el-breadcrumb>
                        <router-view></router-view>
                    </div>
                </div>
            </div>
        )
    }
}