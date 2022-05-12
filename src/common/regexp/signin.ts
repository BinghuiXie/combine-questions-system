const regexpRules = {
    employeeId: /^[0-9]{8}$/,
    password: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])/,
    phone: /^1[3-9]\d{9}$/,
    authCode: /^[0-9]{6}$/
}

export default regexpRules;