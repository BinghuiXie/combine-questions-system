import { Component, Vue } from 'vue-property-decorator';
import Header from '@/components/common/header';

import './style.scss';

@Component({
    components: {
        Header
    }
})
export default class Main extends Vue {

    enterSystem() {
        
    }

    render() {
        return (
            <div class='main-container'>
                <div class='main-container__left-bg'></div>
                <div class='main-container__right-bg'></div>
                <div class='main-container__content'>
                    <div class='main-container__inner-circle'>
                        <div class='logo'>
                        <i class='iconfont icon-icon_xinyong_xianxing_jijin-'></i>
                        </div>
                    </div>
                    <div class='main-container__info'>
                        <div class='title'>南邮智能组卷系统</div>
                        <div class='description'>基于能力体系和知识体系的试题库及智能组卷系统</div>
                        <div class='button'>
                            <el-button 
                                type='primary'
                                onclick={this.enterSystem}
                            >立即使用</el-button>
                            <el-button type='primary'>关于我们</el-button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}