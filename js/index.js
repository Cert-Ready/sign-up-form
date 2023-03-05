// IIFE implemented to Avoid polluting the global namespace
// https://developer.mozilla.org/en-US/docs/Glossary/IIFE
(() => {
  const pwd = document.querySelector('#pwd');
  const validatePwd = document.querySelector('#validatepwd');
  const pwdError = document.querySelector('.pwd-error');
  const paswdError = document.querySelector('.validatepwd-error');
  const formEl = document.querySelector('#form1');
  const fNameError = document.querySelector('.fname-error');
  const lNameError = document.querySelector('.lname-error');
  const emailError = document.querySelector('.email-error');
  let formSubmit = true;

  pwd.addEventListener('input', validateForm);
  validatePwd.addEventListener('input', validateForm);

  const inputEl = document.querySelectorAll('input');
  inputEl.forEach((element) => {
    element.addEventListener('input', (e) => {
      const validity = e.target.validity.valid;
      if (validity) {
        styleValid(e.target);
        clearError(e.target);
      } else {
        styleInvalid(e.target);
        styleError(e.target);
      }
    });
  });

  function validateForm() {
    if (validatePwd.value !== pwd.value) {
      formSubmit = false;
      styleInvalid(pwd);
      styleInvalid(validatePwd);
      styleError(pwdError);
      styleError(validatePwd);
    } else {
      formSubmit = true;
      styleValid(pwd);
      styleValid(validatePwd);
      clearError(pwdError);
      clearError(validatePwd);
    }

    if (formSubmit) {
      styleValid(pwd);
      styleValid(validatePwd);
    } else {
      styleInvalid(pwd);
      styleInvalid(validatePwd);
    }
  }

  formEl.addEventListener('click', (e) => {
    if (!formSubmit) {
      e.preventDefault();
    }
  });

  function styleValid(element) {
    element.classList.remove('horizontal-shake');
    element.style.borderColor = 'green';
    element.previousElementSibling.childNodes[1].style.color = 'green';
  }

  function styleInvalid(element) {
    element.classList.add('horizontal-shake');
    element.style.borderColor = 'red';
    element.previousElementSibling.childNodes[1].style.color = 'red';
  }

  function styleError(element) {
    element = element.parentNode.children[2];
    element.style.cssText = `
    background-color: var(--light-0);
    color: red;
    `;
    const warning = '<i class="fa-solid fa-triangle-exclamation"></i>';

    switch (element) {
      case fNameError:
        element.innerHTML = `${warning} Please enter your first name`;
        break;
      case lNameError:
        element.innerHTML = `${warning} Please enter your last name`;
        break;
      case emailError:
        element.innerHTML = `${warning} Please enter a valid email ex: me@mail.me`;
        break;
      case pwdError:
        element.innerHTML = `${warning} Passwords do not match`;
        break;
      case paswdError:
        element.innerHTML = `${warning} Passwords do not match`;
        break;
    }
  }

  function clearError(element) {
    element = element.parentNode.children[2];
    element.style.cssText = `
    background-color: transparent;
    color: transparent;
    `;
  }
})();
