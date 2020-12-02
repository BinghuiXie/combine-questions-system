/**
 * rgba 颜色接口
 */
export interface IRGBAColor<T> {
    r: T;
    g: T;
    b: T;
    a: T;
}

export interface ILine {
    startY: number;
    length: number;
    amplitude: number;
    frequency: number;
}