const regexpRules = {
    employeeId: /^[0-9]{8}$/,
    studentId: /^[A-Z][0-9]{8}$/,
    password: /^[0-9]+[A-z]{1,}[a-z]+/,
    phone: /^1[3-9]\d{9}$/,
    authCode: /^[0-9]{6}$/
}

export default regexpRules;