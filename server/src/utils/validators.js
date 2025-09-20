function isValidUsername(username) {
    if (typeof username !== 'string') return false;
    if (username.length < 3 || username.length > 30) return false;
    const regex = /^[a-zA-Z][a-zA-Z0-9_-]*$/;
    return regex.test(username);
}

module.exports = { isValidUsername };