import { Component } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';

import './style.scss';

@Component
export default class Header extends mixins(Lang) {


    render() {
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
                            <li class='el-header__right-item'>
                                <el-dropdown>
                                    <span class='el-dropdown-link'>
                                        <i class='iconfont icon-touxiang1'></i>
                                    </span>
                                    <el-dropdown-menu slot='dropdown'>
                                        <el-dropdown-item>
                                            <i class='iconfont icon-gerenzhongxin-zhong'></i>
                                            <span>个人中心</span>
                                        </el-dropdown-item>
                                        <el-dropdown-item>
                                            <i class='iconfont icon-tuichudenglu'></i>
                                            <span>退出登录</span>
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </li>
                        </ul>
                    </div>
                </div>
            </el-header>
        )
    }
}