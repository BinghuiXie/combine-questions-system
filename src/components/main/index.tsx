import { CreateElement } from 'vue';
import { Component, Vue } from 'vue-property-decorator';
import { mixins } from 'vue-class-component';
import Lang from '@/lang/lang';
import Header from '@/components/common/header'
import Card from '@/components/common/card';
import { modules } from '@/common/constants';

import './style.scss'
import { isArray } from '@/utlis';

@Component({
    components: {
        Header,
        Card
    }
})
export default class Portal extends mixins(Lang) {

    renderCards(h: CreateElement) {
        return isArray(modules) && modules.map((module, index) => {
            return h(this.$options.components!['Card'], {
                props: { 
                    imgUrl: module.imgUrl,
                    identityLabel: module.identityLabel,
                    title: module.title,
                    intro: module.intro
                 }
            })
        })
    }

    render(h: CreateElement) {
        return (
            <el-container class='el-portal-container is-vertical'>
                <Header></Header>
                <el-main class='el-portal-main'>
                    {
                        this.renderCards(h)
                    }
                </el-main>
            </el-container>
        )
    }
}