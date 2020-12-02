export const isValidate = (value: string, rules: RegExp) => {
    return rules.test(value);
}