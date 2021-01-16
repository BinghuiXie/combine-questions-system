export const deepclone = (value: any) => {
    return JSON.parse(JSON.stringify(value));
}