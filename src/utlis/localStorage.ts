/**
 * @description: 封装 localStorage
 * 
 */

import { Base64 } from 'js-base64';

 import { DEFAULT_EXPIRE_TIME } from '@/common/constants';
 import { IStorageItem } from '@/interfaces';

 class LocalStorage {
     public set(key: string, value: any, expires: number = DEFAULT_EXPIRE_TIME) {
         const obj: IStorageItem = {
             key,
             value,
             startTime: new Date().getTime(),
             expires
         }
         localStorage.setItem(obj.key, Base64.encode(JSON.stringify(obj)));
     }

     public get(key: string) {
         // 数字，数组，boolean，object 需要 parse 一下返回，String 直接返回
        const resStr = localStorage.getItem(key);
        if(!resStr) {
            return false;
        }
        const resObj: IStorageItem = JSON.parse(Base64.decode(resStr));
        if(resObj && resObj.startTime) {
            const currentDate = new Date().getTime();
            if(currentDate - resObj.startTime > resObj.expires) {
                this.delete(key);
                return false;
            }
        }
        return resObj.value;
     }

     public delete(key: string) {
        localStorage.removeItem(key);
     }

     public clear() {
         localStorage.clear();
     }
 }

 export default new LocalStorage();