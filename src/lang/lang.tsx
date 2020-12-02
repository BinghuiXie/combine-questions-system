import { Component, Vue } from 'vue-property-decorator';
import { translate } from './index';

@Component
export default class Lang extends Vue {
    public t(path: string) {
        return translate.call(this, path);
    }
}