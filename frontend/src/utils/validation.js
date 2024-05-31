//sign up validation -------------------------------------------------------

export const validateSignUpForm = (name, email, password, confirmPassword) => {
  const isName = /^[A-Za-z]+(?:[-' ][A-Za-z]+)*$/.test(name)
  if (!isName) return "Username must be more than 3 charactors";
  const isEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  if (!isEmail) return "Invalid email address";
  const isPassword =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(password);
  if (!isPassword)
    return "password must contain special charactors and numbers";
  const samePassword = isPassword && password == confirmPassword;
  if (!samePassword) return "Password doesnot match";
};
// sign in  validation------------------------------------------------------------------------------
export const validateSignInForm = (email, pasword) => {
  const isEmail = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
    email
  );
  if (!isEmail) return "Invalid email address";

  const isPassword = pasword.trim() != "";
  if (!isPassword) return "Enter a valid password";

  return true;
};
