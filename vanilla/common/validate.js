const validateRegisterFormData = formData => {
    const errors = [];
    const {username, password, confirmPassword} = formData;

    if (!username || username.length === 0) {
        errors.push('Имя должно быть заполнено.');
    }
    if (!password || password.length === 0) {
        errors.push('Пароль должен быть заполнен.');
    }
    if (!password || password.length === 0) {
        errors.push('Повтор пароля должен быть заполнен.');
    }
    if (confirmPassword !== password) {
        errors.push('Пароль и его повтор должны совпадать.');
    }

    return errors.length ? errors : null;
};

module.exports = {validateRegisterFormData};