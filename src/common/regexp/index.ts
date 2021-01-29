import regexpRules from './signin';
import * as editorRules from './editor';

const RegMap = {
    ...regexpRules,
    ...editorRules
}

export default RegMap;