// js/validation.js

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const registerForm = document.querySelector("#register-form");
const loginForm = document.querySelector("#login-form");

function getErrorElement(input) {
    return document.querySelector(`#${input.id}-error`);
}

function setFieldError(input, message) {
    const errorElement = getErrorElement(input);

    input.classList.add("form__input--error");
    input.setAttribute("aria-invalid", "true");

    if (errorElement) {
        errorElement.textContent = message;
    }
}

function clearFieldError(input) {
    const errorElement = getErrorElement(input);

    input.classList.remove("form__input--error");
    input.removeAttribute("aria-invalid");

    if (errorElement) {
        errorElement.textContent = "";
    }
}

function clearFormErrors(form) {
    const inputs = form.querySelectorAll(".form__input");

    inputs.forEach((input) => {
        clearFieldError(input);
    });

    const checkbox = form.querySelector(".form__checkbox");

    if (checkbox) {
        const errorElement = getErrorElement(checkbox);

        if (errorElement) {
            errorElement.textContent = "";
        }

        checkbox.removeAttribute("aria-invalid");
    }
}

function validateRequiredInput(input, message) {
    const value = input.value.trim();

    if (value === "") {
        setFieldError(input, message);
        return false;
    }

    clearFieldError(input);
    return true;
}

function validateRegisterForm() {
    let isValid = true;

    const fullName = document.querySelector("#full-name");
    const email = document.querySelector("#register-email");
    const login = document.querySelector("#register-login");
    const password = document.querySelector("#register-password");
    const passwordConfirm = document.querySelector("#register-password-confirm");
    const agreement = document.querySelector("#register-agreement");

    const fullNameValid = validateRequiredInput(
        fullName,
        "Введите ФИО."
    );

    const emailValue = email.value.trim();

    if (emailValue === "") {
        setFieldError(email, "Введите email.");
        isValid = false;
    } else if (!emailPattern.test(emailValue)) {
        setFieldError(email, "Введите корректный email.");
        isValid = false;
    } else {
        clearFieldError(email);
    }

    const loginValue = login.value.trim();

    if (loginValue === "") {
        setFieldError(login, "Введите логин.");
        isValid = false;
    } else if (loginValue.length < 4) {
        setFieldError(login, "Логин должен содержать не менее 4 символов.");
        isValid = false;
    } else {
        clearFieldError(login);
    }

    const passwordValue = password.value;

    if (passwordValue.trim() === "") {
        setFieldError(password, "Введите пароль.");
        isValid = false;
    } else if (passwordValue.length < 8) {
        setFieldError(password, "Пароль должен содержать не менее 8 символов.");
        isValid = false;
    } else {
        clearFieldError(password);
    }

    const passwordConfirmValue = passwordConfirm.value;

    if (passwordConfirmValue.trim() === "") {
        setFieldError(
            passwordConfirm,
            "Повторите пароль."
        );
        isValid = false;
    } else if (passwordConfirmValue !== passwordValue) {
        setFieldError(
            passwordConfirm,
            "Пароли не совпадают."
        );
        isValid = false;
    } else {
        clearFieldError(passwordConfirm);
    }

    if (!agreement.checked) {
        const agreementError = getErrorElement(agreement);

        agreement.setAttribute("aria-invalid", "true");

        if (agreementError) {
            agreementError.textContent =
                "Необходимо подтвердить согласие.";
        }

        isValid = false;
    } else {
        const agreementError = getErrorElement(agreement);

        agreement.removeAttribute("aria-invalid");

        if (agreementError) {
            agreementError.textContent = "";
        }
    }

    if (!fullNameValid) {
        isValid = false;
    }

    return isValid;
}

function validateLoginForm() {
    let isValid = true;

    const identity = document.querySelector("#login-identity");
    const password = document.querySelector("#login-password");

    const identityValid = validateRequiredInput(
        identity,
        "Введите email или логин."
    );

    const passwordValid = validateRequiredInput(
        password,
        "Введите пароль."
    );

    if (!identityValid) {
        isValid = false;
    }

    if (!passwordValid) {
        isValid = false;
    }

    return isValid;
}

function showSuccessMessage(form, messageId) {
    const successMessage = document.querySelector(`#${messageId}`);

    if (!successMessage) {
        return;
    }

    successMessage.textContent =
        successMessage.id === "register-success"
            ? "Регистрация прошла успешно!"
            : "Вы вошли";

    successMessage.hidden = false;
}

function hideSuccessMessage(messageId) {
    const successMessage = document.querySelector(`#${messageId}`);

    if (!successMessage) {
        return;
    }

    successMessage.hidden = true;
}

function setupInputValidation(form) {
    const inputs = form.querySelectorAll(
        ".form__input, .form__checkbox"
    );

    inputs.forEach((input) => {
        input.addEventListener("input", () => {
            clearFieldError(input);

            if (
                input.classList.contains("form__input--password") &&
                input.id === "register-password-confirm"
            ) {
                clearFieldError(input);
            }
        });

        input.addEventListener("change", () => {
            clearFieldError(input);
        });
    });
}

function setupPasswordToggles() {
    const toggleButtons = document.querySelectorAll(
        "[data-password-toggle]"
    );

    toggleButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const targetId = button.dataset.target;
            const passwordInput = document.querySelector(`#${targetId}`);

            if (!passwordInput) {
                return;
            }

            const isPasswordVisible = passwordInput.type === "text";

            passwordInput.type = isPasswordVisible
                ? "password"
                : "text";

            button.textContent = isPasswordVisible
                ? "Показать"
                : "Скрыть";
        });
    });
}

if (registerForm) {
    setupInputValidation(registerForm);

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        hideSuccessMessage("register-success");
        clearFormErrors(registerForm);

        const isValid = validateRegisterForm();

        if (!isValid) {
            return;
        }

        showSuccessMessage(
            registerForm,
            "register-success"
        );

        registerForm.reset();

        const passwordInputs = registerForm.querySelectorAll(
            ".form__input--password"
        );

        passwordInputs.forEach((input) => {
            input.type = "password";
        });

        const toggleButtons = registerForm.querySelectorAll(
            "[data-password-toggle]"
        );

        toggleButtons.forEach((button) => {
            button.textContent = "Показать";
        });
    });
}

if (loginForm) {
    setupInputValidation(loginForm);

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        hideSuccessMessage("login-success");
        clearFormErrors(loginForm);

        const isValid = validateLoginForm();

        if (!isValid) {
            return;
        }

        showSuccessMessage(
            loginForm,
            "login-success"
        );
    });
}

setupPasswordToggles();