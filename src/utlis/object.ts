import { IPickPayload, IPickObject } from '@/interfaces/utlis.interface';
export const deepclone = (value: any) => {
    return JSON.parse(JSON.stringify(value));
}

export const pick = (pickObj: any, pickArr: IPickPayload) => {
    const res = pickArr.reduce((prev: any, curv: string | IPickObject) => {
        if(typeof curv === 'string') {
            prev[curv] = pickObj[curv];
        } else {
            prev[curv.name] = pickObj[curv.pick]
        }
    }, {})
    console.log(res);
}