export enum HTTPCODE {
    SUCCESS = 200,
    USER_NOT_EXIST = 10000,
    USER_EXIST = 10001,
    PHONE_NUMBER_EXISTED = 10002,
    SMS_NULL = 10003,
    SMS_CODE_ERROR = 10004
}

export enum HTTPCODEMESSGAE {
    '请求成功' = 200,
    '用户不存在' = 10000,
    '用户已存在' = 10001,
    '手机号码已存在' = 10002,
    '验证码不存在' = 10003,
    '验证码错误' = 10004
}