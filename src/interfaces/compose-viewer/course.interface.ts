import { valueof } from '@/utlis/type';

export interface ICourseItem {
    courseId: number;
    name: string;
    courseCode: string;
    credits: string;
    teacher: Array<number>;
    courseTime: string;
    type: valueof<typeof CourseType>;
    coursePlace: string; // 上课地点
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