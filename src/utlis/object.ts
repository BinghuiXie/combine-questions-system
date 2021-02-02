import { IPickPayload, IPickObject } from '@/interfaces/utlis.interface';
export const deepclone = (value: any) => {
    return JSON.parse(JSON.stringify(value));
}
