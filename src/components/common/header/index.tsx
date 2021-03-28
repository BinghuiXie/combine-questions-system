import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import { headerList } from '@/common/mock/common/header-list';
import { HeaderItemType } from '@/interfaces/common';

import './style.scss';
import { CreateElement } from 'vue/types/umd';

@Component
export default class Header extends mixins(Lang) {

    public handleHeaderItemClick(selfId: number | string, parentId?: number | string) {
        selfId = Number(selfId);
        parentId = Number(parentId);
        if(!parentId) {
            const path = headerList.find(item => item.id === selfId)!.path;
            this.$router.push({
                path
            })
        } else {
            const parentItem = headerList.find(item => item.id === parentId)!;
            const childItem = parentItem.children!.find(child => child.id === selfId)!;
            this.$router.push({
                path: childItem.path
            })
        }
    }

    public handleCommand(command: string) {
        const [ selfId, parentId ] = command.split('-');
        this.handleHeaderItemClick(selfId, parentId);
    }

    public renderHeaderList() {
        return headerList.map(headerItem => {
            if(headerItem.type === HeaderItemType.TEXT) {
                return (
                    <li
                        class='el-header__right-item'
                        onclick={ () => { this.handleHeaderItemClick(headerItem.id) }}
                    >{ headerItem.name }</li>
                )
            }
            return (
                <li class='el-header__right-item'>
                    <el-dropdown onCommand={ this.handleCommand }>
                        <span class='el-dropdown-link'>
                            <i class={['iconfont', headerItem.icon]}></i>
                        </span>
                        <el-dropdown-menu>
                            {
                                headerItem.children?.map(child => (
                                    <el-dropdown-item command={child.id + '-' + headerItem.id}>
                                        <i class={['iconfont', child.icon]}></i>
                                        <span>
                                            { child.name }
                                        </span>
                                    </el-dropdown-item>
                                ))
                            }
                        </el-dropdown-menu>
                    </el-dropdown>
                </li>
            )
        });
    }

    render(h: CreateElement) {
        return (
            <el-header class='el-header__common'>
                <div class='el-header__common-content'>
                    <div class='el-header__left'>
                        <div class="icon">
                            <i class='iconfont icon-icon_xinyong_xianxing_jijin-'></i>
                        </div>
                        <div class='el-header__title'>
                            <span class='el-header__title-chinese'>智能组卷系统</span>
                        </div>
                    </div>
                    <div class='el-header__right'>
                        <ul class="el-header__right-list">
                            {
                                this.renderHeaderList()
                            }
                        </ul>
                    </div>
                </div>
            </el-header>
        )
    }
}
