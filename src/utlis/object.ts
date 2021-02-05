import { IPickPayload, IPickObject } from '@/interfaces/utlis.interface';
export const deepclone = <T = any>(value: T): T => {
    return JSON.parse(JSON.stringify(value));
}
