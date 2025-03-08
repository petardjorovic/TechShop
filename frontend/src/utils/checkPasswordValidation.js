const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W)(?!.* ).{8,16}$/;

export const checkPasswordValidation = (password) => {
  return passwordRegex.test(password);
};
