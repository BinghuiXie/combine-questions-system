import { Vue, Component } from 'vue-property-decorator'
import Header from '@/components/common/header';
import './reset.scss'
import './fonts/iconfont.css'

@Component
export default class App extends Vue {

    renderComponent() {
        const isSignin = this.$route.fullPath === '/signin';
        const isMain = this.$route.fullPath === '/main';
        return (
            <div id='app'>
                {
                    isSignin || isMain
                    ? null
                    : <Header></Header>
                }
                <router-view></router-view>
            </div>
        )
    }

    render() {
        return this.renderComponent();
    }
}