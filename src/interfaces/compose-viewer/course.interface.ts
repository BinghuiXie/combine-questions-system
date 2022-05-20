import { valueof } from '@/utlis/type';

export interface ICourseItem {
    courseId: number;
    courseName: string;
   gmtCreat:null;
   gmtModified:null;
}

export enum CourseType {
    REQUIRE,
    OPTIONAL
}

export interface IChapterItem {
    chapterId: number;
    courseId: number;
    content: string;
    sections: ISectionItem[];
    importance: number;
}

export interface ISectionItem {
    sectionId: number;
    courseId: number;
    content: string;
    chapterId: number;
}