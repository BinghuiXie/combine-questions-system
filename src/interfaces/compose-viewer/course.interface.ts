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