const passwordFilter = (password: string) => {
    const regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    return regexPassword.test(String(password));
};

export default passwordFilter;