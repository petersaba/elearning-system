const disableRefresh = (e) => {
    e.preventDefault();
}

const checkValidEmail = (email) => {
    const pattern = /^.{3,}@[^\W_]{3,}\.[^\W_]{2,}$/;
    return utils.checkPattern(email, pattern);
}

const checkPattern = (value, pattern) => {
    return value.search(pattern);
}

export default {disableRefresh, checkPattern, checkValidEmail};