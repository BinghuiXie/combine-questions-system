import { checkAbilityContent, checkAbilityType } from './rules';

export const AbilityRules = {
    content: [
        { require: true, validator: checkAbilityContent, trigger: 'blur' }
    ],
    abilityType: [
        { require: true, validator: checkAbilityType, trigger: 'blur' }
    ]
}