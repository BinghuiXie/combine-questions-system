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
                        <i class='iconfont icon-icon_xinyong_xianxing_jijin-'></i>
                        <span class='el-header__title'>智能组卷系统</span>
                    </div>
                    <div class='el-header__right'>
                        <ul class="el-header__right-list">
                            <li class="el-header__right-item">首页</li>
                            <li class="el-header__right-item">XXXX</li>
                            <li class="el-header__right-item">XXXX</li>
                            <li class="el-header__right-item">个人中心</li>
                        </ul>
                    </div>
                </div>
            </el-header>
        )
    }
}