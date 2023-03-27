/* // Reg expressions

const regExpEmail = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/;
const regExpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.!@#$%^&*])(?=.{8,})/;
const regExpUsername = /^([a-zA-Z0-9_-]){6,25}$/;

// Functions to validate
export const validateEmail = (field) => {
  if (regExpEmail.test(field)) {
    return true;
  } else {
    return false;
  }
};


export const validatePasword = (field) => {
  if (regExpPassword.test(field)) {
    return true;
  } else {
    return false;
  }
};

export const validateUsername = (field) => {
  if (regExpUsername.test(field) && field?.trim() !== "") {
    return true;
  } else {
    return false;
  }
};

 */