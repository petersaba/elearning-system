export const disableRefresh = (e) => {
    e.preventDefault();
    console.log('hello world');
}

export const checkValidEmail = (email) => {
    const pattern = /^.{3,}@[^\W_]{3,}\.[^\W_]{2,}$/;
    return checkPattern(email, pattern);
}

export const checkPattern = (value, pattern) => {
    return value.search(pattern);
}