import { Vue, Component } from 'vue-property-decorator'
import './reset.scss'
import './fonts/iconfont.css'

import Signin from './components/signin/index';

@Component({
    components: {
        Signin
    }
})
export default class App extends Vue {
    render() {
        return (
            <div id='app'>
                <Signin/>      
            </div>
        )
    }
}