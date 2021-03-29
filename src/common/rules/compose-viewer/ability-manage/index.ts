import { checkAbilityContent } from './rules';

export const AbilityRules = {
    content: [
        { require: true, validator: checkAbilityContent, trigger: 'blur' }
    ]
}